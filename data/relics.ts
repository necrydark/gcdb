import db from "@/src/lib/db";

export const getMaterialByName = async (name: string) => {
  try {
    const material = await db.material.findFirst({ where: { name } });
    return material;
  } catch {
    return null;
  }
};

export const getMaterialById = async (id: string) => {
  try {
    const material = await db.material.findFirst({ where: { id } });
    return material;
  } catch {
    return null;
  }
};

export const getMaterials = async () => {
  try {
    const materials = await db.material.findMany();
    return materials;
  } catch {
    return null;
  }
}

export const getRelicByName = (name: string) => {
  try {
    const relic = db.holyRelic.findFirst({ where: { name } });
    return relic;
  } catch {
    return null;
  }
};

export const getRelicById = (id: string) => {
  try {
    const relic = db.holyRelic.findFirst({ where: {id}});
    return relic;
  } catch {
    return null;
  }
}

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
    const count = await db.material.count();
    return count;
  } catch {
    return null;
  }
}