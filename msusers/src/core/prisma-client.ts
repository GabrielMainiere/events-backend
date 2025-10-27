import { PrismaClient } from 'generated/prisma/client'

export class PrismaClientSingleton {
  private static instance: PrismaClient
  private constructor() {}

  static getInstance(): PrismaClient {
    if (!PrismaClientSingleton.instance) {
      PrismaClientSingleton.instance = new PrismaClient()
    }
    return PrismaClientSingleton.instance
  }
}
