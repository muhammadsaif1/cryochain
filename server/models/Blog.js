const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Blog title is required"],
      trim: true,
      maxlength: [200, "Title cannot exceed 200 characters"],
      index: true,
    },
    description: {
      type: String,
      required: [true, "Blog description is required"],
      // This will store HTML content from rich text editor
      // Example: "<p>This is <strong>bold</strong> and <em>italic</em></p>"
    },
    author: {
      type: String,
      required: [true, "Author name is required"],
      trim: true,
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    tags: [
      {
        type: String,
        trim: true,
      },
    ],

    excerpt: {
      type: String,
      maxlength: [300, "Excerpt cannot exceed 300 characters"],
    },

    readTime: {
      type: Number,
      default: 1, // minutes
    },
    coverImage: {
      url: {
        type: String,
        default: null,
      },
      publicId: {
        type: String, // needed to delete from Cloudinary later
        default: null,
      },
    },

    views: {
      type: Number,
      default: 0,
    },
    isPublished: {
      type: Boolean,
      default: false,
    },
    publishedAt: {
      type: Date,
    },
  },
  {
    timestamps: true, // This adds createdAt and updatedAt
  },
);

// Generate slug from title before saving
blogSchema.pre("save", function () {
  if (this.title && (this.isModified("title") || !this.slug)) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-zA-Z0-9\s]/g, "")
      .replace(/\s+/g, "-")
      .substring(0, 100);
  }

  // Set publishedAt when status changes to published
  if (this.isPublished && this.isModified("isPublished") && !this.publishedAt) {
    this.publishedAt = new Date();
  }

  // Generate excerpt from description if not provided
  if (!this.excerpt && this.description) {
    // Strip HTML tags for excerpt
    const plainText = this.description.replace(/<[^>]*>/g, "");
    this.excerpt = plainText.substring(0, 300);
  }
});

// Virtual for formatted createdAt with Africa timezone
blogSchema.virtual("formattedCreatedAt").get(function () {
  return new Date(this.createdAt).toLocaleString("en-Africa", {
    timeZone: "Africa/Lagos",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
});

// Virtual for formatted updatedAt with Africa timezone
blogSchema.virtual("formattedUpdatedAt").get(function () {
  return new Date(this.updatedAt).toLocaleString("en-Africa", {
    timeZone: "Africa/Lagos",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
});

// Virtual for relative time (e.g., "2 days ago")
blogSchema.virtual("relativeTime").get(function () {
  const now = new Date();
  const diff = now - this.createdAt;
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);

  if (weeks > 0) return `${weeks} week${weeks > 1 ? "s" : ""} ago`;
  if (days > 0) return `${days} day${days > 1 ? "s" : ""} ago`;
  if (hours > 0) return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  if (minutes > 0) return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
  return "Just now";
});

// Calculate read time from description
// blogSchema.methods.calculateReadTime = function () {
//   if (!this.description) return 0;
//   const plainText = this.description.replace(/<[^>]*>/g, "");
//   const wordsPerMinute = 200;
//   const wordCount = plainText.split(/\s+/).length;
//   this.readTime = Math.ceil(wordCount / wordsPerMinute);
//   return this.readTime;
// };

module.exports = mongoose.model("Blog", blogSchema);
