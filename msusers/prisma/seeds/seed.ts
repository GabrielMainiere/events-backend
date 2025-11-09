import { PrismaClient } from "@prisma/client"
import { hash } from "bcrypt"


const prisma = new PrismaClient()

async function main() {
  console.log('Iniciando seeds...')

  console.log('Limpando dados antigos...')
  await prisma.role.deleteMany()
  await prisma.user.delete({ where: { id: '5a0c3307-4966-42c1-a206-096c6221f770' } })
  console.log('Dados antigos removidos')

  await prisma.role.create({
    data: {
      name: 'user',
      id: '85d31814-20e7-4fec-87b6-f40620135aa8'
    },
  })
  await prisma.role.create({
    data: {
      name: 'admin',
      id: 'dfe86557-f2e8-451a-9169-984df65ee65e'
    },
  })

  await prisma.user.create({
    data: {
      id: '5a0c3307-4966-42c1-a206-096c6221f770',
      email: 'adminevents@events.com',
      name: 'User Example',
      password: await hash('Events-backend1', 10),
      activationCode: '12345',
      cpf: '123456789',
      birthDatetime: new Date('1990-01-01'),
      phoneNumber: '1234567890',
      isActive: true,
      roles: {
        connect: {
          id: 'dfe86557-f2e8-451a-9169-984df65ee65e'
        }
      }
    }
  })
}

main()
  .catch((e) => {
    console.error('Erro ao executar seeds:', e);
    process.exit(1);
  })
  .finally(async () => {
    console.log('Seeds finalizadas.');
    await prisma.$disconnect();
  });