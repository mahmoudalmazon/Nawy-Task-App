import { Document, Model, Schema } from "mongoose"
interface Image {
  image:string
  image_key:string
}
export interface RoomInput {
		bedsNumber: number
    rentType: string
    type: string
    Images?: Image[]
    apartment: Schema.Types.ObjectId
    subCategory: Schema.Types.ObjectId
    user?:Schema.Types.ObjectId
    rentPrice: number
    reserved?: boolean
    totalBeds: number
}


export interface IRoomDocument extends RoomInput, Document {
  // fullName: string
  availableBeds:number
}



export interface IRoomModel extends Model<IRoomDocument> {
}
