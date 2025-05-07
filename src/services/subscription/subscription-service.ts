import { ServiceResponse } from "@/types";
import { z } from "zod";
import { prisma } from "../../configs/prisma";
import { randomUUID } from "crypto";
import { GetByUserIdResponse, UpdateSubscriptionParams, UpdateSubscriptionResponse } from "./types";
import { SubscriptionNotFoundError } from "@/errors";
import { CreateSubscription } from "./types";

export default class SubscriptionService {
  async createSubscription(
    subscription: CreateSubscription
  ): Promise<ServiceResponse<string>> {
    const createSubscriptionSchema = z.object({
      id: z.string().uuid(),
      user_id: z.string().uuid(),
      name: z.string(),
      price: z.number(),
      billing_cycle: z.enum(["monthly", "yearly"]),
      next_renewal_date: z.date(),
      auto_detected: z.boolean(),
    });

    const { error, data } = createSubscriptionSchema.safeParse({
      ...subscription,
      next_renewal_date: new Date(subscription.next_renewal_date),
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
      data: "",
      success: true,
    };
  }
  async GetByUserId(user_id: string): Promise<ServiceResponse<GetByUserIdResponse[]>> {
    try {
      const subscriptions = await prisma.subscription.findMany({
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
  async updateSubscription(
    id: string,
    subscription: UpdateSubscriptionParams
  ): Promise<ServiceResponse<UpdateSubscriptionResponse>> {

    const updateSubscriptionSchema = z.object({
      name: z.string().optional(),
      price: z.number().optional(),
      billing_cycle: z.enum(["monthly", "yearly"]).optional(),
      next_renewal_date: z.date().optional(),
      auto_detected: z.boolean().optional(),
    });

    const { error, data } = updateSubscriptionSchema.safeParse({
      ...subscription,
      next_renewal_date: subscription.next_renewal_date ? new Date(subscription.next_renewal_date) : undefined,
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

    const {error, data} = idSchema.safeParse(id);

    if(error) {
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
    }

  }
}
