import { ServiceResponse } from "@/types";
import { z } from "zod";
import { prisma } from "../../configs/prisma";
import { randomUUID } from "crypto";
import {
  CreateSubscription,
  SubscriptionFilters,
  SubscriptionResponse,
  UpdateSubscriptionParams,
  UpdateSubscriptionResponse,
} from "./types";
import { SubscriptionNotFoundError } from "@/errors";
import GetNextDueResponse from "./types/get-next-due-response";

export default class SubscriptionService {
  async createSubscription(
    subscription: CreateSubscription,
  ): Promise<ServiceResponse<string>> {
    const createSubscriptionSchema = z.object({
      id: z.string().uuid(),
      user_id: z.string().uuid(),
      name: z.string(),
      price: z.number(),
      billing_cycle: z.enum(["MONTHLY", "YEARLY"]),
      due_date: z.date(),
      installment: z.number().optional(),
      auto_detected: z.boolean(),
    });

    const { error, data } = createSubscriptionSchema.safeParse({
      ...subscription,
      due_date: new Date(subscription.due_date),
      id: randomUUID(),
    });

    if (error) {
      return {
        error,
        success: false,
      };
    }

    await prisma.subscription.create({
      data,
    });

    return {
      data: "Assinatura criada com sucesso",
      success: true,
    };
  }

  async GetByUserId(
    user_id: string,
    filters: SubscriptionFilters = {},
  ): Promise<ServiceResponse<SubscriptionResponse[]>> {
    try {
      const { name } = filters;

      const subscriptions = await prisma.subscription.findMany({
        where: {
          user_id,
          ...(name && {
            name: {
              contains: name,
              mode: "insensitive",
            },
          }),
        },
      });
      return {
        data: subscriptions,
        success: true,
      };
    } catch {
      throw new SubscriptionNotFoundError();
    }
  }

  async getById(
    id: string,
  ): Promise<ServiceResponse<SubscriptionResponse | null>> {
    try {
      const subscription = await prisma.subscription.findUnique({
        where: {
          id,
        },
      });

      return {
        data: subscription,
        success: true,
      };
    } catch {
      throw new SubscriptionNotFoundError();
    }
  }

  async getNextDue(
    user_id: string,
  ): Promise<ServiceResponse<GetNextDueResponse[]>> {
    const today = new Date();

    const pastDays = new Date(today);
    pastDays.setDate(today.getDate() - 3);

    const futureDays = new Date(today);
    futureDays.setDate(today.getDate() + 5);

    const subscriptions = await prisma.subscription.findMany({
      where: {
        user_id,
        due_date: {
          gte: pastDays,
          lte: futureDays,
        },
      },
      orderBy: {
        due_date: "asc",
      },
    });

    const response = subscriptions.map((subscription) => ({
      id: subscription.id,
      user_id: subscription.user_id,
      name: subscription.name,
      price: subscription.price,
      due_date: subscription.due_date,
    }));

    return {
      data: response,
      success: true,
    };
  }

  async updateSubscription(
    id: string,
    subscription: UpdateSubscriptionParams,
  ): Promise<ServiceResponse<UpdateSubscriptionResponse>> {
    const updateSubscriptionSchema = z.object({
      name: z.string().optional(),
      price: z.number().optional(),
      billing_cycle: z.enum(["MONTHLY", "YEARLY"]).optional(),
      due_date: z.date().optional(),
      installment: z.number().optional(),
      auto_detected: z.boolean().optional(),
    });

    const { error, data } = updateSubscriptionSchema.safeParse({
      ...subscription,
      due_date: subscription.due_date
        ? new Date(subscription.due_date)
        : undefined,
      id: id,
    });

    if (error) {
      return {
        error,
        success: false,
      };
    }

    const response = await prisma.subscription.update({
      where: {
        id: id,
      },
      data,
    });

    return {
      data: response,
      success: true,
    };
  }

  async deleteSubscription(id: string): Promise<ServiceResponse<string>> {
    const idSchema = z.string().uuid();

    const { error } = idSchema.safeParse(id);

    if (error) {
      return {
        error,
        success: false,
      };
    }

    await prisma.subscription.delete({
      where: {
        id: id,
      },
    });

    return {
      data: "",
      success: true,
    };
  }
}
