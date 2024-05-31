import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminSchema } from './admin.schema';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { ResponseService } from '../../common/services/response.service';
import { MailerService } from '../../common/services/mailer.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Admin', schema: AdminSchema }]),
  ],
  providers: [AdminService, ResponseService, MailerService],
  controllers: [AdminController],
})
export class AdminModule {}
