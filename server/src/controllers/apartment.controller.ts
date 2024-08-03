import { NextFunction, Response, Request } from "express";
import apartmentService from "../services/apartment.service";
import { ApartmentInput, IApartmentDocument } from "../interfaces/apartment.interface";

const createApartment = async (req: Request<{}, {}, ApartmentInput, {}>, res: Response, next: NextFunction) => {
    try {
        const apartment = await apartmentService.createApartment(req.body);
        res.status(201).json(apartment);
    } catch (error) {
        next(error);
    }
}
const getAllApartments = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const apartments = await apartmentService.getAllApartment();
        res.status(200).json(apartments);
    } catch (error) {
        next(error);
    }
}

const getApartmentById = async (
    req: Request<{ id: string }, {}, {}, {}>,
    res: Response,
    next: NextFunction
) => {
    try {
        const apartment = await apartmentService.getApartment(req.params.id);
        res.status(200).json(apartment);
    } catch (error) {
        next(error);
    }
}

const updateApartment = async (
    req: Request<{ id: string }, {}, ApartmentInput, {}>,
    res: Response,
    next: NextFunction
) => {
    try {
        const apartment = await apartmentService.updateApartment(req.params.id, req.body);
        res.status(200).json(apartment);
    } catch (error) {
        next(error);
    }
}
const deleteApartment = async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
    try {
        const apartment = await apartmentService.deleteApartmentById(req.params.id);
        res.status(200).json(apartment);
    } catch (error) {
        next(error);
    }
}
export default { createApartment, getAllApartments, getApartmentById, updateApartment, deleteApartment }