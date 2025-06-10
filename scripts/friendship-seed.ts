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