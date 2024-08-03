import { Document, Schema } from "mongoose"

export interface DepartmentInput {
		name?:any
}


export interface IDepartmentDocument extends DepartmentInput, Document {
  // fullName: string
	
}
