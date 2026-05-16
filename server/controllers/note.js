const Note = require("../models/Note");
const { sendNoteNotification } = require("../services/emailService");

// @desc    Create a new contact/enquiry
// @route   POST /api/contacts
// @access  Public
const createContact = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      organisation,
      role,
      areaOfInterest,
      message,
    } = req.body;

    // Validate required fields
    if (!firstName || !email) {
      return res.status(400).json({
        success: false,
        message: "First name and email are required fields",
      });
    }

    const contact = await Note.create({
      firstName,
      lastName,
      email,
      organisation,
      role,
      areaOfInterest,
      message,
    });

    sendNoteNotification(contact).catch((error) => {
      console.error("Email notification failed:", error);
    });

    res.status(201).json({
      success: true,
      data: contact,
      message: "Contact created successfully",
    });
  } catch (error) {
    console.error("Error creating contact:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// @desc    Get all contacts/enquiries
// @route   GET /api/contacts
// @access  Private/Admin (add auth middleware as needed)
const getAllContacts = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      sortBy = "createdAt",
      sortOrder = "desc",
      areaOfInterest,
      organisation,
    } = req.query;

    // Build filter object
    const filter = {};
    if (areaOfInterest) filter.areaOfInterest = areaOfInterest;
    if (organisation) filter.organisation = organisation;

    // Pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);
    const sort = { [sortBy]: sortOrder === "desc" ? -1 : 1 };

    const contacts = await Note.find(filter)
      .sort(sort)
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Note.countDocuments(filter);

    res.status(200).json({
      success: true,
      data: contacts,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / parseInt(limit)),
        totalItems: total,
        itemsPerPage: parseInt(limit),
      },
    });
  } catch (error) {
    console.error("Error fetching contacts:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// @desc    Get single contact by ID
// @route   GET /api/contacts/:id
// @access  Private/Admin
const getContactById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id || !id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({
        success: false,
        message: "Invalid contact ID format",
      });
    }

    const contact = await Note.findById(id);

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: "Contact not found",
      });
    }

    res.status(200).json({
      success: true,
      data: contact,
    });
  } catch (error) {
    console.error("Error fetching contact:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// @desc    Update contact/enquiry
// @route   PUT /api/contacts/:id
// @access  Private/Admin
const updateContact = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    if (!id || !id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({
        success: false,
        message: "Invalid contact ID format",
      });
    }

    const contact = await Note.findByIdAndUpdate(id, updateData, {
      new: true, // Return updated document
      runValidators: true, // Run schema validators
    });

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: "Contact not found",
      });
    }

    res.status(200).json({
      success: true,
      data: contact,
      message: "Contact updated successfully",
    });
  } catch (error) {
    console.error("Error updating contact:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// @desc    Delete contact/enquiry
// @route   DELETE /api/contacts/:id
// @access  Private/Admin
const deleteContact = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id || !id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({
        success: false,
        message: "Invalid contact ID format",
      });
    }

    const contact = await Note.findByIdAndDelete(id);

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: "Contact not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Contact deleted successfully",
      data: { id: contact._id },
    });
  } catch (error) {
    console.error("Error deleting contact:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// @desc    Bulk delete contacts
// @route   DELETE /api/contacts/bulk
// @access  Private/Admin
const bulkDeleteContacts = async (req, res) => {
  try {
    const { ids } = req.body;

    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Please provide an array of contact IDs",
      });
    }

    const result = await Note.deleteMany({ _id: { $in: ids } });

    res.status(200).json({
      success: true,
      message: `${result.deletedCount} contacts deleted successfully`,
      data: {
        deletedCount: result.deletedCount,
      },
    });
  } catch (error) {
    console.error("Error bulk deleting contacts:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

module.exports = {
  createContact,
  deleteContact,
  updateContact,
  getAllContacts,
  getContactById,
  bulkDeleteContacts,
};
