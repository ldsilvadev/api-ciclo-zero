import transporter from "@/configs/nodemailer";
import { env } from "@/env";
import path from "path";
import fs from "fs";

export default async function sendEmail(email: string, token: string) {
  const templatePath = path.join(
    __dirname,
    "../../../",
    "templates",
    "resetPassword.html",
  );
  const template = fs.readFileSync(templatePath, "utf-8");

  const html = template.replace("{{TOKEN}}", token);

  await transporter.sendMail({
    from: env.EMAIL_USER,
    to: email,
    subject: "Redefinição de Senha - Ciclo Zero",
    html,
  });
}
