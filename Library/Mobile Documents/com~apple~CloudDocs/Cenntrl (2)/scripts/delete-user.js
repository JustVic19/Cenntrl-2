require('dotenv').config({ path: '.env' })

const { PrismaClient } = require('@prisma/client')
const { PrismaPg } = require('@prisma/adapter-pg')
const { Pool } = require('pg')

const pool = new Pool({ connectionString: process.env.DATABASE_URL })
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

async function checkAndDeleteUser(email) {
  try {
    // First, list all users
    const allUsers = await prisma.user.findMany()
    console.log('📋 All users in database:', allUsers)

    // Try to find the specific user
    const user = await prisma.user.findUnique({
      where: { email },
      include: { accounts: true, sessions: true }
    })

    if (user) {
      console.log('👤 Found user:', user)
      const result = await prisma.user.delete({
        where: { email }
      })
      console.log('✅ User deleted successfully:', result)
    } else {
      console.log('⚠️ User not found with email:', email)
    }
  } catch (error) {
    console.error('❌ Error:', error.message)
  } finally {
    await prisma.$disconnect()
    await pool.end()
  }
}

checkAndDeleteUser('vadeniyi1409@gmail.com')
