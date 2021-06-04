import * as bcrypt from 'bcryptjs';
import {  HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getConnection, Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-users.dto';

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
        console.log(newUser);
        return  await getConnection()
          .createQueryBuilder()
          .insert()
          .into(User)
          .values([
            { email: newUser.email, userName: newUser.userName, licence: 0, password: newUser.password },
          ])
          .execute().then(async () => {
            return await this.findByEmail(newUser.email);
          });
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

  async change(newUser: {id: number, email: string,  licence: number, userName: string}) {
    if(this.isValidEmail(newUser.email)){
      const userRegistered = await this.findByEmail(newUser.email);
      if(userRegistered){
        return  await getConnection()
          .createQueryBuilder()
          .update(User)
          .set(
            { email: newUser.email, userName: newUser.userName, licence: newUser.licence },
          ).where('id = :id', {id: newUser.id})
          .execute().then(async () => {
            return await this.findByEmail(newUser.email);
          });
      } else {
        throw new HttpException('USER_CHANGE.USER_NOT_EXIST', HttpStatus.NOT_FOUND);
      }
    } else {
      throw new HttpException('USER_CHANGE.MISSING_MANDATORY_PARAMETERS', HttpStatus.FORBIDDEN);
    }
  }
}
