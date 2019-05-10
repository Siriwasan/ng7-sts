export interface FormCondition {
  control: string;
  parentControl: string;
  conditionValues: any[];
}

export const formConditions = {
  sectionD: [
    { control: 'DiabCtrl', parentControl: 'Diabetes', conditionValues: ['1'] },
    { control: 'InfEndTy', parentControl: 'InfEndo', conditionValues: ['1'] },
    { control: 'InfEndCult', parentControl: 'InfEndo', conditionValues: ['1'] }
  ],
  sectionE: [
    { control: 'PrCAB', parentControl: 'PrCVInt', conditionValues: ['1'] },
    { control: 'PrValve', parentControl: 'PrCVInt', conditionValues: ['1'] }
  ]
};
