import { ObjectId } from "mongoose";
import Joi, { ObjectSchema, object, string } from "joi";
import { NextFunction, Request, Response } from "express";

import {
  IUserSignin,
  IUserInput,
  IUserVerification,
} from "../interfaces/user.interface";
import { ApartmentInput } from "../interfaces/apartment.interface";


export const RequestValidator = (schema: ObjectSchema) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.validateAsync(req.body);
      next();
    } catch (error: any) {
      // const err: any = new Error(error)
      const err: any = new Error(error.details[0].message);
      err.status = 422;
      next(err);
    }
  };
};

export const QueryValidator = (schema: ObjectSchema) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.validateAsync(req.query);
      next();
    } catch (error: any) {
      const err: any = new Error(error.details[0].message);
      err.status = 422;
      next(err);
    }
  };
};

export const ParamsValidator = (schema: ObjectSchema) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.validateAsync(req.params);
      next();
    } catch (error: any) {
      const err: any = new Error(error.details[0].message);
      err.status = 422;
      next(err);
    }
  };
};

export const Schemas = {
  auth: {
    signin: Joi.object<IUserSignin>({
      email: Joi.string().required(),
      password: Joi.string().required(),
    }),
    googleSignIn: Joi.object({
      idToken: Joi.string().required(),
    }),
    sendVerification: Joi.object<IUserVerification>({
      email: Joi.string().required(),
      // type: Joi.string().valid('verify', 'reset').required()
    }),
    confirmAndModifyPassword: Joi.object<IUserSignin>({
      password: Joi.string().required(),
    }),
  },
  user: {
    create: Joi.object<IUserInput>({
      username: Joi.string().required(),
      email: Joi.string().required(),
      password: Joi.string().required(),
      phoneNumber: Joi.string().optional(),
      passwordConfirmation: Joi.any().valid(Joi.ref("password")),
      role: Joi.string().valid("user", "admin", "supervisor").optional(),
      imageProfile: Joi.string().optional(),
      image: Joi.string().optional(),
      image_key: Joi.string().optional(),
    }),
    edit: Joi.object<IUserInput>({
      username: Joi.string().required(),
      email: Joi.string().required(),
      password: Joi.string().required(),
      phoneNumber: Joi.string().optional(),
      image: Joi.string().optional(),
      image_key: Joi.string().optional(),
    }),
    unactive: Joi.object({
      id: Joi.string().required(),
    }),
    changepassword: Joi.object({
      oldpassword: Joi.string().required(),
      newpassword: Joi.string().required(),
      confirmPassword: Joi.valid(Joi.ref("newpassword")).required(),
    }),
  },

  apartment: {
    create: Joi.object({
      name: Joi.string().required(),
      location: Joi.object({
        city: Joi.string().required(),
        address: Joi.string().required(),
        coordinates: Joi.object({
          lat: Joi.number().required(),
          long: Joi.number().required()
        }).required()
      }).required(),
      size: Joi.number().required(),
      price: Joi.number().required(),
      bedrooms: Joi.number().required(),
      bathrooms: Joi.number().required(),
      amenities: Joi.array().items(Joi.string()).required(),
      images: Joi.array().items(Joi.object({
        url: Joi.string().required(),
        description: Joi.string().optional()
      })).optional(),
      description: Joi.string().required(),
      availabilityStatus: Joi.string().valid('Available', 'Sold', 'Rented').required(),
    }),
    getOne: Joi.object({
      id: Joi.string().required(),
    }),
    deleteOne: Joi.object({
      id: Joi.string().required(),
    }),
    edit: Joi.object<ApartmentInput>({
      name: Joi.string().optional(),
      location: Joi.object({
        city: Joi.string().required(),
        address: Joi.string().required(),
        coordinates: Joi.object({
          lat: Joi.number().required(),
          long: Joi.number().required()
        }).optional()
      }).optional(),
      size: Joi.number().optional(),
      price: Joi.number().optional(),
      bedrooms: Joi.number().optional(),
      bathrooms: Joi.number().optional(),
      amenities: Joi.array().items(Joi.string()).optional(),
      images: Joi.array().items(Joi.object({
        url: Joi.string().uri().required(),
        description: Joi.string().optional()
      })).optional,
      availabilityStatus: Joi.string().valid('Available', 'Sold', 'Rented').optional(),
      description: Joi.string().optional(),

  })
  }
};
