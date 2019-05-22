export const validations = {
  sectionD: {
    HeightCM: [
      { type: 'required', message: 'Height is required' },
      { type: 'min', message: 'Height must be at least 20 cm' },
      { type: 'max', message: 'Height cannot be more than 251 cm' }
    ],
    WeightKg: [
      { type: 'required', message: 'Weight is required' },
      { type: 'min', message: 'Weight must be at least 10 kg' },
      { type: 'max', message: 'Weight cannot be more than 250 kg' }
    ]
  },
  sectionE: {
    PrCVInt: [{ type: 'required', message: 'Required' }]
  }
};
