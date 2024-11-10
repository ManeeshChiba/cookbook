import { json, error } from "@sveltejs/kit";
import * as fss from "fs";
import * as fs from "fs/promises";
import * as path from "path";
import * as Cook from "@cooklang/cooklang-ts";

const RECIPES_PATH = path.resolve("./recipes");

async function getFileContent(filename: string) {
  const location = path.resolve(RECIPES_PATH, `${filename}.cook`);
  if (fss.existsSync(location)) {
    return await fs.readFile(location, "utf-8");
  }
  return null;
}

export async function GET({ url }) {
  const recipeID = url.pathname.replace("/recipe/", "");
  console.log(recipeID);
  const fileContent = await getFileContent(recipeID);
  if (!fileContent) {
    error(404, {
      message: `${recipeID} not found`
    });
  }
  return json(new Cook.Parser().parse(fileContent));
}
