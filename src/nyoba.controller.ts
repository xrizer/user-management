import { Body, Controller, Param, Post, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { User as UserModel } from '@prisma/client';
import { createUserDto } from './dto/create-user.dto';
import { updateUserDto } from './dto/update-user.dto';

@Controller('deara')
export class nyobaControllers {
  constructor(private readonly userService: UserService) {}
  @Post('user-roles')
  async create(@Body() userData: createUserDto): Promise<UserModel> {
    return this.userService.createUser(userData);
  }
  @Put('user-roles')
  async update(@Body() userData: updateUserDto, @Param('id') id: string) {
    return this.userService.updateUser({
      where: { id: Number(id) },
      data: userData,
    });
  }
}
