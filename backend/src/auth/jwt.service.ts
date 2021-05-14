import * as jwt from 'jsonwebtoken';
import randtoken from 'rand-token';
import {default as config} from '../../config';
import { Injectable} from '@nestjs/common';
import { User } from '../users/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class JWTService {
  constructor(@InjectRepository(User) private usersRepository: Repository<User>,) {}


  async createToken(email, licence) {
    const expiresIn = config.jwt.expiresIn,
      secretOrKey = config.jwt.secretOrKey;
    const userInfo = { email: email, licence: licence};
    const token = jwt.sign(userInfo, secretOrKey, { expiresIn });
    return {
      expires_in: expiresIn,
      access_token: token,
    };
  }

  async validateUser(signedUser): Promise<User> {
    const userFromDb = await this.usersRepository.findOne({ email: signedUser.email});
    if (userFromDb) {
      return userFromDb;
    }
    return null;
  }


}
