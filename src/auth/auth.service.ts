import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

import * as bcrypt from 'bcryptjs';
import { User } from 'src/user/model/user.model';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}
  async login(userDto: CreateUserDto) {
    const user = await this.validateUser(userDto);
    return this.generateToken(user);
  }

  async register(CreateUserDto: CreateUserDto) {
    const candidate = await this.userService.getUserByEmail(
      CreateUserDto.email,
    );
    if (candidate) {
      throw new HttpException('User is register', HttpStatus.BAD_REQUEST);
    }
    const hashPassword = await bcrypt.hash(CreateUserDto.password, 5);

    const user = await this.userService.create({
      ...CreateUserDto,
      password: hashPassword,
    });

    return this.generateToken(user);
  }

  private async generateToken(user: User) {
    const payload = { email: user.email, id: user.id, roles: user.roles };
    return { token: this.jwtService.sign(payload) };
  }

  private async validateUser(userDto: CreateUserDto) {
    const user = await this.userService.getUserByEmail(userDto.email);
    const passwordEquals = await bcrypt.compare(
      userDto.password,
      user.password,
    );
    if (user && passwordEquals) return user;
    throw new UnauthorizedException({ message: 'Invalid password or email' });
  }
}
