import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  const dylanUser = await prisma.user.upsert({
    where: { email: 'dylan@test.io' },
    update: {},
    create: {
      name: 'Dylan Dilla',
      email: 'dylan@test.io',
      image: '/dylan.png',
      userProfile: {
        create: {
          firstName: 'Dylan',
          lastName: 'Dilla',
          username: 'dsinetester',
          bio: 'What am I here for?',
          address: '123 Easy Street',
          city: "Nowhere",
          state: "Arizona",
          zipCode: "12345",
          phone: "6025555555"
        }
      }
    },
  })
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
