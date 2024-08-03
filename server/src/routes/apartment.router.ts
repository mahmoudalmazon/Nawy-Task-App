import express from "express";
const router = express.Router();
import  apartmentController from "../controllers/apartment.controller";
import { ParamsValidator, RequestValidator,Schemas } from "../middlewares/requestvalidator.middleware";

router.get("/", apartmentController.getAllApartments);
router.get("/:id",ParamsValidator(Schemas.apartment.getOne) ,apartmentController.getApartmentById);
router.post("/", RequestValidator(Schemas.apartment.create), apartmentController.createApartment);
router.patch("/:id",ParamsValidator(Schemas.apartment.getOne), RequestValidator(Schemas.apartment.edit), apartmentController.updateApartment);
router.delete("/:id",ParamsValidator(Schemas.apartment.deleteOne), apartmentController.deleteApartment);

export default router 