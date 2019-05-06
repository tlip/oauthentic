import { User } from '../../../db/entity/User.entity.ts';

export as namespace Users;
export = Users;

declare class Users {

  public save(username: string, password: string): Promise<Users.ReturnValue>;

  public findByUsername(username: string): Promise<Users.ReturnValue>;

  public findById(id: string): Promise<Users.ReturnValue>;

  public comparePassword(username: string, password: string): Promise<boolean>;
}

declare namespace Users {
  type ReturnValue = User | Error | undefined;
}