import { Document, Schema } from "mongoose"
import { Model } from "mongoose"
import { Types } from 'mongoose'
interface Extra {
    name: {
        en: string;
        ar: string;
    };
    price: number;
}

interface Image {
    url: string;
    description?: string;
}



export interface ApartmentInput {
    name: string;
    location: {
        city: string;
        address: string;
        coordinates: {
            lat: number;
            long: number;
        }
    };
    size: number;
    price: number;
    bedrooms: number;
    bathrooms: number;
    amenities: string[];
    images: Image[];
    description: string;
    availabilityStatus: 'Available' | 'Sold' | 'Rented';
}
export interface IApartmentDocument extends ApartmentInput, Document {

}


export interface IApartmentModel extends Model<IApartmentDocument> {
}

