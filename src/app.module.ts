import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { mongooseConfig } from './database/mongo.database';
import { AdminModule } from './modules/admin/admin.module';
import { CommonModule } from './modules/common.module';
import { MailerModule } from './modules/mailer.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Makes the ConfigModule globally available
    }),
    MongooseModule.forRoot(mongooseConfig.uri || process.env.DB_URI),
    AdminModule,
    CommonModule,
    MailerModule,
  ],
  providers: [],
})
export class AppModule {}
