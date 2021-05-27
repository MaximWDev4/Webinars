import { Controller, Delete, Get, SetMetadata, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { RolesGuard } from '../common/role.guard';

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
  @UseGuards(RolesGuard)
  @SetMetadata('licence', 5)
  async remove(id: string){
    await this.usersService.remove(id);
  }

}
