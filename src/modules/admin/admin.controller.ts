import { Controller, Get, Post, Body, UsePipes, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { AdminService } from './admin.service';
import { ResponseDto } from '../../common/dto/response.dto';
import { ResponseService } from '../../common/services/response.service';
import { MailerService } from '../../common/services/mailer.service';
import { JoiValidationPipe } from '../../common/dto/joi-validation.dto';
import * as Joi from 'joi';
import { IPaginationResponse } from 'src/common/typings';
import { Admin } from './admin.interface';

const sendEmailSchema = Joi.object({
  to: Joi.string().email().required(),
  subject: Joi.string().required(),
  text: Joi.string().required(),
  html: Joi.string().optional(),
});

@ApiTags('Admins')
@Controller('admins')
export class AdminController {
  constructor(
    private readonly adminService: AdminService,
    private readonly responseService: ResponseService,
    private readonly mailerService: MailerService,
  ) {}

  @ApiOperation({ summary: 'List' })
  @ApiResponse({ status: 200, description: 'Return the list.' })
  @Get()
  async list(): Promise<ResponseDto<IPaginationResponse>> {
    const response = await this.adminService.paginateData([], {});
    return this.responseService.success(response);
  }

  @ApiOperation({ summary: 'Detail' })
  @ApiResponse({ status: 200, description: 'Return detail.' })
  @Get(':id')
  async get(@Param('id') id: string): Promise<ResponseDto<Admin>> {
    const response = await this.adminService.findOne({ _id: id });
    return this.responseService.success(response);
  }

  @ApiOperation({ summary: 'Send an email' })
  @ApiResponse({
    status: 201,
    description: 'The email has been successfully sent.',
  })
  @ApiResponse({ status: 400, description: 'Invalid input data.' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        to: {
          type: 'string',
          example: 'recipient@example.com',
          description: 'Recipient email address',
        },
        subject: {
          type: 'string',
          example: 'Subject of the email',
          description: 'Subject of the email',
        },
        text: {
          type: 'string',
          example: 'Body of the email',
          description: 'Plain text body of the email',
        },
        html: {
          type: 'string',
          example: '<p>HTML body of the email</p>',
          description: 'HTML body of the email',
          nullable: true,
        },
      },
    },
  })
  @Post('send-email')
  @UsePipes(new JoiValidationPipe(sendEmailSchema))
  async sendEmail(
    @Body() body: { to: string; subject: string; text: string; html?: string },
  ) {
    const { to, subject, text, html } = body;
    return await this.mailerService.sendMail(to, subject, text, html);
  }
}
