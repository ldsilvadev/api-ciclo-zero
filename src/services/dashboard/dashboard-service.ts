import { DashboardInfosResponse } from "./types";
import { prisma } from "../../configs/prisma";
import { ServiceResponse } from "../../types";
import Dates from "./utils";

export default class DashboardService {
  async getDashboardInfos(
    user_id: string,
  ): Promise<ServiceResponse<DashboardInfosResponse>> {
    const { dayBefore, firstDay, lastDay, threeDaysLater } = Dates();

    const [
      totalSubscriptions,
      monthlyExpenses,
      upcomingExpenses,
      totalExpenses,
    ] = await Promise.all([
      prisma.subscription.count({
        where: {
          user_id,
        },
      }),

      prisma.subscription.aggregate({
        _sum: {
          price: true,
        },
        where: {
          user_id,
          due_date: {
            gte: firstDay,
            lte: lastDay,
          },
        },
      }),

      prisma.subscription.aggregate({
        _sum: {
          price: true,
        },
        where: {
          user_id,
          due_date: {
            gte: dayBefore,
            lte: threeDaysLater,
          },
        },
      }),

      prisma.subscriptionsHistory.aggregate({
        _sum: {
          price: true,
        },
        where: {
          user_id,
        },
      }),
    ]);

    return {
      data: {
        total_subscriptions: totalSubscriptions,
        monthly_expenses: monthlyExpenses._sum.price || 0,
        upcoming_expenses: upcomingExpenses._sum.price || 0,
        total_expenses: totalExpenses._sum.price || 0,
      },
      success: true,
    };
  }
}
