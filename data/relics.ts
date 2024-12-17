import db from "@/src/lib/db";

export const getMaterialByName = async (name: string) => {
  try {
    const material = await db.materials.findFirst({ where: { name } });
    return material;
  } catch {
    return null;
  }
};

export const getMaterialById = async (id: string) => {
  try {
    const material = await db.materials.findFirst({ where: { id } });
    return material;
  } catch {
    return null;
  }
};

export const getRelicByName = (name: string) => {
  try {
    const relic = db.holyRelic.findFirst({ where: { name } });
    return relic;
  } catch {
    return null;
  }
};

export const getRelicCount = async () => {
  try {
    const count = await db.holyRelic.count();
    return count;
  } catch {
    return null;
  }
}

export const getMaterialCount = async () => {
  try {
    const count = await db.materials.count();
    return count;
  } catch {
    return null;
  }
}