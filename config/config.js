import dotenv from "dotenv";
dotenv.config();

const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
};

export default config;
