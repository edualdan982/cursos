import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './entities/auth.entity';
import { Model } from 'mongoose';
import { Type } from '../../../03-gifs-app/src/app/gifs/interfaces/gifs.interface';

@Injectable()
export class AuthService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    // 1. Encriptar el password
    // 2. Guardar el usuario
    // 3. Generar JWT

    try {
      const newUser = new this.userModel(createUserDto);
      return await newUser.save();
    } catch (error: any) {
      console.log("Validanddo");
      console.log(error.code === '11000');
      if(error.code && Number(error.code) === 11000){
        throw new BadRequestException(`${createUserDto.email} ya existe`)
      }
      throw new InternalServerErrorException(`Error en el proceso de save.`)
    }
  }

  findAll() {
    return `This action returns all auth`;
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
}
