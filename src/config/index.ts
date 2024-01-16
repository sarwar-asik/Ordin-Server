/* eslint-disable no-undef */
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
  env: process.env.NODE_ENV ,
  port: process.env.PORT || 5000,
  database_url: process.env.DATABASE_URL,
  bycrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS,
  jwt: {
    secret: process.env.JWT_SECRET,
    refresh_secret: process.env.JWT_REFRESH_SECRET,
    expires_in: process.env.JWT_EXPIRES_IN,
    refresh_expires_in: process.env.JWT_REFRESH_EXPIRES_IN,
  },
  ssl: {
    store_id: process.env.store_id,
    store_passwd: process.env.store_passwd,
    sslPaymentUrl: process.env.sslPaymentUrl,
  },
  frontend_url:process.env.frontend_url,
  nodeMailer: {
    FromEmail: process.env.FromEmail,
    appPassword: process.env.appPassword,
  },
};
