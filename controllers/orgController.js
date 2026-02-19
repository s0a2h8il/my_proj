const Organization = require('../models/Organization');
const OrgMember = require('../models/OrgMember');

// @desc    Create new organization
// @route   POST /api/orgs
// @access  Private
exports.createOrganization = async (req, res) => {
    const { name } = req.body;

    try {
        // Create organization
        const organization = await Organization.create({
            name,
            owner: req.user.id
        });

        // Add creator as owner in OrgMember
        await OrgMember.create({
            org: organization._id,
            user: req.user.id,
            role: 'owner'
        });

        res.status(201).json({
            success: true,
            data: organization
        });
    } catch (err) {
        // Check for duplicate key error
        if (err.code === 11000) {
            return res.status(400).json({
                success: false,
                error: 'Organization name already exists'
            });
        }
        res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
};

// @desc    Get current user's organizations
// @route   GET /api/orgs
// @access  Private
exports.getMyOrganizations = async (req, res) => {
    try {
        const memberships = await OrgMember.find({ user: req.user.id })
            .populate('org', 'name owner createdAt');

        // Transform data to return organization details with role
        const organizations = memberships.map(member => ({
            _id: member.org._id,
            name: member.org.name,
            role: member.role,
            joinedAt: member.createdAt
        }));

        res.status(200).json({
            success: true,
            count: organizations.length,
            data: organizations
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
};
