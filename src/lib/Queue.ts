/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
import Bull from 'bull';
import cacheConfig from '../config/cache';

import ResetPassword from '../app/jobs/ResetPassword';
import ConfirmEmail from '../app/jobs/ConfirmEmail';

const jobs = [ResetPassword, ConfirmEmail];

interface Queues {
  [x: string]: {
    bull: Bull.Queue;
    handle: (data: any) => void;
  };
}

class Queue {
  protected queues: Queues = {};

  constructor() {
    this.init();
  }

  init() {
    jobs.forEach(({ key, handle }) => {
      this.queues[key] = {
        bull: new Bull(key, {
          limiter: {
            max: 12,
            duration: 4000,
          },
          defaultJobOptions: {
            backoff: 1 * 60 * 1000,
            attempts: 30,
            removeOnComplete: true,
          },
          redis: cacheConfig.config.redis,
        }),
        handle,
      };
    });
  }

  add(queue: string, job: any) {
    return this.queues[queue].bull.add(job);
  }

  processQueue() {
    jobs.forEach(job => {
      const { bull, handle } = this.queues[job.key];
      bull
        .on('error', this.handleFailure)
        .on('failed', this.handleFailure)
        .process(currentlyJob => handle(currentlyJob.data));
    });
  }

  handleFailure(_: any, err: Error) {
    console.log(err);
  }
}

export default new Queue();
