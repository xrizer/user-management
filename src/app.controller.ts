import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User as UserModel } from '@prisma/client';

@Controller('v1/api')
export class AppController {
  constructor(private readonly userService: UserService) {}
  @Get('user-roles')
  async getAllUserRoles(): Promise<UserModel[]> {
    return this.userService.users({});
  }
  @Post('user-roles')
  async signupUser(
    @Body() userData: { role: string; status: string },
  ): Promise<UserModel> {
    return this.userService.createUser(userData);
  }

  @Put('user-roles/:id')
  async publishPost(
    @Param('id') id: string,
    @Body() userData: { role: string; status: string },
  ): Promise<UserModel> {
    return this.userService.updateUser({
      where: { id: Number(id) },
      data: userData,
    });
  }

  @Delete('user-roles/:id')
  async deleteUser(@Param('id') id: string): Promise<UserModel> {
    return this.userService.deleteUser({ id: Number(id) });
  }
}
