import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsToMany,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { User } from 'src/user/model/user.model';
import { Role } from './roles.model';

@Table({
  tableName: 'user-roles',
  createdAt: false,
  updatedAt: false,
})
export class UserRoles extends Model<UserRoles> {
  @ApiProperty({ example: '1', description: 'uniq id' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty()
  @ForeignKey(() => Role)
  @Column({
    type: DataType.INTEGER,
  })
  roleId: string;

  @ApiProperty()
  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
  })
  userId: string;
}
