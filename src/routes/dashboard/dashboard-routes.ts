import { DashboardController } from "@/controllers";
import { FastifyInstance } from "fastify";

const dashboardController = new DashboardController();

export default async function DashboardRoutes(server: FastifyInstance) {
  server.get(
    "/dashboard-infos/:user_id",
    dashboardController.getDashboardInfos,
  );
}
