-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('ADMIN', 'USER', 'OWNER');

-- CreateEnum
CREATE TYPE "ProfileColour" AS ENUM ('RED', 'BLUE', 'GREEN', 'YELLOW', 'PURPLE', 'ORANGE', 'PINK', 'CYAN');

-- CreateEnum
CREATE TYPE "GameEvent" AS ENUM ('None', 'Valentine', 'Summer', 'Christmas');

-- CreateEnum
CREATE TYPE "Genders" AS ENUM ('Male', 'Female', 'Unknown');

-- CreateEnum
CREATE TYPE "StatLevel" AS ENUM ('LEVEL_1', 'LEVEL_100', 'SUPER_AWAKENING');

-- CreateEnum
CREATE TYPE "Game" AS ENUM ('Base', 'KOF', 'Tensura', 'AOT', 'StrangerThings', 'ReZero', 'ShieldHero', 'Mushoku', 'Mave', 'Overlord', 'TOG');

-- CreateEnum
CREATE TYPE "Attribute" AS ENUM ('Dark', 'HP', 'Light', 'Speed', 'Strength');

-- CreateEnum
CREATE TYPE "Crossovers" AS ENUM ('NotCrossover', 'Crossover');

-- CreateEnum
CREATE TYPE "Beast" AS ENUM ('Hraesvelgr', 'Eikthyrnir', 'SkollAndHati', 'Nidhoggr', 'Ratatoskr', 'Collab');

-- CreateEnum
CREATE TYPE "Race" AS ENUM ('Demon', 'Fairy', 'Giant', 'Goddess', 'Human', 'HumanGiant', 'Unknown');

-- CreateEnum
CREATE TYPE "Rarity" AS ENUM ('LR', 'R', 'SR', 'SSR', 'UR');

-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "emailVerified" BOOLEAN NOT NULL DEFAULT false,
    "image" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "twoFactorEnabled" BOOLEAN NOT NULL DEFAULT false,
    "username" TEXT,
    "bio" TEXT,
    "role" "UserRole" NOT NULL DEFAULT 'USER',
    "profileColour" "ProfileColour" NOT NULL DEFAULT 'PURPLE',
    "boxCC" TEXT,
    "ingameRank" TEXT,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "session" (
    "id" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "token" TEXT NOT NULL,
    "ipAddress" TEXT,
    "userAgent" TEXT,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "account" (
    "id" TEXT NOT NULL,
    "accountId" TEXT NOT NULL,
    "providerId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "accessToken" TEXT,
    "refreshToken" TEXT,
    "idToken" TEXT,
    "expiresAt" TIMESTAMP(3),
    "password" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "accessTokenExpiresAt" TIMESTAMP(3),
    "refreshTokenExpiresAt" TIMESTAMP(3),
    "scope" TEXT,

    CONSTRAINT "account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "verification" (
    "id" TEXT NOT NULL,
    "identifier" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "verification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Character" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "tag" TEXT,
    "jpName" TEXT NOT NULL,
    "jpTag" TEXT NOT NULL,
    "slug" TEXT,
    "game" "Game" NOT NULL DEFAULT 'Base',
    "imageUrl" TEXT NOT NULL,
    "Crossover" "Crossovers" NOT NULL DEFAULT 'NotCrossover',
    "race" "Race" NOT NULL DEFAULT 'Human',
    "attribute" "Attribute" NOT NULL DEFAULT 'HP',
    "rarity" "Rarity" NOT NULL DEFAULT 'SSR',
    "event" "GameEvent" NOT NULL DEFAULT 'None',
    "gender" "Genders" NOT NULL DEFAULT 'Male',
    "bloodType" TEXT,
    "age" TEXT,
    "birthday" TEXT,
    "height" TEXT,
    "weight" TEXT,
    "location" TEXT NOT NULL,
    "CV" TEXT,
    "passiveName" TEXT NOT NULL,
    "passiveImageUrl" TEXT NOT NULL,
    "passiveJpName" TEXT NOT NULL,
    "passiveDescription" TEXT NOT NULL,
    "passiveCCNeeded" TEXT,
    "releaseDate" TIMESTAMP(3) NOT NULL,
    "holyRelicId" TEXT,

    CONSTRAINT "Character_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Stats" (
    "id" TEXT NOT NULL,
    "level" "StatLevel" NOT NULL,
    "combatClass" INTEGER NOT NULL,
    "attack" INTEGER NOT NULL,
    "defense" INTEGER NOT NULL,
    "hp" INTEGER NOT NULL,
    "pierceRate" DECIMAL(5,2) NOT NULL,
    "resistance" DECIMAL(5,2) NOT NULL,
    "regeneration" DECIMAL(5,2) NOT NULL,
    "critChance" DECIMAL(5,2) NOT NULL,
    "critDamage" DECIMAL(5,2) NOT NULL,
    "critResistance" DECIMAL(5,2) NOT NULL,
    "critDefense" DECIMAL(5,2) NOT NULL,
    "recoveryRate" DECIMAL(5,2) NOT NULL,
    "lifesteal" DECIMAL(5,2) NOT NULL,
    "characterId" TEXT,

    CONSTRAINT "Stats_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AssociationWith" (
    "id" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "tag" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "bonus" TEXT NOT NULL,
    "characterId" TEXT,

    CONSTRAINT "AssociationWith_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Association" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "tag" TEXT NOT NULL,
    "bonus" TEXT NOT NULL,
    "characterId" TEXT NOT NULL,

    CONSTRAINT "Association_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ingredient" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "location" TEXT[],
    "foodId" TEXT NOT NULL,

    CONSTRAINT "Ingredient_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Meal" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "foodId" TEXT NOT NULL,

    CONSTRAINT "Meal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Food" (
    "id" TEXT NOT NULL,
    "effect" TEXT,
    "mealId" TEXT NOT NULL,
    "characterId" TEXT,

    CONSTRAINT "Food_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Gift" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "characterId" TEXT,

    CONSTRAINT "Gift_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Material" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "location" TEXT,

    CONSTRAINT "Material_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HolyRelic" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "effect" TEXT NOT NULL,
    "attack" TEXT NOT NULL,
    "defense" TEXT NOT NULL,
    "hp" TEXT NOT NULL,
    "beast" "Beast" NOT NULL DEFAULT 'Hraesvelgr',

    CONSTRAINT "HolyRelic_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CharacterUltimate" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "jpName" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "extraInfo" TEXT[],
    "characterId" TEXT,

    CONSTRAINT "CharacterUltimate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Skill" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "jpName" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "characterId" TEXT NOT NULL,

    CONSTRAINT "Skill_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SkillRank" (
    "id" TEXT NOT NULL,
    "rank" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "skillId" TEXT NOT NULL,

    CONSTRAINT "SkillRank_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Gear" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "gearType" TEXT NOT NULL,
    "gearEffect" TEXT NOT NULL,

    CONSTRAINT "Gear_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Favourite" (
    "id" TEXT NOT NULL,
    "characterId" TEXT,
    "userId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Favourite_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "comments" (
    "id" TEXT NOT NULL,
    "comment" TEXT NOT NULL,
    "characterId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "comments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_HolyRelicMaterials" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "user_username_key" ON "user"("username");

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "session_token_key" ON "session"("token");

-- CreateIndex
CREATE UNIQUE INDEX "Character_tag_key" ON "Character"("tag");

-- CreateIndex
CREATE UNIQUE INDEX "Character_slug_key" ON "Character"("slug");

-- CreateIndex
CREATE INDEX "Character_name_idx" ON "Character"("name");

-- CreateIndex
CREATE INDEX "Character_jpName_idx" ON "Character"("jpName");

-- CreateIndex
CREATE INDEX "Character_game_idx" ON "Character"("game");

-- CreateIndex
CREATE INDEX "Character_rarity_idx" ON "Character"("rarity");

-- CreateIndex
CREATE UNIQUE INDEX "Food_mealId_key" ON "Food"("mealId");

-- CreateIndex
CREATE UNIQUE INDEX "_HolyRelicMaterials_AB_unique" ON "_HolyRelicMaterials"("A", "B");

-- CreateIndex
CREATE INDEX "_HolyRelicMaterials_B_index" ON "_HolyRelicMaterials"("B");

-- AddForeignKey
ALTER TABLE "session" ADD CONSTRAINT "session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "account" ADD CONSTRAINT "account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Character" ADD CONSTRAINT "Character_holyRelicId_fkey" FOREIGN KEY ("holyRelicId") REFERENCES "HolyRelic"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Stats" ADD CONSTRAINT "Stats_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "Character"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AssociationWith" ADD CONSTRAINT "AssociationWith_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "Character"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Association" ADD CONSTRAINT "Association_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "Character"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ingredient" ADD CONSTRAINT "Ingredient_foodId_fkey" FOREIGN KEY ("foodId") REFERENCES "Food"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Food" ADD CONSTRAINT "Food_mealId_fkey" FOREIGN KEY ("mealId") REFERENCES "Meal"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Food" ADD CONSTRAINT "Food_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "Character"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Gift" ADD CONSTRAINT "Gift_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "Character"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CharacterUltimate" ADD CONSTRAINT "CharacterUltimate_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "Character"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Skill" ADD CONSTRAINT "Skill_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "Character"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SkillRank" ADD CONSTRAINT "SkillRank_skillId_fkey" FOREIGN KEY ("skillId") REFERENCES "Skill"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Favourite" ADD CONSTRAINT "Favourite_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "Character"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Favourite" ADD CONSTRAINT "Favourite_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "Character"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_HolyRelicMaterials" ADD CONSTRAINT "_HolyRelicMaterials_A_fkey" FOREIGN KEY ("A") REFERENCES "HolyRelic"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_HolyRelicMaterials" ADD CONSTRAINT "_HolyRelicMaterials_B_fkey" FOREIGN KEY ("B") REFERENCES "Material"("id") ON DELETE CASCADE ON UPDATE CASCADE;
