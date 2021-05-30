import { UserRepositiry } from './../repositories/user.repository';
import { UserDto } from '../dto/user.dto';
import { HttpException, Injectable } from "@nestjs/common";

@Injectable()
export class UserService {
  constructor(private userRepositiry: UserRepositiry) { }

  async createUser(userData: UserDto): Promise<string> {
    try {
      const res = await this.userRepositiry.createUser(userData)
      return res
    } catch (e) {
      throw new HttpException('Server internal error', 500)
    }
  }

  async confirmUser(id: string): Promise<string> {
    try {
      return await this.userRepositiry.confirmUser(id)
    } catch (e) {
      throw new HttpException('Server internal error', 500)
    }
  }

  async checkUser(email: UserDto): Promise<string> {
    try {
      return await this.userRepositiry.checkUser(email)
    } catch (e) {
      throw new HttpException('Server internal error', 500)
    }
  }
};
