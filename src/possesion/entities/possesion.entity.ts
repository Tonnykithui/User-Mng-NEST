import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { User } from "src/user/entities/user.entity";
import { Document } from 'mongoose';

export type PossesionDocument = Possesion & Document;

@Schema()
export class Possesion {
    @Prop()
    Name:string;

    @Prop()
    Description:string;
    
    @Prop()
    Price:number;

    @Prop()
    YoM:string;

    @Prop({type:mongoose.Schema.Types.ObjectId, ref:'User'})
    OwnerId:User
}

export const PossesionSchema = SchemaFactory.createForClass(Possesion);
