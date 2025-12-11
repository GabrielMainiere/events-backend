import { PrismaClient } from '@prisma/client'
import { hash } from 'bcrypt'

const prisma = new PrismaClient()

async function main() {
  console.log('Iniciando seeds...')

  console.log('Limpando dados antigos...')
  const count = await prisma.role.count()
  const doesUserExist = await prisma.user.findUnique({
    where: { id: '5a0c3307-4966-42c1-a206-096c6221f770' },
  })
  if (doesUserExist)
    await prisma.user.delete({ where: { id: '5a0c3307-4966-42c1-a206-096c6221f770' } })
  if (count > 0) await prisma.role.deleteMany()
  console.log('Dados antigos removidos')

  await prisma.role.create({
    data: {
      name: 'user',
      id: '85d31814-20e7-4fec-87b6-f40620135aa8',
    },
  })
  await prisma.role.create({
    data: {
      name: 'admin',
      id: 'dfe86557-f2e8-451a-9169-984df65ee65e',
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
          id: 'dfe86557-f2e8-451a-9169-984df65ee65e',
        },
      },
    },
  })

  console.log('Criando 100 usuários...')

  const hashedPassword = await hash('Events-backend1', 10)

  for (let i = 1; i <= 100; i++) {
    await prisma.user.create({
      data: {
        email: `user${i}@events.com`,
        name: `User ${i}`,
        password: hashedPassword,
        activationCode: `${10000 + i}`,
        cpf: `${10000000000 + i}`,
        birthDatetime: new Date('1995-01-01'),
        phoneNumber: `119999900${i.toString().padStart(2, '0')}`,
        isActive: true,
        roles: {
          connect: {
            id: '85d31814-20e7-4fec-87b6-f40620135aa8',
          },
        },
      },
    })
  }

  console.log('100 usuários criados!')
}


main()
  .catch(e => {
    console.error('Erro ao executar seeds:', e)
    process.exit(1)
  })
  .finally(async () => {
    console.log('Seeds finalizadas.')
    await prisma.$disconnect()
  })
