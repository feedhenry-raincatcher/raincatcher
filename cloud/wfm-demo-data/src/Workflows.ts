/**
 * @module @raincatcher/wfm-demo-data
 */

import { getLogger } from '@raincatcher/logger';
import { WorkFlow } from '@raincatcher/wfm';
import * as Promise from 'bluebird';
import { Db, InsertWriteOpResult } from 'mongodb';

export const WORKFLOWS: WorkFlow[] = [
  {
    id: 'SyVXyMuSr',
    version: 1,
    title: 'Vehicle Accident Workflow',
    created: new Date().getTime(),
    updated: new Date().getTime(),
    steps: [
      {
        id: 'A33AC351h',
        code: 'accident-report-form', name: 'Accident Report',
        templates: {
          form: '<accident-report-form></accident-report-form>',
          view: '<accident-report value="result.submission"></accident-report>'
        }
      },
      {
        id: 'Bc3a951c',
        code: 'vehicle-inspection', name: 'Vehicle Inspection',
        templates: {
          form: '<vehicle-inspection-form></vehicle-inspection-form>',
          view: '<vehicle-inspection value="result.submission"></vehicle-inspection>'
        }
      }
    ]
  }
];

export default function(collectionName: string, database: Db) {
  return database.collection(collectionName).count({}, {})
    .then(count => {
      if (count !== 0) {
        getLogger().info(`${count} workflows found, not re-initializing data`);
        return Promise.resolve(undefined);
      }
      getLogger().info('Generating sample workflows');
      return database.collection(collectionName).createIndex({
        id: 'hashed'
      });
    })
    .then((indexResult: string) => indexResult ?
      database.collection(collectionName).insertMany(WORKFLOWS) : Promise.resolve(undefined))
    .then((insertResult: InsertWriteOpResult | undefined) => {
      if (insertResult) {
        getLogger().info(`Generated ${insertResult.insertedCount} sample workflows`);
      }
      return insertResult;
    });
}
