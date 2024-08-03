import express, { NextFunction, Request, Response } from "express";
import "express-async-errors";
import helmet from "helmet";
import mongoSanitize from "express-mongo-sanitize";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import globalErrorHandler from "./controllers/error.controller";
import connection from "./utils/mongoose";
//routes
import apartmentRouter from "./routes/apartment.router";
import config from "./config/config";


const app = express();

app.use(cookieParser("secret"));
app.disable("x-powered-by");
const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:3001",
  "http://localhost:9999",
  "*"

];
app.use((req: Request, res: Response, next: NextFunction) => {
  res.header("Access-Control-Allow-Credentials", "true");
  const origin: string = req.headers.origin || "";
  console.log("🚀 ~ file: server.ts:50 ~ app.use ~ origin:", origin);
  if (allowedOrigins.includes(origin)) {
    res.header("Access-Control-Allow-Origin", origin);
  }
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT, PATCH");
    return res.status(200).json({});
  }
  next();
});
// app.use(cors({
// 	origin:config.server.cors.origin,
// 	credentials: true
// }))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(helmet());
app.use(mongoSanitize());
app.use(morgan("dev"));

//routes
app.use("/api/v1/apartment",apartmentRouter);


app.use(globalErrorHandler);
connection();
const server = app.listen(config.server.port, () => {
  console.log(`this app is listening on port ${config.server.port}....`);
});


