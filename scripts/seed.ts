import db from "@/src/lib/db";
import { AchievementType, AchievementCategory } from "@prisma/client";


const achievements = [
    {
      name: "Comment Rookie",
      target: 10,
      achievementType: AchievementType.COMMENT,
      AchievementCategory: AchievementCategory.SOCIAL
    },
    {
      name: "Comment Veteran",
      target: 50,
      achievementType: AchievementType.COMMENT,
      AchievementCategory: AchievementCategory.SOCIAL
    },
    {
      name: "Comment Pro",
      target: 100,
      achievementType: AchievementType.COMMENT,
      AchievementCategory: AchievementCategory.SOCIAL,
      imageUrl: "https://3duibobjm6.ufs.sh/f/BVooQWfmjDnKi71rLead7uWlGH2UVFLjY1fOXka8TrQJ9ECo"
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
            description: `Made ${achievement.target} or more comments`,
            targetValue: achievement.target,
            type: achievement.achievementType,
            category: achievement.AchievementCategory, // Corrected typo
            imageUrl: achievement.imageUrl ?? "",
          },
          create: {
            name: achievement.name,
            description: `Made ${achievement.target} or more comments`,
            targetValue: achievement.target,
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