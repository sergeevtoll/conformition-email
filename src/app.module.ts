import { User } from './user/entities/user.entitiy';
import { UserService } from './user/services/user.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user/controllers/User.controller';
import { UserRepositiry } from './user/repositories/user.repository';


@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'postgres',
    database: 'postgres',
    entities: [User],
    synchronize: true,
  })],
  controllers: [UserController],
  providers: [UserService,UserRepositiry],
})
export class AppModule { }
