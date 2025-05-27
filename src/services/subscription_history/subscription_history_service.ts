import { z } from "zod";
import {
  CreateSubscriptionHistory,
  GetTotalResponse,
  SubscriptionHistoryResponse,
} from "./types";
import { prisma } from "../../configs/prisma";
import { randomUUID } from "crypto";
import { ServiceResponse } from "../../types";
import { SubscriptionNotFoundError } from "../../errors";
import addBillingMonth from "./utils";

export default class SubscriptionHistoryService {
  async createSubscriptionHistory(
    subscription: CreateSubscriptionHistory,
  ): Promise<ServiceResponse<string>> {
    const createSubscriptionHistorySchema = z.object({
      id: z.string().uuid(),
      user_id: z.string().uuid(),
      subscription_id: z.string().uuid(),
      due_date: z.date(),
      price: z.number(),
    });

    const { error, data } = createSubscriptionHistorySchema.safeParse({
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

    await prisma.subscriptionsHistory.create({
      data,
    });

    const newDueDate = addBillingMonth(subscription.due_date);

    await prisma.subscription.update({
      where: {
        id: subscription.subscription_id,
      },
      data: {
        due_date: newDueDate,
      },
    });

    return {
      data: "Histórico de assinaturas atualizado com sucesso",
      success: true,
    };
  }

  async getByUserId(
    user_id: string,
  ): Promise<ServiceResponse<SubscriptionHistoryResponse[]>> {
    try {
      const subscriptions = await prisma.subscriptionsHistory.findMany({
        where: {
          user_id,
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

  async getTotal(user_id: string): Promise<ServiceResponse<GetTotalResponse>> {
    try {
      const result = await prisma.subscriptionsHistory.aggregate({
        _sum: {
          price: true,
        },
        where: {
          user_id,
        },
      });

      return {
        data: {
          total: result._sum.price,
        },
        success: true,
      };
    } catch {
      throw new SubscriptionNotFoundError();
    }
  }
}
