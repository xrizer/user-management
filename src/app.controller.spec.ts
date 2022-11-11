import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { PrismaService } from './prisma.service';
import { UserService } from './user.service';

describe('CatsController', () => {
  let appController: AppController;
  let usersService: UserService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [UserService, PrismaService],
    }).compile();

    usersService = moduleRef.get<UserService>(UserService);
    appController = moduleRef.get<AppController>(AppController);
  });
  describe('signUpUser', () => {
    it('should return a user that has been created', async () => {
      const result = {
        id: expect.any(Number),
        role: 'newadmin',
        status: 'false',
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      };
      jest
        .spyOn(usersService, 'createUser')
        .mockImplementation(() => new Promise((resolve) => resolve(result)));
      expect(
        await appController.signupUser({ role: 'newadmin', status: 'false' }),
      ).toEqual(result);
    });
  });
  describe('updateUser', () => {
    it('should return a user that has been updated', async () => {
      const result = {
        id: expect.any(Number),
        role: 'adminUpdateTest',
        status: 'false',
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      };
      jest
        .spyOn(usersService, 'updateUser')
        .mockImplementation(() => new Promise((resolve) => resolve(result)));
      expect(
        await appController.updateUser(1, {
          role: 'adminUpdateTest',
          status: 'false',
        }),
      ).toEqual(result);
    });
  });

  describe('deleteUser', () => {
    it('should return a user that has been deleted', async () => {
      const result = {
        id: expect.any(Number),
        role: 'adminUpdateTest',
        status: 'false',
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      };
      jest
        .spyOn(usersService, 'deleteUser')
        .mockImplementation(() => new Promise((resolve) => resolve(result)));
      expect(await appController.deleteUser(1)).toEqual(result);
    });
  });

  describe('findAll', () => {
    it('should return an array of cats', async () => {
      const result = [];
      jest
        .spyOn(usersService, 'user')
        .mockImplementation(() => new Promise((resolve) => resolve(result)));
      expect(await appController.getAllUserRoles()).toEqual(result);
    });
  });
});
