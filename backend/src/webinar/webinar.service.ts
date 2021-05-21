import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Webinars } from './webinar.mock';
import { InjectRepository } from '@nestjs/typeorm';
import { Webinar } from './webinar.entity';
import { getConnection, Repository } from 'typeorm';

@Injectable()
export class WebinarService {

  constructor(@InjectRepository(Webinar) private webinarRepo: Repository<Webinar>) {
  }

  public async getWebinars() {
    return await this.webinarRepo.find();
  }

  async getWebinarById(webinarId: number) {
    try {
      return await getConnection()
        .createQueryBuilder()
        .select("webinar")
        .from(Webinar, "webinar")
        .where("webinar.id = :id", { id: webinarId })
        .getOne();
    } catch (e) {
      throw new HttpException('WEBINAR_FIND_BY_ID.UNKNOWN_ERROR', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async createNewWebinar(body: { name: string; url: string; chatroomId: number }) {
    if(this.isValidData(body)){
        await getConnection()
          .createQueryBuilder()
          .insert()
          .into(Webinar)
          .values([
            body,
          ])
          .execute();
    } else {
      throw new HttpException('WEBINAR_CREATE.MISSING_MANDATORY_PARAMETERS', HttpStatus.FORBIDDEN);
    }
  }

  async changeWebinarById(body: { id: number; name: string; url: string; chatroomId: number }) {
    if(this.isValidData(body) && body.id){
      await getConnection()
        .createQueryBuilder()
        .update(Webinar)
        .set({
          name: body.name,
          url: body.url,
          chatroomId: body.chatroomId
        })
        .where('id = :id', { id: body.id })
        .execute();
    } else {
      throw new HttpException('WEBINAR_CHANGE.MISSING_MANDATORY_PARAMETERS', HttpStatus.FORBIDDEN);
    }
  }



  private isValidData(body: { name: string; url: string; chatroomId: number }) {
    return body.name &&  body.url && body.chatroomId;
  }

  async deleteWebinarById( id: number ) {
    if (id) {
      if (await this.getWebinarById(id)) {
        await getConnection()
          .createQueryBuilder()
          .from(Webinar, 'webinar')
          .delete()
          .where('id = :id', { id: id })
          .execute();
      } else {
        throw new HttpException('WEBINAR_DELETE.NO_DATA_AT_INDEX', HttpStatus.NOT_FOUND);
      }
    } else {
      throw new HttpException('WEBINAR_DELETE.MISSING_MANDATORY_PARAMETERS', HttpStatus.FORBIDDEN);
    }
  }
}
