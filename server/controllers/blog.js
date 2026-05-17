const Blog = require("../models/Blog");

// @desc    Create a new blog post
// @route   POST /api/blogs
// @access  Private/Admin
const createBlog = async (req, res) => {
  try {
    const { title, description, author, isPublished, tags } = req.body;

    if (!title || !description || !author) {
      return res.status(400).json({
        success: false,
        message: "Title, description, and author are required fields",
      });
    }

    const blog = await Blog.create({
      title,
      description,
      author,
      isPublished: isPublished || false,
      tags: tags || [],
    });

    // Calculate read time
    blog.calculateReadTime();
    await blog.save();

    res.status(201).json({
      success: true,
      data: blog,
      message: "Blog created successfully",
    });
  } catch (error) {
    console.error("Error creating blog:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// @desc    Get all blog posts
// @route   GET /api/blogs
// @access  Public
const getAllBlogs = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      sortBy = "createdAt",
      sortOrder = "desc",
      isPublished,
      author,
      search,
    } = req.query;

    // Build filter object
    const filter = {};

    // For public access, only show published posts unless admin

    // Search functionality
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        { author: { $regex: search, $options: "i" } },
      ];
    }

    // Pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);
    const sort = { [sortBy]: sortOrder === "desc" ? -1 : 1 };

    const blogs = await Blog.find(filter)
      .sort(sort)
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Blog.countDocuments(filter);

    res.status(200).json({
      success: true,
      data: blogs,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / parseInt(limit)),
        totalItems: total,
        itemsPerPage: parseInt(limit),
      },
    });
  } catch (error) {
    console.error("Error fetching blogs:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// @desc    Get single blog by ID or slug
// @route   GET /api/blogs/:id
// @access  Public
const getBlogById = async (req, res) => {
  try {
    const { id } = req.params;

    let blog;

    // Check if ID is MongoDB ObjectId
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
      blog = await Blog.findById(id);
    } else {
      blog = await Blog.findOne({ slug: id });
    }

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    // Check if blog is published (for public access)
    if (!req.user && !blog.isPublished) {
      return res.status(401).json({
        success: false,
        message: "Blog is not published yet",
      });
    }

    // Increment view count
    blog.views += 1;
    await blog.save();

    res.status(200).json({
      success: true,
      data: blog,
    });
  } catch (error) {
    console.error("Error fetching blog:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// @desc    Update blog post
// @route   PUT /api/blogs/:id
// @access  Private/Admin
const updateBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    // Find existing blog
    const existingBlog = await Blog.findById(id);

    if (!existingBlog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    // Update blog
    const blog = await Blog.findByIdAndUpdate(id, updateData, {
      new: true, // Return updated document
      runValidators: true, // Run schema validators
    });

    // Recalculate read time if description was updated
    if (updateData.description) {
      blog.calculateReadTime();
      await blog.save();
    }

    res.status(200).json({
      success: true,
      data: blog,
      message: "Blog updated successfully",
    });
  } catch (error) {
    console.error("Error updating blog:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// @desc    Delete blog post
// @route   DELETE /api/blogs/:id
// @access  Private/Admin
const deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;

    const blog = await Blog.findByIdAndDelete(id);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Blog deleted successfully",
      data: { id: blog._id, title: blog.title },
    });
  } catch (error) {
    console.error("Error deleting blog:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// @desc    Publish/Unpublish blog post
// @route   PATCH /api/blogs/:id/publish
// @access  Private/Admin
const togglePublishStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { isPublished } = req.body;

    const blog = await Blog.findById(id);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    blog.isPublished =
      isPublished !== undefined ? isPublished : !blog.isPublished;

    if (blog.isPublished && !blog.publishedAt) {
      blog.publishedAt = new Date();
    }

    await blog.save();

    res.status(200).json({
      success: true,
      data: blog,
      message: blog.isPublished
        ? "Blog published successfully"
        : "Blog unpublished successfully",
    });
  } catch (error) {
    console.error("Error toggling publish status:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// @desc    Get blog stats (total, published, views, etc.)
// @route   GET /api/blogs/stats/dashboard
// @access  Private/Admin
const getBlogStats = async (req, res) => {
  try {
    const totalBlogs = await Blog.countDocuments();
    const publishedBlogs = await Blog.countDocuments({ isPublished: true });
    const draftBlogs = await Blog.countDocuments({ isPublished: false });

    const totalViews = await Blog.aggregate([
      {
        $group: {
          _id: null,
          totalViews: { $sum: "$views" },
        },
      },
    ]);

    const recentBlogs = await Blog.find().sort({ createdAt: -1 }).limit(5);

    const mostViewedBlogs = await Blog.find().sort({ views: -1 }).limit(5);

    res.status(200).json({
      success: true,
      data: {
        totalBlogs,
        publishedBlogs,
        draftBlogs,
        totalViews: totalViews[0]?.totalViews || 0,
        recentBlogs,
        mostViewedBlogs,
      },
    });
  } catch (error) {
    console.error("Error fetching blog stats:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// @desc    Get related blogs based on tags or similar content
// @route   GET /api/blogs/:id/related
// @access  Public
const getRelatedBlogs = async (req, res) => {
  try {
    const { id } = req.params;
    const { limit = 3 } = req.query;

    const currentBlog = await Blog.findById(id);

    if (!currentBlog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    // Find related blogs based on similar tags
    const relatedBlogs = await Blog.find({
      _id: { $ne: id },
      isPublished: true,
      $or: [
        { tags: { $in: currentBlog.tags || [] } },
        { author: currentBlog.author },
      ],
    })
      .sort({ views: -1, createdAt: -1 })
      .limit(parseInt(limit));

    res.status(200).json({
      success: true,
      data: relatedBlogs,
    });
  } catch (error) {
    console.error("Error fetching related blogs:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// @desc    Bulk delete blogs
// @route   DELETE /api/blogs/bulk/delete
// @access  Private/Admin
const bulkDeleteBlogs = async (req, res) => {
  try {
    const { ids } = req.body;

    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Please provide an array of blog IDs",
      });
    }

    const result = await Blog.deleteMany({ _id: { $in: ids } });

    res.status(200).json({
      success: true,
      message: `${result.deletedCount} blogs deleted successfully`,
      data: {
        deletedCount: result.deletedCount,
      },
    });
  } catch (error) {
    console.error("Error bulk deleting blogs:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// Export all controllers at the end
module.exports = {
  createBlog,
  getAllBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
  togglePublishStatus,
  getBlogStats,
  getRelatedBlogs,
  bulkDeleteBlogs,
};
