import { getRepository } from 'typeorm';
import bcrypt from 'bcrypt';
import signale from 'signale';

import { User } from '../entity/User.entity';

class Users {

  static save = async (username: string, password: string) => {
    const user = new User();
    user.username = username;
    user.password = password;
    try {
      return getRepository(User).save(user);
    } catch (error) {
      signale.error('[UsersOperationError :: save]');
      throw error;
    }
  }

  static findByUsername = async (username: string): Promise<User | undefined> => {
    try {
      return getRepository(User).findOne({ username });
    } catch (error) {
      signale.error('[UsersOperationError :: findByUsername]');
      throw error;
    }
  }

  static findById = async (id: string): Promise<User | undefined> => {
    try {
      return getRepository(User).findOne({ id });
    } catch (error) {
      signale.error('[UsersOperationError :: findById]');
      throw error;
    }
  }

  static comparePassword = async (username: string, password: string): Promise<boolean> => {
    try {
      const user = await getRepository(User).findOne({ username });
      if (!user || user instanceof Error) {
        return false;
      }
      return bcrypt.compare(password, user.password);
    } catch (error) {
      signale.error('[UsersOperationError :: comparePassword]');
      throw error;
    }
  }

}

export default Users;
