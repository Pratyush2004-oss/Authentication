import { MailtrapClient } from "mailtrap";
import dotenv from 'dotenv'

dotenv.config();

const TOKEN = "8bc5dfab2b4894fffde3be94c62a4587";

const client = new MailtrapClient({
  token: TOKEN,
});

const sender = {
  email: "hello@demomailtrap.com",
  name: "Mailtrap Test",
};
const recipients = [
  {
    email: "pratyush@sitp.ac.in",
  }
];

client
  .send({
    from: sender,
    to: recipients,
    subject: "You are awesome!",
    text: "Congrats for sending test email with Mailtrap!",
    category: "Integration Test",
  })
  .then(console.log, console.error);