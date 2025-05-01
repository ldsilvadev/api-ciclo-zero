import { ServiceResponse } from "@/types";
import CreateUser from "./types/create-user";
import { prisma } from "../../configs/prisma";
import { z } from "zod";
import bcrypt from "bcrypt";
import { errorMessage } from "@/utils";
import { salt } from "@/configs/salt";
import { randomUUID } from "crypto";

export default class UserService {
  async createUser(user: CreateUser): Promise<ServiceResponse<string>> {
    const createUserSchema = z.object({
      id: z.string().uuid(),
      name: z.string(),
      email: z.string(),
      password_hash: z.string(),
      // plan: z.enum(["free", "premium"]),
      // created_at: z.date(),
    });

    const { error, data } = createUserSchema.safeParse({
      ...user,
      id: randomUUID(),
    });

    if (error) {
      return {
        error,
        success: false,
      };
    }

    const userExist = await prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (userExist) {
      return errorMessage("Usuário ja cadastrado");
    }

    const hashedPassword = await bcrypt.hash(user.password_hash, salt);

    const payload = {
      ...data,
      password_hash: hashedPassword,
    };

    await prisma.user.create({
      data: payload,
    });

    return {
      data: "Usuário criado com sucesso",
      success: true,
    };
  }
}
