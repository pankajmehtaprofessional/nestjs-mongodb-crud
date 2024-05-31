import { Controller, Get } from '@nestjs/common';
import { AdminService } from './admin.service';
import { Admin } from './admin.schema';
import { ResponseDto } from '../../common/dto/response.dto';
import { ResponseService } from '../../common/services/response.service';

@Controller('admins')
export class AdminController {
  constructor(
    private readonly adminService: AdminService,
    private readonly responseService: ResponseService,
  ) {}

  @Get()
  async findAll(): Promise<ResponseDto<Admin[]>> {
    const response = await this.adminService.findAll();
    return this.responseService.success(response, 'Success');
  }

  //   @Post()
  //   async create(@Body() createUserDto: { name: string; email: string }): Promise<User> {
  //     return this.userService.createUser(createUserDto.name, createUserDto.email);
  //   }
}
