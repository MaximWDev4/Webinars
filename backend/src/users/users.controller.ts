import { Body, Controller, Delete, Get, Post, Query, SetMetadata, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { RolesGuard } from '../common/role.guard';
import { ResponseError, ResponseSuccess } from '../common/response.dto';
import { UserDto } from './dto/user.dto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService){
  }

  @Get('all')
  async findAll() {
    try {
      const data = await this.usersService.findAll();
      return new ResponseSuccess('USER.BY_ID_SUCCESS', data)
    } catch (e) {
      return new ResponseError( 'USER.BY_ID_ERROR', e)
    }

  }

  @Get('byId')
  async findOne(@Query() id: string) {
    try {
      const data = await this.usersService.findOne(id);
      return new ResponseSuccess('USER.BY_ID_SUCCESS', data)
    } catch (e) {
      return new ResponseError( 'USER.BY_ID_ERROR', e)
    }
  }

  @Post('change')
  @UseGuards(RolesGuard)
  @SetMetadata('licence', 5)
  async change(@Body() user: {id: number, email: string,  licence: number, userName: string}){
    try {
      const data = await this.usersService.change(user);
      return new ResponseSuccess('USER.DELETE_SUCCESS', data)
    } catch (e) {
      return new ResponseError( 'USER.DELETE_ERROR', e)
    }
  }

  @Post('delete')
  @UseGuards(RolesGuard)
  @SetMetadata('licence', 5)
  async remove(@Body() id: string){
    try {
      const data = await this.usersService.remove(id);
      return new ResponseSuccess('USER.DELETE_SUCCESS', data)
    } catch (e) {
      return new ResponseError( 'USER.DELETE_ERROR', e)
    }
  }

}
