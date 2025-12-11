import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Iniciando seeds do msevents...')

  console.log('Limpando eventos e endereços antigos...')
  await prisma.tb_event.deleteMany()
  await prisma.tb_address.deleteMany()

  console.log('Criando 10 eventos gratuitos...')

  const eventsData: Prisma.tb_eventCreateInput[] = [] 

  for (let i = 1; i <= 10; i++) {
    const startDate = new Date()
    startDate.setDate(startDate.getDate() + i)

    const endDate = new Date(startDate)
    endDate.setHours(endDate.getHours() + 2)

    eventsData.push({
      title: `Evento Gratuito ${i}`,
      description: `Descrição do evento gratuito número ${i}`,
      start_at: startDate,
      end_at: endDate,
      sale_start_at: null,
      sale_end_at: null,
      price: null,
      isFree: true,
      capacity: 100 + i * 10,
      status: 'DRAFT',
      event_type: 'MEETING',
      address: {
        create: {
          street: `Rua Exemplo ${i}`,
          number: `${100 + i}`,
          city: 'São Paulo',
          state: 'SP',
          zipcode: `0100${i}-000`,
          country: 'Brasil',
        },
      },
    })
  }

  for (const event of eventsData) {
    await prisma.tb_event.create({ data: event })
  }

  console.log('10 eventos gratuitos criados!')
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
