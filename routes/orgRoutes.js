const express = require('express');
const router = express.Router();
const { createOrganization, getMyOrganizations } = require('../controllers/orgController');
const { protect } = require('../middleware/authMiddleware');

router.route('/')
    .post(protect, createOrganization)
    .get(protect, getMyOrganizations);

module.exports = router;
