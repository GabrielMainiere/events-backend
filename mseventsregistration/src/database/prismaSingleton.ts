import { PrismaClient } from "generated/prisma/client";

export class PrismaSingleton {
  private static instance: PrismaClient;

  private constructor() {}

  static getInstance(): PrismaClient {
    if (!PrismaSingleton.instance) {
      PrismaSingleton.instance = new PrismaClient();
    }
    return PrismaSingleton.instance;
  }
}