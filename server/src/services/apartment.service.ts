import Apartment from "../models/apartment.model";
import { ApartmentInput,IApartmentDocument} from "../interfaces/apartment.interface";

const createApartment = async (Payload: ApartmentInput) => {
    try {
        const apartment = new Apartment(Payload);
        await apartment.save();
        return apartment;
    } catch (error) {
        throw error;
    }
}

 const updateApartment = async (id: string, Payload: Partial<ApartmentInput>) => {
    try {
        // Find the apartment by id
        const apartment = await Apartment.findById(id);
        // Throw an error if the apartment does not exist
        if (!apartment) {
            throw new Error('Apartment not found');
        }


        const updatedApartment = await Apartment.findByIdAndUpdate(id, Payload, { new: true });
        return updatedApartment;
    } catch (error) {
        throw error;
    }
}

const deleteApartmentById = async (id: string): Promise<IApartmentDocument> => {
    try {
        const deletedApartment: IApartmentDocument | null = await Apartment.findByIdAndDelete(id);
        if (!deletedApartment) {
            throw new Error('Apartment not found');
        }
        return deletedApartment;
    } catch (error) {
        throw error;
    }
}

const getApartment = async (id: string): Promise<IApartmentDocument> => {
    try {
        const apartment: IApartmentDocument | null = await Apartment.findById(id);
        if (!apartment) {
            throw new Error('Apartment not found');
        }
        return apartment;
    } catch (error) {
        throw error;
    }
}

const getAllApartment = async (): Promise<IApartmentDocument[]> => {
    try {
        const apartments: IApartmentDocument[] = await Apartment.find();
        return apartments;
    } catch (error) {
        throw error;
    }
}
export default {
    createApartment,
    updateApartment,
    deleteApartmentById,
    getApartment,
    getAllApartment
}