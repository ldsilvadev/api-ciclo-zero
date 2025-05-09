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
      password: z.string(),
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

    const hashedPassword = await bcrypt.hash(user.password, salt);

    const { password, ...userInfos } = data;

    const payload = {
      ...userInfos,
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

  async getUsers() {
    const users = await prisma.user.findMany();

    return {
      data: users,
      success: true,
    };
  }
}
