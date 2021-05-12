import { Controller, Delete, Get } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService){
  }

  @Get('all')
  async findAll() {
    await this.usersService.findAll();
  }

  @Get(':id')
  async findOne(id: string) {
    await this.usersService.findOne(id);
  }
  @Delete(':id')
  async remove(id: string){
    await this.usersService.remove(id);
  }

}
