import { Validators } from '@angular/forms';

export const TAVR21form = {
  sectionC: {
    InfectiveEndo: [null, Validators.required],
    InfectiveEndoType: [null, Validators.required],
    PermanentPace: [null, Validators.required],
    PreviousPaceDate: [null, Validators.required],
    PreviousICD: [null, Validators.required],
    PriorPCI: [null, Validators.required],
    RecentPCIDate: [null, Validators.required],
    PriorCABG: [null, Validators.required],
    RecentCABGDate: [null, Validators.required],
    PriorOtherCardiacSx: [null, Validators.required],
    NumberPreviousCardiacSx: [null, Validators.required],
    PriorAVProd: [null, Validators.required],
    RecentAVProdDate: [null, Validators.required],
    AVReplaceSx: [null, Validators.required],
    AVProsType: [null, Validators.required],
    AVProsModel: [null, Validators.required],
    AVRepairSX: [null, Validators.required],
    AVBalloonValvuloplasty: [null, Validators.required],
    AVTAVR: [null, Validators.required],
    AVTAVRModel: [null, Validators.required],
    AVTAVI: [null, Validators.required],
    PriorNonAVProd: [null, Validators.required],
    MVReplace: [null, Validators.required],
    MVProsType: [null, Validators.required],
    MVRepairSx: [null, Validators.required]
  }
};
