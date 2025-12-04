import { Provider } from '@nestjs/common';
import { PRISMA_CLIENT } from 'src/core/constants';
import { PrismaSingleton } from 'src/core/prismaSingleton';
export const prismaClient: Provider = {
  provide: PRISMA_CLIENT,
  useValue: PrismaSingleton.getInstance()
};
