import { Validators } from '@angular/forms';

export const STS29form = {
  sectionD: {
    HeightCM: [null, [Validators.required, Validators.min(20), Validators.max(251)]],
    WeightKg: [null, [Validators.required, Validators.min(10), Validators.max(250)]],
    FHCAD: [null, Validators.required],
    Diabetes: [null, Validators.required],
    DiabCtrl: [null, Validators.required],
    Dyslip: [null, Validators.required],
    Dialysis: [null, Validators.required],
    Hypertn: [null, Validators.required],
    InfEndo: [null, Validators.required],
    InfEndTy: [null, Validators.required],
    InfEndCult: [null, Validators.required],
    TobaccoUse: [null, Validators.required]
  },
  sectionE: {
    PrCVInt: [null, Validators.required],
    PrCAB: [null, Validators.required],
    PrValve: [null, Validators.required]
  }
};
