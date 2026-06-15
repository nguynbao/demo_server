const express = require('express');
const router = express.Router();
const {
  getProfile,
  createProfile,
  updateProfile,
  deleteProfile
} = require('../controllers/profileController');
const { protect } = require('../middleware/authMiddleware');

router.route('/')
  .get(protect, getProfile)
  .post(protect, createProfile)
  .put(protect, updateProfile)
  .delete(protect, deleteProfile);

module.exports = router;
