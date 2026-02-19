const mongoose = require('mongoose');

const organizationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add an organization name'],
        unique: true,
        trim: true,
        maxlength: [50, 'Name can not be more than 50 characters']
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

// Update timestamp on save
organizationSchema.pre('save', function () {
    this.updatedAt = Date.now();
});

module.exports = mongoose.model('Organization', organizationSchema);
