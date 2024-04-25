import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class User {
  @Prop({ required: true })
  firstname: string;

  @Prop({ required: true })
  lastname: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true, type: Object })
  result: {
    score: number;
    max: number;
  };
}

export const UserSchema = SchemaFactory.createForClass(User);
