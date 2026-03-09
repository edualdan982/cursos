import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './entities/auth.entity';
import { Model } from 'mongoose';
import * as bcryptjs from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './interfaces/jwt-payload';
import { LoginResponse } from './interfaces/login-response';

import { LoginDto, CreateUserDto, RegisterUserDto, UpdateAuthDto } from './dto';
import { log } from 'console';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      const { password, ...useData } = createUserDto;
      // 1. Encriptar el password
      const newUser = new this.userModel({
        password: bcryptjs.hashSync(password, 10),
        ...useData,
      });
      // 2. Guardar el usuario
      await newUser.save();
      const { password: _, ...user } = newUser.toJSON();
      return user;
    } catch (error) {
      if (Number(error['code']) === 11000) {
        throw new BadRequestException(`${createUserDto.email} ya existe`);
      }
      throw new InternalServerErrorException(`Error en el proceso de save.`);
    }
  }
  async register(registerUserDto: RegisterUserDto): Promise<LoginResponse> {
    const { password, confirmPassword, ...userData } = registerUserDto;
    if (password !== confirmPassword)
      throw new BadRequestException(`Las claves no coinciden`);

    await this.create({ password, ...userData });
    return this.login({ password, email: userData.email });
  }
  async login(loginDto: LoginDto): Promise<LoginResponse> {
    const { email, password } = loginDto;
    const user = await this.userModel.findOne({ email });
    if (!user || !bcryptjs.compareSync(password, user.password)) {
      throw new UnauthorizedException('Credenciales no validas');
    }
    const { password: _, ...rest } = user.toJSON();
    return {
      user: rest,
      token: this.getJwtToken({ id: user.id }),
    };
  }

  async findAll(): Promise<User[]> {
    return await this.userModel.find();
  }

  async findUserById(id: string) {
    const user = await this.userModel.findById(id);
    const { password, ...rest } = user.toJSON();
    return rest;
  }
  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }

  getJwtToken(payload: JwtPayload) {
    const token = this.jwtService.sign(payload);
    return token;
  }

  async checkToken(req: Request): Promise<JwtPayload> {
    const token = this.extractTokenFromHeader(req);
    if (!token) {
      throw new UnauthorizedException(
        'Se espera un token en la cabecera Authorization: Bearer JWT',
      );
    }
    try {
      const payload = await this.jwtService.verifyAsync<JwtPayload>(token, {
        secret: process.env.JWT_SEED,
      });
      return payload;
    } catch (error) {
      throw new UnauthorizedException(error['message'] ?? 'JWT no autorizado');
    }
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers['authorization']?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
