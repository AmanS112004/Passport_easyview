const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  status: { type: String, enum: ['DRAFT', 'SUBMITTED', 'APPROVED', 'REJECTED'], default: 'DRAFT' },
  currentStep: { type: Number, default: 1 },
  
  // Section 1: Personal Details
  personalDetails: {
    firstName: String,
    lastName: String,
    dob: Date,
    gender: String,
    birthCity: String,
    maritalStatus: String
  },

  // Section 2: Address Details
  addressDetails: {
    currentAddress: String,
    city: String,
    state: String,
    pincode: String,
    isPermanentSameAsCurrent: { type: Boolean, default: true },
    permanentAddress: String
  },

  // Section 3: Identity Details
  identityDetails: {
    panNumber: String,
    voterId: String,
    aadharNumber: String
  },

  // Section 4: Document Uploads
  documents: [{
    type: { type: String }, // e.g., 'Address Proof'
    fileName: String,
    fileUrl: String,
    uploadedAt: { type: Date, default: Date.now }
  }],

  // Section 5: Appointment
  appointment: {
    center: String,
    date: Date,
    timeSlot: String,
    isBooked: { type: Boolean, default: false }
  },

  lastSavedAt: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('Application', applicationSchema);
