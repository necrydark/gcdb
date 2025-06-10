import db from "@/src/lib/db";
import { AchievementType, AchievementCategory } from "@prisma/client";


const achievements = [
    {
      name: "Registered",
      target: true,
      achievementType: AchievementType.REGISTERED,
      AchievementCategory: AchievementCategory.SOCIAL,
      imageUrl: "https://3duibobjm6.ufs.sh/f/BVooQWfmjDnKzyGSWA7pBthblDsidXP0oSj9Y5Lx4WRIT7EZ"
    },
    {
      name: "Email Verified",
      target: true,
      achievementType: AchievementType.EMAIL_VERIFIED,
      description: "Verified your email address",
      AchievementCategory: AchievementCategory.SOCIAL,
      imageUrl: "https://3duibobjm6.ufs.sh/f/BVooQWfmjDnKzyGSWA7pBthblDsidXP0oSj9Y5Lx4WRIT7EZ"
    },
    {
      name: "Security Expert",
      target: true,
      achievementType: AchievementType.TWO_FA_ADDED,
      description: "Added two factor authentication",
      AchievementCategory: AchievementCategory.SOCIAL,
      imageUrl: "https://3duibobjm6.ufs.sh/f/BVooQWfmjDnKzyGSWA7pBthblDsidXP0oSj9Y5Lx4WRIT7EZ"
    }, 
    {
      name: "Login",
      target: true,
      achievementType: AchievementType.LOGIN,
      description: "Logged in to the website",
      AchievementCategory: AchievementCategory.SOCIAL,
      imageUrl: "https://3duibobjm6.ufs.sh/f/BVooQWfmjDnKzyGSWA7pBthblDsidXP0oSj9Y5Lx4WRIT7EZ"
    },
   
  ]
  
  const seedAchievements = async () => {
    console.log("Seeding achievements...");
    try {
      const upsertPromises = achievements.map((achievement) => {
        // Return the promise from db.achievement.upsert
        return db.achievement.upsert({
          where: { name: achievement.name },
          update: {
            // You might want to update fields if the achievement already exists
            // For seeding, leaving this empty often works if you just want to ensure creation.
            // Or update values if they change over time:
            description: achievement.description || `Achievement for ${achievement.name}`,
            targetBool: achievement.target,
            type: achievement.achievementType,
            category: achievement.AchievementCategory, // Corrected typo
            imageUrl: achievement.imageUrl ?? "",
          },
          create: {
            name: achievement.name,
            description: achievement.description || `Achievement for ${achievement.name}`,
            targetBool: achievement.target,
            type: achievement.achievementType,
            category: achievement.AchievementCategory, // Corrected typo
            imageUrl: achievement.imageUrl ?? "",
          },
        });
      });
  
      // Await all promises to resolve
      await Promise.all(upsertPromises);
      console.log("Achievements seeded successfully!");
    } catch (error) {
      console.error("Error seeding achievements:", error);
    } finally {
      await db.$disconnect(); // Disconnect Prisma client if this is a standalone script
    }
  }

  seedAchievements();


// prisma/seed.ts (example)
import { PrismaClient, FriendshipRewardType } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.friendshipLevel.upsert({
    where: { level: 1 },
    update: {},
    create: {
      level: 1,
      requiredAffinity: 400,
      rewardType: FriendshipRewardType.HERO_ARTWORK,
    },
  });
  await prisma.friendshipLevel.upsert({
    where: { level: 2 },
    update: {},
    create: {
      level: 2,
      requiredAffinity: 1600,
      rewardType: FriendshipRewardType.VOICE_LINE,
    },
  });
  await prisma.friendshipLevel.upsert({
    where: { level: 3 },
    update: {},
    create: {
      level: 3,
      requiredAffinity: 4000,
      rewardType: FriendshipRewardType.DIAMOND,
    },
  });
  await prisma.friendshipLevel.upsert({
    where: { level: 4 },
    update: {},
    create: {
      level: 4,
      requiredAffinity: 10000,
      rewardType: FriendshipRewardType.HERO_MOTION,
    },
  });
  await prisma.friendshipLevel.upsert({
    where: { level: 5 },
    update: {},
    create: {
      level: 5,
      requiredAffinity: 20000,
      rewardType: FriendshipRewardType.HEAD_COSMETIC,
    },
  });

  console.log('Friendship levels seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });