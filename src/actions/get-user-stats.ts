// app/actions/user-stats.ts
'use server'


import { auth } from '../auth'
import db from '../lib/db'

export async function getUserGrowthStats() {
  // Verify authentication (optional - you can also do this in the component)
  const user = await auth()
  
  if(!user) {
    throw new Error("Unauthorized")
  }

  if(user.user.role === "USER") {
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