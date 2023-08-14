import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './model/user.model';
import { Role } from 'src/roles/model/roles.model';
import { UserRoles } from 'src/roles/model/user-roles.model';
import { RolesModule } from 'src/roles/roles.module';
// import { RolesService } from 'src/roles/roles.service';

@Module({
  controllers: [UserController],
  providers: [UserService],
  imports: [SequelizeModule.forFeature([User, Role, UserRoles]), RolesModule],
})
export class UserModule {}
