import { FormCondition } from '../../shared/components/form-based/form-based.model';

export const formConditions: FormCondition = {
  section: [
    {
      control: 'InfectiveEndoType',
      parentControl: 'InfectiveEndo',
      conditionValues: ['Yes']
    },
    {
      control: 'PreviousPaceDate',
      parentControl: 'PermanentPace',
      conditionValues: ['Yes']
    },
    { control: 'RecentPCIDate', parentControl: 'PriorPCI', conditionValues: ['Yes'] },
    {
      control: 'RecentCABGDate',
      parentControl: 'PriorCABG',
      conditionValues: ['Yes']
    },
    {
      control: 'RecentAVProdDate',
      parentControl: 'PriorAVProd',
      conditionValues: ['Yes']
    },
    {
      control: 'AVReplaceSx',
      parentControl: 'PriorAVProd',
      conditionValues: ['Yes']
    },
    { control: 'AVProsType', parentControl: 'AVReplaceSx', conditionValues: ['Yes'] },
    {
      control: 'AVProsModel',
      parentControl: 'AVReplaceSx',
      conditionValues: ['Yes']
    },
    { control: 'AVRepairSX', parentControl: 'PriorAVProd', conditionValues: ['Yes'] },
    {
      control: 'AVBalloonValvuloplasty',
      parentControl: 'PriorAVProd',
      conditionValues: ['Yes']
    },
    { control: 'AVTAVR', parentControl: 'PriorAVProd', conditionValues: ['Yes'] },
    { control: 'AVTAVRModel', parentControl: 'AVTAVR', conditionValues: ['Yes'] },
    {
      control: 'AVTAVI',
      parentControl: 'PriorAVProd',
      conditionValues: ['Yes']
    },
    {
      control: 'MVReplace',
      parentControl: 'PriorNonAVProd',
      conditionValues: ['Yes']
    },
    {
      control: 'MVProsType',
      parentControl: 'MVReplace',
      conditionValues: ['Yes']
    },
    {
      control: 'MVRepairSx',
      parentControl: 'PriorNonAVProd',
      conditionValues: ['Yes']
    }
  ]
};
