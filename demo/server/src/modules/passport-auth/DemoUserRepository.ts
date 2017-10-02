import { UserRepository, UserService } from '@raincatcher/auth-passport';
import * as _ from 'lodash';

/**
 * Static user json data
 */
// tslint:disable-next-line:no-var-requires
export const users: any[] = require('./users.json');

/**
 * A sample user implementation
 *
 * Note: This implementation is only for demo purposes.
 */
export class SampleUserService implements UserService {
  public validatePassword(user: any, password: string) {
    return user.password === password;
  }
  public hasResourceRole(user: any, role: string | undefined) {
    if (role) {
      return user.roles.indexOf(role) > -1;
    } else {
      return true;
    }
  }
  public getProfile(user: any) {
    const profileData = _.cloneDeep(user);
    delete profileData.password;
    return profileData;
  }
}

/**
 * A sample implementation of a user data repository
 */
export class SampleUserRepository implements UserRepository {

  /**
   * A sample get user using a login id from a data source
   */
  public getUserByLogin(loginId: string, callback: (err?: Error, user?: any) => any) {
    const userFound = _.find(users, function(user: any) {
      if (user.username === loginId) {
        return user;
      }
    });

    callback(undefined, userFound);
  }
}

export default SampleUserRepository;
