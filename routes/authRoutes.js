const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getMe } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');
const { authorize } = require('../middleware/roleMiddleware');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/me', protect, getMe);

// Example of a role-protected route (future use)
// router.get('/admin', protect, authorize('admin', 'maintainer'), (req, res) => res.send('Admin access'));

module.exports = router;
