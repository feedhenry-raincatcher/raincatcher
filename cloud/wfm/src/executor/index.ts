import {Process} from '../process';
import {ProcessInstance} from '../process-instance';

/**
 * Executor engine for a {@link Process}
 *
 * Triggers instantiation and execution of a {@link ProcessInstance}
 */
export interface Executor {
  process: Process;
  instance?: ProcessInstance;
  start(): void;
}

import ExecutorImpl from './ExecutorImpl';
export {InstanceRepository} from './InstanceRepository';
export default ExecutorImpl;
