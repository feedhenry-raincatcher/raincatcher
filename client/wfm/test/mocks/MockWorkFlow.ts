import * as Promise from 'bluebird';
import { DataService, STATUS, WorkFlow } from '../../src/index';
import { MockDataService } from './MockDataService';
import { steps } from './MockStepData';

const fixtures: WorkFlow[] = [
  {
    version: 1,
    id: 'singleStepWorkFlow',
    title: 'Vehicle Inspection Form',
    steps: [steps[0]],
    created: 0,
    updated: 0
  },
  {
    version: 1,
    id: 'multiStepWorkFlow',
    title: 'Vehicle Inspection Form',
    steps,
    created: 0,
    updated: 0
  }
];

export { fixtures };
