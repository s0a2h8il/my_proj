const mongoose = require('mongoose');

const orgMemberSchema = new mongoose.Schema({
    org: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Organization',
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    role: {
        type: String,
        enum: ['owner', 'maintainer', 'developer'],
        default: 'developer'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Prevent user from being in the same org multiple times
orgMemberSchema.index({ org: 1, user: 1 }, { unique: true });

module.exports = mongoose.model('OrgMember', orgMemberSchema);
