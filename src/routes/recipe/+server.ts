import { json } from "@sveltejs/kit";
import * as fs from "fs/promises";
import * as path from "path";

const RECIPES_PATH = path.resolve("./recipes");

async function readDirctory() {
  return await fs.readdir(RECIPES_PATH);
}

export async function GET({ url }) {
  const allRecipes = await readDirctory().then((files) =>
    files.filter((file) => file.includes(".cook")).map((file) => file.replace(".cook", ""))
  );
  return json(allRecipes);
}
