const Application = require('../models/Application');

// @desc    Create or update a draft application
// @route   POST /api/applications/autosave
// @access  Private
const autosaveApplication = async (req, res) => {
  const { applicationData } = req.body;
  try {
    let application = await Application.findOne({ userId: req.user._id, status: 'DRAFT' });
    
    if (application) {
      // Update existing draft
      application = await Application.findByIdAndUpdate(
        application._id,
        { ...applicationData, lastSavedAt: Date.now() },
        { new: true }
      );
    } else {
      // Create new draft
      application = await Application.create({
        userId: req.user._id,
        ...applicationData,
        status: 'DRAFT',
        currentStep: applicationData.currentStep || 1
      });
    }
    
    res.json(application);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get user's applications
// @route   GET /api/applications
// @access  Private
const getApplications = async (req, res) => {
  try {
    const applications = await Application.find({ userId: req.user._id }).sort('-updatedAt');
    res.json(applications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Submit application
// @route   PUT /api/applications/:id/submit
// @access  Private
const submitApplication = async (req, res) => {
  try {
    const application = await Application.findById(req.params.id);
    if (!application) return res.status(404).json({ message: 'Application not found' });
    if (application.userId.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }
    
    application.status = 'SUBMITTED';
    await application.save();
    res.json({ message: 'Application submitted successfully', application });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { autosaveApplication, getApplications, submitApplication };
