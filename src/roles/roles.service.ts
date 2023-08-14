import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';

@Injectable()
export class RolesService {
  createRole(createRoleDto: CreateRoleDto) {
    return 'This action adds a new role';
  }

  getRoleByValue(value: string) {
    return `This action returns all roles`;
  }

  
}
