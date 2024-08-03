import dotenv  from "dotenv";
dotenv.config();
const env = process.env.NODE_ENV?.trimEnd();
const DB_OPTIONS = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  socketTimeoutMS: 30000, 
  keepAlive: true,
  autoIndex: true,
  retryWrites: true,
};
const DB_USERNANE =  env === "production" ? process.env.DB_USERNAME : process.env.DB_USERNAME_TEST;
const DB_PASSWORD =  env === "production" ? process.env.DB_PASSWORD : process.env.DB_PASSWORD_TEST;
const DB_NAME = env === "production" ? process.env.DB_NAME : process.env.DB_NAME_TEST;
const DB_URI =
  env === "production"
    ? `mongodb+srv://${DB_USERNANE}:${DB_PASSWORD}@nawytask.ozecncm.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`
    : `mongodb+srv://${DB_USERNANE}:${DB_PASSWORD}@nawytask.ozecncm.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`;
const DB = {
  username: DB_USERNANE,
  password: DB_PASSWORD,
  name: DB_NAME,
  options: DB_OPTIONS,
  uri: DB_URI,
};
//jwt
// const jwtSecret = process.env.SERVER_TOKEN_SECRET ;
// const jwtExpireIn = process.env.SERVER_TOKEN_EXPIRESIN ;
const jwtSecret = process.env.SERVER_TOKEN_SECRET ;
const jwtExpireIn = process.env.SERVER_TOKEN_EXPIRESIN ;
const cookieExpireIn = process.env.SERVER_COOKIE_EXPIRESIN ;



//server
const SERVER_PORT = process.env.SERVER_PORT || 8000 ;
const SERVER_CORS_ORIGIN = process.env.SERVER_CORS_ORIGIN || "http://localhost:3000";
const SERVER_TOKEN_SECRET =process.env.SERVER_TOKEN_SECRET || "somesupersecret";
const SERVER_TOKEN_ISSUER = process.env.SERVER_TOKEN_ISSUER || "error-404";
const SERVER_COOKIE_SECRET = process.env.SERVER_COOKIE_SECRET || "secret";
const SERVER_COOKIE_DOMAIN = process.env.SERVER_COOKIE_DOMAIN || "localhost";
const SERVER = {
  port: SERVER_PORT,
  token: {
    issuer: SERVER_TOKEN_ISSUER,
    secret: SERVER_TOKEN_SECRET,
  },
  cookie: {
    secret: SERVER_COOKIE_SECRET,
    domain: SERVER_COOKIE_DOMAIN || 'localhost:3000',
  },
  cors: {
    origin: SERVER_CORS_ORIGIN,
  },
};
//url
const CLIENT_URI = process.env.CLIENT_URI || "http://localhost:3000";

const CLIENT = {
  uri: CLIENT_URI,
};






const TESTING_TOKEN = process.env.TESTING_TOKEN;
const PRODUCTION_TOKEN = process.env.PRODUCTION_TOKEN;
const TESTING_BASEURL = process.env.TESTING_BASEURL;
const PRODUCTION_BASEURL = process.env.PRODUCTION_BASEURL;


const BASEURL= env === "production" ? PRODUCTION_BASEURL  : TESTING_BASEURL;
const TOKEN = env === "production" ? PRODUCTION_TOKEN : TESTING_TOKEN;

// EXPORT VARIABLES
export default {
  db: DB,
  server: SERVER,
  client: CLIENT,
  jwtSecret,
  jwtExpireIn,
  cookieExpireIn,
  BASEURL,
  TOKEN,
};