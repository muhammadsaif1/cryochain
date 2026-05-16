const express = require("express");
const router = express.Router();
const {
  createContact,
  getAllContacts,
  getContactById,
  updateContact,
  deleteContact,
  bulkDeleteContacts,
} = require("../controllers/note");

// Public routes
router.post("/", createContact);

// Protected routes (add your auth middleware here)
// router.use(protect); // Uncomment when you have auth middleware
// router.use(admin); // Uncomment for admin-only access

router.get("/", getAllContacts);
router.get("/:id", getContactById);
router.put("/:id", updateContact);
router.delete("/:id", deleteContact);
router.delete("/bulk/delete", bulkDeleteContacts);

module.exports = router;
