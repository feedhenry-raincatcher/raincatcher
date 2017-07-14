import { LoggerManager } from '@raincatcher/logger';
import { UserSecurityService } from '../user/UserSecurityService';

import { User } from '../user/User';

const log = new LoggerManager();

/**
 * Default strategy to be used by Passport's local strategy. If user credentials are valid, proceed to login,
 * otherwise, reject it. Calls serialize user with user login id.
 *
 * @param userSec - security service
 * @returns {Function} - Returns the default strategy function to be used by passport
 */
export const defaultStrategy = (userSec: UserSecurityService) => {
  return (loginId: string, password: string, done: (error: Error | null, user: any) => any) => {
    userSec.getUserByLogin(loginId).then((user: User) => {
      if (!user) {
        return done(null, false);
      } else {
        if (userSec.comparePassword(user, password)) {
          return done(null, user);
        }
        return done(null, false);
      }
    })
      .catch((err: Error) => {
        log.logger.error('An error occurred when retrieving user: ', err,
          {level: 'ERROR', tag: 'cloud:passportauth:src:auth', src: 'DefaultStrategy.ts'});
        return done(err, null);
      });
  };
};
