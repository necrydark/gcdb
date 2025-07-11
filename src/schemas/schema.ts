import {
  Attribute,
  Beast,
  CrossoverType,
  Game,
  GameEvent,
  Gender,
  ProfileColour,
  Race,
  Rarity,
  StatLevel,
  UserRole,
} from "@prisma/client";
import { z } from "zod";
import { foodSchema, giftSchema } from "./admin/schema";
import { friendshipRewardSchema } from "./character/friendship-reward-schema";

export const adminSchema = z.object({
  name: z.optional(z.string()),
  username: z.optional(z.string()),
  email: z.optional(z.string().email()),
  role: z.optional(z.enum([UserRole.ADMIN, UserRole.USER, UserRole.COOWNER, UserRole.OWNER])),
  isTwoFactorEnabled: z.optional(z.boolean()),
  image: z.optional(z.string()),
  banner: z.optional(z.string()),
  bio: z.optional(
    z
      .string()
      .min(10, "Bio must be at least 10 characters long")
      .max(255, "Bio must be at most 255 characters")
  ),
});

export const commentSchema = z.object({
  characterId: z.string(),
  comment: z
    .string()
    .min(10, "Comment must be more than 10 characters")
    .max(300, "Comment must be at most 300 characters"),
});

export const addNewUserSchema = z.object({
  name: z.string(),
  username: z.string(),
  email: z.string().email(),
  password: z.string().min(6, "Password must be at least 6 characters"),
  role: z.enum([UserRole.USER, UserRole.ADMIN, UserRole.OWNER,]),
  twoFactorEnabled: z.boolean().default(false),
  emailVerified: z.boolean().default(false),
  image: z.optional(z.string()),
  bio: z
    .string()
    .min(10, "Bio must be at least 10 characters long")
    .max(255, "Bio must be at most 255 characters"),
  profileColour: z.enum([
    ProfileColour.RED,
    ProfileColour.BLUE,
    ProfileColour.GREEN,
    ProfileColour.YELLOW,
    ProfileColour.PURPLE,
    ProfileColour.ORANGE,
    ProfileColour.PINK,
    ProfileColour.CYAN,
  ]),
});

export const settingsSchema = z
  .object({
    name: z.optional(z.string()),
    isTwoFactorEnabled: z.optional(z.boolean()),
    username: z.optional(z.string()),
    email: z.optional(z.string().email()),
    password: z.optional(z.string().min(6)),
    newPassword: z.optional(z.string().min(6)),
    image: z.optional(z.string()),
    bio: z
      .string()
      .min(10, "Bio must be at least 10 characters long")
      .max(255, "Bio must be at most 255 characters"),
    boxCC: z.optional(z.string()),
    ingameRank: z.optional(z.string()),
    profileColour: z.enum([
      ProfileColour.RED,
      ProfileColour.BLUE,
      ProfileColour.GREEN,
      ProfileColour.YELLOW,
      ProfileColour.PURPLE,
      ProfileColour.ORANGE,
      ProfileColour.PINK,
      ProfileColour.CYAN,
    ]),
  })
  .refine(
    (data) => {
      if (data.password && !data.newPassword) {
        return false;
      }
      if (data.newPassword && !data.password) {
        return false;
      }
      return true;
    },
    {
      message: "New Password is required",
      path: ["newPassword"],
    }
  );

export const formSchema = z
  .object({
    email: z
      .string()
      .email()
      .min(5, {
        message: "Email must be at least 5 characters long",
      })
      .max(50),
    subject: z
      .string()
      .min(5, {
        message: "Subject must be at least 5 characters long",
      })
      .max(100),
    message: z
      .string()
      .min(5, {
        message: "Message must be at least 5 characters long",
      })
      .max(400),
  })
  .required();

export const signInSchema = z.object({
  email: z.string().email().min(1, "Email is required"),
  password: z.string().min(1, "Password is required"),
  code: z.optional(z.string()),
});

export const resetSchema = z.object({
  email: z.string().email().min(1, "Email is required"),
});

export const newPasswordSchema = z.object({
  password: z
    .string()
    .min(6, "Minimum of 6 characters is required")
    .max(30, "Maximum of 30 characters is allowed"),
});

export const registerSchema = z
  .object({
    username: z.string().min(6, "Username is required"),
    displayUsername: z.string().min(6, "Username is required"),
    password: z.string().min(6, "Minimum of 6 characters is required"),
    name: z.string().min(1, "First name is required"),
    email: z.string().email().min(1, "Email is required"),
    confirm_password: z.string().min(6, "Minimum of 6 characters is required"),
    boxCC: z.optional(z.string()),
    ingameRank: z.optional(z.string()),
    bio: z
      .string()
      .min(10, "Bio must be at least 10 characters long")
      .max(255, "Bio must be at most 255 characters"),
    
  })
  .refine((data) => data.password === data.confirm_password, {
    path: ["confirm_password"],
    message: "Passwords do not match!",
  });

export const addFriendSchema = z.object({
  username: z.string().min(1, "Username is required"),
});

export const skillRankSchema = z.object({
  rank: z.coerce.number().min(1).max(3),
  description: z.string().min(1, "Skill Rank Description is required"),
  type: z.string().min(1, "Skill Rank Type is required"),
});

export const skillSchema = z.object({
  name: z.string().min(1, "Skill Name is required"),
  jpName: z.string().min(1, "Skill Japanese Name is required"),
  imageUrl: z.string().min(1, "Image URL is required"),
  skillRanks: z
    .array(skillRankSchema)
    .length(3, "Exactly three skill ranks are required"),
});

export const characterUltimateSchema = z.object({
    ultimateId: z.string().min(1, "Ultimate ID is required").optional(),
    characterId: z.optional(z.string()),
    name: z.string().min(1, "Ultimate Name is required"),
    jpName: z.string().min(1, "Ultimate Japanese Name is required"),
    imageUrl: z
      .string()
      .url("Invalid URL")
      .min(1, "Ultimate Image URL is required"),
    description: z.string().min(1, "Ultimate Description is required"),
    extraInfo: z.optional((z.string())), 
})

export const characterUnitySchema = z.object({
  unityId: z.string().min(1, "Unity ID is required").optional(),
  name: z.string().min(1, "Unity Name is required").optional(),
  jpName: z.string().min(1, "Unity Japanese Name is required").optional(),
  imageUrl: z
    .string()
    .url("Invalid URL")
    .min(1, "Unity Image URL is required").optional(),
  description: z.string().min(1, "Unity Description is required").optional(),

})




export const statsSchema = z.object({
  level: z.enum([StatLevel.LEVEL_1, StatLevel.LEVEL_100, StatLevel.TRUE_AWAKENING]).default("LEVEL_1").describe("Stat Level is reuiqred."),
  combatClass: z.number().int().nonnegative("Combat Class must be a non-negative integer").min(0, "Combat Class is required"),
  attack: z.number().int().nonnegative("Attack must be a non-negative integer").min(0, "Attack is required"),
  defense: z.number().int().nonnegative("Defense must be a non-negative integer").min(0, "Defense is required"),
  hp: z.number().int().nonnegative("HP must be a non-negative integer").min(0, "HP is required"),
  pierceRate: z.number().int().nonnegative("Pierce Rate must be a non-negative integer").min(0, "Pierce Rate is required"),
  resistance: z.number().int().nonnegative().min(0, "Resistance is required"),
  regeneration: z.number().int().nonnegative().min(0, "Regeneration is required"),
  critChance: z.number().int().nonnegative().min(0, "Crit Chance is required"),
  critDamage: z.number().int().nonnegative().min(0, "Crit Damage is required"),
  critResistance: z.number().int().nonnegative().min(0, "Crit Resistance is required"),
  critDefense: z.number().int().nonnegative().min(0, "Crit Defense is required"),
  recoveryRate: z.number().int().nonnegative().min(0, "Recovery Rate is required"),
  lifesteal: z.number().int().nonnegative().min(0, "Lifesteal is required"),
})

// Add Character
export const addCharacterSchema = z.object({
  id: z.optional(z.string().min(1, "ID is required")),
  name: z.string().min(1, "Name is required"),
  tag: z.string().min(1, "Tag is required"),
  jpName: z.string().min(1, "Japanese Name is required"),
  jpTag: z.string().min(1, "Japanese Tag is required"),
  slug: z.optional(z.string().min(1, "Slug is required")),
  imageUrl: z.string().min(1, "Image URL is required"),
  releaseDate: z.coerce.date().describe("Release Date is required."),
  game: z.enum([
    Game.AOT,
    Game.Base,
    Game.KOF,
    Game.Mave,
    Game.Mushoku,
    Game.Overlord,
    Game.ReZero,
    Game.ShieldHero,
    Game.StrangerThings,
    Game.TOG,
    Game.Tensura,
  ]).default("Base").describe("Game is required."),
  crossover: z.enum([CrossoverType.Crossover, CrossoverType.NotCrossover]),
  race: z.enum([
    Race.Demon,
    Race.Fairy,
    Race.Giant,
    Race.Goddess,
    Race.Human,
    Race.Unknown,
  ]),
  attribute: z.enum([
    Attribute.Dark,
    Attribute.HP,
    Attribute.Light,
    Attribute.Speed,
    Attribute.Strength,
  ]),
  rarity: z.enum([Rarity.LR, Rarity.R, Rarity.SR, Rarity.UR, Rarity.SSR]),
  gender: z.optional(z.enum([Gender.Male, Gender.Female, Gender.Unknown])),
  bloodType: z.optional(z.string()),
  age: z.optional(z.string()),
  birthday: z.optional(z.coerce.string()),
  height: z.optional(z.string()),
  weight: z.optional(z.string()),
  location: z.string().min(1, "Location is required"),
  CV: z.optional(z.string()),
  gifts: z.optional(
    giftSchema
  ),
  stats: z.array(statsSchema).min(1, "A character must have atleast one stat").max(3, "A character cannot have more than 3 stat choices.")
  .refine(stats => {
    const levels = stats.map(stat => stat.level);
    const uniqueLevels = new Set(levels);
    return levels.length === uniqueLevels.size
  }, {
    message: "Each stat must have a unique level",
    path: ['stats']
  }),
  food: z.optional(
    z.array(
      z.object({
        name: z.string().min(1, "Food name is required"),
        imageUrl: z.string(),
        effect: z.string(),
        mealId: z.number().min(1, "Meal ID is required"),
        characterId: z.string(),
      })
    )
  ),
  passiveName: z.string().default("").refine(val => val.length > 0, {
    message: "Passive Name is required",
  }),
  passiveImageUrl: z.string().default("").refine(val => val.length > 0, {
    message: "Passive Image URL is required",
  }),
  passiveJpName: z.string().default("").refine(val => val.length > 0, {
    message: "Passive Japanese Name is required",
  }),
  passiveDescription: z.string().default("").refine(val => val.length > 0, {
    message: "Passive Description is required",
  }),
  passiveCCNeeded: z.optional(z.string()),
  skills: z.array(skillSchema).min(2, "At least one skill is required"),
  associations: z.optional(
    z.array(
      z.object({
        name: z.string(),
        imageUrl: z.string(),
        slug: z.string(),
        bonus: z.string(),
        tag: z.string(),
        characterId: z.string(),
      })
    )
  ),
  associationsWith: z.optional(
    z.array(
      z.object({
        name: z.string(),
        imageUrl: z.string(),
        slug: z.string(),
        bonus: z.string().optional(),
        tag: z.string(),
        characterId: z.string(),
      })
    )
  ),
  holyRelicId: z.optional(z.string()),
  event: z.enum([
    GameEvent.Christmas,
    GameEvent.Summer,
    GameEvent.Valentine,
    GameEvent.None,
  ]),
  characterUltimate: characterUltimateSchema,
  characterUnity: characterUnitySchema,
  characterFriendshipRewards: z.array(friendshipRewardSchema)
  .length(5, "A character must have exactly 5 friendship rewards defined")
  .refine(rewards => {
    const providedLevelIds = new Set(rewards.map(reward => reward.friendShipLevelId))
    return providedLevelIds.size === rewards.length;
  }, {
    message: "Each friendship level must have a unique reward definition",
    path: ["characterFriendshipRewards"]
  })
});

export const addFoodSchema = z.object({
  id: z.string().min(1, "ID is required"),
  effect: z.optional(z.string()),
  characters: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      imageUrl: z.string(),
    })
  ),
  mealId: z.string().min(1, "Meal ID is required"),
  ingredients: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      quantity: z.number().min(1, "Quantity is required"),
    })
  ),
  characterId: z.optional(z.string()),
});

export const relicCharacterSchema = z.object({
  id: z.string(),
  name: z.string().optional(),
  imageUrl: z.string(),
  tag: z.string(),
})

export const MaterialSchema = z.object({
  id: z.string(),
  name: z.string(),
  imageUrl: z.string().optional(),
  location: z.string().optional(),
});

export const RelicEnhanceMaterialsSchema = z.object({
  id: z.string(),
  name: z.string(),
  imageUrl: z.string().optional(),
  location: z.string().optional(),
});

export const addHolyRelic = z.object({
  name: z.string().min(1, "Relic Name is required"),
  imageUrl: z.string().min(1, "Image URL is required"),
  effect: z.string().min(1, "Relic Effect is required"),
  attack: z.string().min(1, "Attack is required"),
  defense: z.string().min(1, "Defense is required"),
  hp: z.string().min(1, "HP is required"),
  releaseDate: z.coerce.date(),
  beast: z.enum([
    Beast.Hraesvelgr,
    Beast.Eikthyrnir,
    Beast.SkollAndHati,
    Beast.Nidhoggr,
    Beast.Ratatoskr,
    Beast.Collab,
  ]),
  materials: z.array(
    MaterialSchema
  ),
  enhancable: z.boolean().default(false),
  enhanceMaterials: z.optional(z.array(RelicEnhanceMaterialsSchema)),
  enhanceAttack: z.string().optional(),
  enhanceDefense: z.string().optional(),
  enhanceHp: z.string().optional(),
  characters: z.array(
    relicCharacterSchema
  ),
});

export const addRelicMaterials = z.object({
  name: z.optional(z.string()),
  imageUrl: z.optional(z.string()),
  location: z.optional(z.string()),
});

export const addRelicEnhanceMaterials = z.object({
  name: z.optional(z.string()),
  imageUrl: z.optional(z.string()),
  location: z.optional(z.string()),
});



export const editHolyRelic = z.object({
  name: z.string().min(1, "Relic Name is required"),
  imageUrl: z.string().min(1, "Image URL is required"),
  effect: z.string().min(1, "Relic Effect is required"),
  attack: z.string().min(1, "Attack is required"),
  defense: z.string().min(1, "Defense is required"),
  hp: z.string().min(1, "HP is required"),
  beast: z.enum([
    Beast.Hraesvelgr,
    Beast.Eikthyrnir,
    Beast.SkollAndHati,
    Beast.Nidhoggr,
    Beast.Ratatoskr,
    Beast.Collab,
  ]),
  materials: z.array(MaterialSchema).default([]).optional(),
  characters: z.array(
   relicCharacterSchema
  ).default([]).optional(),
  releaseDate: z.coerce.date(),

});


// role: z.optional(z.enum([UserRole.ADMIN, UserRole.USER])),

const editSkillRankSchema = z.object({
  id: z.optional(z.string().min(1, "ID is required")),
  rank: z.coerce.number().min(1).max(3),
  description: z.string().min(1, "Skill Rank Description is required"),
  type: z.string().min(1, "Skill Rank Type is required"),
});

const editSkillSchema = z.object({
  id: z.optional(z.string().min(1, "ID is required")),
  name: z.string().min(1, "Skill Name is required"),
  jpName: z.string().min(1, "Skill Japanese Name is required"),
  imageUrl: z.string().min(1, "Image URL is required"),
  skillRanks: z
    .array(editSkillRankSchema)
    .length(3, "Exactly three skill ranks are required"),
});

// Add Character
export const editCharacterSchema = z.object({
  id: z.optional(z.string().min(1, "ID is required")),
  name: z.string().min(1, "Name is required"),
  tag: z.string().min(1, "Tag is required"),
  jpName: z.string().min(1, "Japanese Name is required"),
  jpTag: z.string().min(1, "Japanese Tag is required"),
  slug: z.optional(z.string().min(1, "Slug is required")),
  imageUrl: z.string().min(1, "Image URL is required"),
  releaseDate: z.coerce.date(),
  game: z.enum([
    Game.AOT,
    Game.Base,
    Game.KOF,
    Game.Mave,
    Game.Mushoku,
    Game.Overlord,
    Game.ReZero,
    Game.ShieldHero,
    Game.StrangerThings,
    Game.TOG,
    Game.Tensura,
  ]),
  crossover: z.enum([CrossoverType.Crossover, CrossoverType.NotCrossover]),
  races: z
  .array(z.nativeEnum(Race))
  .default([Race.Human]) // Default to an array with Human
  .describe("An array of races for the character"),
  attribute: z.enum([
    Attribute.Dark,
    Attribute.HP,
    Attribute.Light,
    Attribute.Speed,
    Attribute.Strength,
  ]),
  rarity: z.enum([Rarity.LR, Rarity.R, Rarity.SR, Rarity.UR, Rarity.SSR]),
  stats: z.array(statsSchema).min(1, "A character must have atleast one stat").max(3, "A character cannot have more than 3 stats.")
  .refine(stats => {
    const levels = stats.map(stat => stat.level);
    const uniqueLevels = new Set(levels);
    return levels.length === uniqueLevels.size
  }, {
    message: "Each stat must have a unique level",
    path: ['stats']
  }),
  gender: z.optional(z.enum([Gender.Male, Gender.Female, Gender.Unknown])),
  bloodType: z.optional(z.string()),
  age: z.optional(z.string()),
  birthday: z.optional(z.coerce.string()),
  height: z.optional(z.string()),
  weight: z.optional(z.string()),
  location: z.string().min(1, "Location is required"),
  CV: z.optional(z.string()),
  gifts: z.optional(
    giftSchema
  ),
  food: z.optional(
    z.array(
      foodSchema
    )
  ),
  passiveName: z.string().min(1, "Passive Name is required"),
  passiveImageUrl: z.string().min(1, "Passive Image URL is required"),
  passiveJpName: z.string().min(1, "Passive Japanese Name is required"),
  passiveDescription: z.string().min(1, "Passive Description is required"),
  passiveCCNeeded: z.optional(z.string()),
  skills: z.array(editSkillSchema).min(1, "At least one skill is required"),
  characterUltimate: characterUltimateSchema,
  characterUnity: characterUnitySchema,
  associations: z.optional(
    z.array(
      z.object({
        name: z.string(),
        imageUrl: z.string(),
        slug: z.string(),
        bonus: z.string(),
        tag: z.string(),
        characterId: z.string(),
      })
    )
  ),
  associationsWith: z.optional(
    z.array(
      z.object({
        name: z.string(),
        imageUrl: z.string(),
        slug: z.string(),
        bonus: z.string(),
        tag: z.string(),
        characterId: z.string(),
      })
    )
  ),
  holyRelicId: z.optional(z.string()),
  event: z.enum([
    GameEvent.Christmas,
    GameEvent.Summer,
    GameEvent.Valentine,
    GameEvent.None,
  ]),
});

