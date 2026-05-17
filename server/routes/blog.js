const express = require("express");
const router = express.Router();
const {
  createBlog,
  getAllBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
  togglePublishStatus,
  getBlogStats,
  getRelatedBlogs,
  bulkDeleteBlogs,
} = require("../controllers/blog");

// Public routes
router.get("/", getAllBlogs);
router.get("/stats", getBlogStats); // Make sure to add auth middleware for this
router.get("/:id", getBlogById);
router.get("/:id/related", getRelatedBlogs);

// Protected routes (add your auth middleware here)
// router.use(protect); // Uncomment when you have auth middleware
// router.use(admin); // Uncomment for admin-only access

router.post("/", createBlog);
router.put("/:id", updateBlog);
router.delete("/:id", deleteBlog);
router.patch("/:id/publish", togglePublishStatus);
router.delete("/bulk/delete", bulkDeleteBlogs);

module.exports = router;
