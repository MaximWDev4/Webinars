import * as bcrypt from 'bcryptjs';
import { Get, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-users.dto';
import { UserDto } from './dto/user.dto';

const saltRounds = 10;

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(id: string): Promise<User> {
    return this.usersRepository.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }

  async createNewUser(newUser: CreateUserDto): Promise<User> {
    if(this.isValidEmail(newUser.email) && newUser.password){
      const userRegistered = await this.findByEmail(newUser.email);
      if(!userRegistered){
        newUser.password = await bcrypt.hash(newUser.password, saltRounds);
        newUser.licence = 0;
        console.log(newUser);
        await this.usersRepository.create({emailVerified: false, ...newUser });
        return await this.findByEmail(newUser.email);
      } else if (!userRegistered.emailVerified) {
        return userRegistered;
      } else {
        throw new HttpException('REGISTRATION.USER_ALREADY_REGISTERED', HttpStatus.FORBIDDEN);
      }
    } else {
      throw new HttpException('REGISTRATION.MISSING_MANDATORY_PARAMETERS', HttpStatus.FORBIDDEN);
    }
  }

  async findByEmail(email: string): Promise<User> {
    return await this.usersRepository.findOne({email: email});
  }

  isValidEmail (email : string){
    if(email){
      const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    } else return false
  }
}
