import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Admin } from './admin.interface';
import { BaseService } from '../base.service';

@Injectable()
export class AdminService extends BaseService<Admin> {
  constructor(@InjectModel('Admin') private adminModel: Model<Admin>) {
    super(adminModel);
  }
}
