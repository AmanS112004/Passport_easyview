const express = require('express');
const router = express.Router();
const { autosaveApplication, getApplications, submitApplication } = require('../controllers/applicationController');
const { protect } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

router.use(protect);

router.get('/', getApplications);
router.post('/autosave', autosaveApplication);
router.put('/:id/submit', submitApplication);

// Document upload route
router.post('/upload', upload.single('document'), (req, res) => {
  if (!req.file) return res.status(400).json({ message: 'No file uploaded' });
  res.json({
    message: 'File uploaded successfully',
    fileName: req.file.filename,
    fileUrl: `/uploads/${req.file.filename}`
  });
});

module.exports = router;
