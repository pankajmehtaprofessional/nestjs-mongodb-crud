import { Document } from 'mongoose';

export interface Admin extends Document {
  readonly name: string;
  readonly email: string;
}
