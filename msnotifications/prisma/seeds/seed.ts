import { PrismaClient } from '@prisma/client';
import { seedAccountTemplates } from './account.seed';
import { seedEventTemplates } from './event.seed';
import { seedPaymentTemplates } from './payment.seed';


const prisma = new PrismaClient();

async function main() {
  console.log('Iniciando seeds...');

  console.log('Limpando dados antigos...');
  await prisma.notificationLog.deleteMany();
  await prisma.userPreference.deleteMany();
  await prisma.notificationTemplate.deleteMany();
  console.log('Dados antigos removidos');

  await seedAccountTemplates(prisma);
  await seedEventTemplates(prisma);
  await seedPaymentTemplates(prisma);

  const exampleUserId = '123e4567-e89b-12d3-a456-426614174000';
  await prisma.userPreference.create({
    data: {
      user_id: exampleUserId,
      notification_type: 'MARKETING',
      channel: 'EMAIL',
      is_enabled: true,
    },
  });

  console.log('Seeds concluídas com sucesso!');
}

main()
  .catch((e) => {
    console.error('Erro ao executar seeds:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });