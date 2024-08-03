import mongoose from "mongoose";
import { IApartmentDocument, IApartmentModel } from "../interfaces/apartment.interface";
const ApartmentSchema = new mongoose.Schema<IApartmentModel>(
    {
        name: { type: String, required: true },
        location: {
            city: { type: String, required: true },
            address: { type: String, required: true },
            coordinates: {
                lat: { type: Number, required: true },
                long: { type: Number, required: true }
            }
        },
        size: { type: Number, required: true },
        price: { type: Number, required: true },
        bedrooms: { type: Number, required: true },
        bathrooms: { type: Number, required: true },
        amenities: { type: [String], default: [] },
        images: { type: [
            {
                url: { type: String, required: true },
                description: { type: String, required: false }
            }
        ], default: [] },
        description: { type: String, required: true },
        availabilityStatus: {
            type: String,
            enum: ['Available', 'Sold', 'Rented'],
            default: 'Available'
        },
        createdAt: { type: Date, default: Date.now }
    },
    {
        timestamps: true,
        versionKey: false,
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
        id: false,
    }
);

const Apartment = mongoose.model<IApartmentDocument>("Apartment", ApartmentSchema);

export default Apartment;
