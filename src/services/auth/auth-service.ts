import jwt from "jsonwebtoken";
import { compare } from "bcrypt";
import { ServiceResponse } from "@/types";
import { prisma } from "../../configs/prisma";
import { AuthParams, ResetPasswordParams } from "./types";
import { z } from "zod";
import { errorMessage } from "@/utils";
import { env } from "@/env";
import { randomBytes } from "crypto";
import { addHours } from "date-fns";
import bcrypt from "bcrypt";
import { salt } from "@/configs/salt";
import transporter from "../../configs/nodemailer";
import { sendEmail } from "./utils";

export default class AuthService {
  async auth(userData: AuthParams): Promise<ServiceResponse<{ token: string }>> {
    const loginSchema = z.object({
      email: z.string().email(),
      password: z.string(),
    });

    const { error, data } = loginSchema.safeParse(userData);

    if (error) {
      return {
        error,
        success: false,
      };
    }

    const { email, password } = data;

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return errorMessage("Falha na auntenticação");
    }

    const { password_hash, ...payload } = user;

    const passwordMatch = await compare(password, password_hash);

    if (!passwordMatch) {
      return errorMessage("Falha na auntenticação");
    }

    const token = jwt.sign(payload, env.JWT_SECRET, {
      expiresIn: "1h",
    });

    return {
      data: {
        token
      },
      success: true,
    };
  }

  async requestPasswordReset(email: string): Promise<ServiceResponse<string>> {
    const user = await prisma.user.findUnique({
      where: {
        email
      }
    })

    if (!user) {
      return errorMessage("Usuário não encontrado");
    }

    const token = randomBytes(32).toString('hex');
    const expires_at = addHours(new Date(), 1);

    await prisma.passwordResetToken.create({
      data: {
        token,
        user_id: user.id,
        expires_at
      }      
    })

    sendEmail(email, token);

    return {
      data: "Enviado e-mail de redefinição de senha",
      success: true
    }

  }

  async resetPassword(userData: ResetPasswordParams): Promise<ServiceResponse<string>> {
    const resetPasswordSchema = z.object({
      token: z.string(),
      password: z.string(),
    });

    const {error, data} = resetPasswordSchema.safeParse(userData)

    if(error) {
      return {
        error,
        success: false,
      };
    }

    const {token, password} = data

    const passwordResetToken = await prisma.passwordResetToken.findUnique({
      where: {
        token
      }
    })

    if(!passwordResetToken || passwordResetToken.expires_at < new Date()) {
      return errorMessage("Token inválido");
    }

    const hashedPassword = await bcrypt.hash(password, salt);

    await prisma.user.update({
      where: {
        id: passwordResetToken.user_id,
      },
      data: {
        password_hash: hashedPassword
      }
    })

    await prisma.passwordResetToken.delete({
      where: {
        token
      }
    })

    return {
      data: "Senha alterada com sucesso",
      success: true
    }

    
    
  }
}
