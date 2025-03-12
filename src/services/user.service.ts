import { instance } from '@/api/axios';
import { IUser } from '@/types/types';

class UserService {
  private _BASE_URL = '/users';

  async fetchProfile() {
    return instance.get<IUser>(`${this._BASE_URL}/me`);
  }
}

const userService = new UserService();

export default userService;