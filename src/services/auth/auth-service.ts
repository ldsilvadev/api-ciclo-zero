import jwt from "jsonwebtoken";
import { compare } from "bcrypt";
import { ServiceResponse } from "@/types";
import { prisma } from "../../configs/prisma";
import { AuthParams } from "./types";
import { z } from "zod";
import { errorMessage } from "@/utils";
import { env } from "@/env";

export default class AuthService {
  async auth(userData: AuthParams): Promise<ServiceResponse<string>> {
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
      data: token,
      success: true,
    };
  }
}
