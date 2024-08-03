import { Document } from "mongoose"

export interface BuildingInput {
	name: {
			en:string
			ar:string
	}
	image: string
	image_key:string
	address: string
	category: string
	subCategories: Array<string>
}

export interface IBuildingDocument extends BuildingInput, Document {
	// fullName: string
}