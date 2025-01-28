import { MailtrapClient } from "mailtrap";
import dotenv from "dotenv";

dotenv.config();

const TOKEN = process.env.MAIL_TOKEN;
const ENDPOINT = process.env.MAIL_ENDPOINT;

export const mailClient = new MailtrapClient({
  endpoint: ENDPOINT,
  token: TOKEN,
});

export const sender = {
  email: "hello@demomailtrap.com",
  name: "Mailtrap Test",
};
