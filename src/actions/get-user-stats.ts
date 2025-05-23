'use server'


import db from '../lib/db'
import { currentUser } from '../utils/auth'

export async function getUserGrowthStats() {
  const user = await currentUser()
  
  if(!user) {
    throw new Error("Unauthorized")
  }

  if(user.role === "USER") {
    throw new Error("You don't have the right role.")

  }

  const today = new Date()
  const currentMonthStart = new Date(today.getFullYear(), today.getMonth(), 1)
  const previousMonthStart = new Date(today.getFullYear(), today.getMonth() - 1, 1)

  const currentMonthUsers = await db.user.count({
    where: {
      createdAt: {
        gte: currentMonthStart,
      },
    },
  })

  const previousMonthUsers = await db.user.count({
    where: {
      createdAt: {
        gte: previousMonthStart,
        lt: currentMonthStart,
      },
    },
  })

  const percentageChange = previousMonthUsers === 0
    ? 0
    : Number((((currentMonthUsers - previousMonthUsers) / previousMonthUsers) * 100).toFixed(2))

  return {
    currentMonthUsers,
    previousMonthUsers,
    percentageChange
  }
}