import { confirmEmailLink } from '../../utils/confirmEmailLink';
import { User } from '../entities/user.entitiy';
import { UserDto } from '../dto/user.dto';
import { Injectable } from "@nestjs/common";
import { EntityManager, EntityRepository, FindOneOptions, getManager } from 'typeorm';
import { sendEmail } from '../../utils/sendEmail';
import { redis } from '../../redis';


@Injectable()
@EntityRepository(User)
export class UserRepositiry {
  manager: EntityManager
  constructor() {
    this.manager = getManager();
  }

  // @Cron('100 * * * * *')
  async handleCron(userData: UserDto) {

    setTimeout(async () => {
      const opt: FindOneOptions<User> = {
        where: {
          email: userData.email,
        }
      }
      const user = await this.manager.findOne(User, opt)

      if (!user.confirm) {
        await this.manager.delete(User, user)
      }
    }, 1000 * 60 * 15)
  }

  async createUser(userData: UserDto): Promise<string> {
    const newUser = new User()
    newUser.email = userData.email
    newUser.password = userData.password
    newUser.confirm = false
    const user = await this.manager.save(newUser)

    await sendEmail(user.email, await confirmEmailLink(user.id))

    this.handleCron(user)

    return 'всё заеьумба, письмо должны отправить'
  }

  async confirmUser(id: string): Promise<string> {
    const userId = await redis.get(id)
    if (!userId) {
      return 'истек строк ссылки или ссылка не вернеая'
    }

    const opt: FindOneOptions<User> = {
      where: {
        id: userId
      }
    }

    const user = await this.manager.findOne(User, opt)
    user.confirm = true
    await this.manager.update(User, { id: userId }, { confirm: true })
    return `сслыка подтверждена, вот прув: ${JSON.stringify(user)}`
  }


  async checkUser(email: UserDto): Promise<string> {
    const opt: FindOneOptions<User> = {
      where: {
        email: email.email,
      }
    }
    const user = await this.manager.findOne(User, opt)
    if (user && user.confirm) {
      return 'Пользователь зареган'
    }
    return 'Пользователь не зареган'
  }
};
