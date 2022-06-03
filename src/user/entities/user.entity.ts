import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Roles } from "../dto/create-user.dto";
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
    @Prop()
    Name:string;

    @Prop()
    Email:string;

    @Prop()
    Password:string;

    @Prop()
    DoB:Date;

    @Prop()
    Role:Roles[]
}

export const UserSchema = SchemaFactory.createForClass(User);
