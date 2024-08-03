import  xml2js  from 'xml2js';
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import TransactionTokenModel from "../models/TransactionToken";
import config from "../config/config";
import { NOT_FOUND, UNAUTHORIZED_ACCESS } from "../utils/namespace.util";
import User from "../models/User";
import axios from "axios";
import Guest from '../models/Guest';
import Booking from '../models/Booking';
const headers = {
  headers: { "Content-Type": "text/xml" },
};
const extractJwtFromCookie = (
  req: Request<any,any,any,any>,
  res: Response,
  next: NextFunction
) => {
  console.log('errrrrrrrrrrrrrrrrrrrrrrrrrrrrrror')
  const path = req.path.split("/").at(-1);
  const token =
    path === "refresh" || path === "signout"
      ? req.cookies?.persist
      : req.cookies?.auth;
    console.log("🚀 ~ file: tokenextractor.middleware.ts:20 ~ token:", token)

  if (token) {
    jwt.verify(
      token,
      config.server.token.secret,
      async (error: any, decoded: any) => {
       try{
         if (error) {
          res.status(401).json({
            status: 'failed',
            message: NOT_FOUND,
          });
        } else {
          console.log('before')
          const user = await User.findById( decoded._id) || await Guest.findById(decoded._id);
          if (!user) {
            res.status(401).json({
              status: 'failed',
              message: NOT_FOUND,
            });
          }
          res.locals.encodedToken = token;
          res.locals.decodedToken = decoded;
          res.locals.user = user;
          next();
        }
       }catch(error){
          console.log('error happened during extracting token',error)
          res.status(401).json({
            status: 'failed',
            message: NOT_FOUND,
          });
        }
      }
    );
  } else {
    res.status(401).json({
      status: 'failed',
      message: NOT_FOUND,
    });
  }
};
const extractJwtFromHeader = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers?.authorization?.split(" ")[1];

  if (token) {
    jwt.verify(
      token,
      config.server.token.secret,
      (error: any, decoded: any) => {
        if (error) {
          const err: any = new Error(NOT_FOUND);
          err.status = 404;
          next(err);
        } else {
          res.locals.verificationToken = decoded;
          next();
        }
      }
    );
  } else {
    const err: any = new Error(UNAUTHORIZED_ACCESS);
    err.status = 401;
    err.statusCode = 401;
    next(err);
  }
};
const extractTransactionTokenFromCookie = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const TransactionToken = req.signedCookies?.TransToken || req.body.TransToken;
  if (TransactionToken) {
    try {
      const TransToken = await TransactionTokenModel.findOne({
        TransactionToken: TransactionToken,
      });
      // const checkifTokenExist = await Booking.find({TransactionToken:TransactionToken});
      // if(checkifTokenExist.length > 0){
      //   const err: any = new Error("Token Already Used");
      //   err.status = 409;
      //   err.statusCode = 409;
      //   throw err;
      // }
      const response = await axios.post(
        config.DPOinfo.Endpoint,
        `<API3G>
        <CompanyToken>${config.DPOinfo.TestCompanyToken}</CompanyToken>
        <Request>verifyToken</Request>
        <TransactionToken>${TransactionToken}</TransactionToken>
      </API3G>`,
        headers
      );
      xml2js.parseString(response.data, (error, result) => {
        if (error) {
          throw error;
        }
        if (result.API3G.Result[0] !== "000" || TransToken?.bookingId) {
          const error: any = new Error(result.API3G.Result[0]);
          error.status = 409;
          throw error;
        }
        req.body.TransactionToken = TransToken
        next();
      });
    } catch (error) {
      next(error);
    }
  } else {
    const err: any = new Error(UNAUTHORIZED_ACCESS);
    err.status = 401;
    next(err);
  }
};
const extractJwtDashboardFromCookie = (
  req: Request<any,any,any,any>,
  res: Response,
  next: NextFunction
) => {
  const path = req.path.split("/").at(-1);
  const token =
    path === "refresh" || path === "signout"
      ? req.cookies?.persist
      : req.cookies?.auth;
  if (token) {
    jwt.verify(
      token,
      config.server.token.secret,
      async (error: any, decoded: any) => {
       try{
         if (error) {
          const err: any = new Error(NOT_FOUND);
          err.status = 404;
          next(err);
        } else {
          const user = await User.findById( decoded._id);
          if (!user) {
            const err: any = new Error(UNAUTHORIZED_ACCESS);
            err.status = 404;
            next(err);
          }
          res.locals.encodedToken = token;
          res.locals.decodedToken = decoded;
          res.locals.user = user;
          next();
        }
       }catch(err){
          next(err)
       }
      }
    );
  } else {
    const err: any = new Error(UNAUTHORIZED_ACCESS);
    err.status = 401;
    next(err);
  }
};
export {
  extractJwtFromCookie,
  extractJwtFromHeader,
  extractTransactionTokenFromCookie,
};
