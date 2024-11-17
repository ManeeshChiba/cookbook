import { json } from "@sveltejs/kit";
import fse from "fs-extra";
import * as path from "path";
import * as Cook from "@cooklang/cooklang-ts";
import type { LookupObjectData } from "../../types/types";

const RECIPES_PATH = path.resolve("./recipes");

async function readDirctory() {
  return await fse.readdir(RECIPES_PATH);
}

async function getFileContent(filename: string) {
  const location = path.resolve(RECIPES_PATH, filename);
  if (fse.existsSync(location)) {
    return await fse.readFile(location, "utf-8");
  }
  return null;
}

const readReciepes = async () => {
  const paths = await readDirctory().then((files) =>
    files.filter((file) => file.includes(".cook"))
  );
  return await Promise.all(
    paths.map(async (filename) => {
      const content = await getFileContent(filename);
      const data: Cook.ParseResult = new Cook.Parser().parse(content ?? "");
      return { title: filename, data };
    })
  );
};

const processRecipes = (recipeArray: any): any => {
  const collectTimes = (steps: Cook.Step[]) => {
    return steps
      .flatMap((step) => step)
      .filter((step) => step.type == "timer")
      .map((step: Cook.Timer) => {
        switch (step.units) {
          case "min":
          case "minute":
          case "minutes":
            return parseInt(`${step.quantity}`);
          case "hrs":
          case "hour":
          case "hours":
            return parseInt(`${step.quantity}`) * 60;
          default:
            return parseInt(`${step.quantity}`);
        }
      })
      .reduce((partialSum, a) => partialSum + a, 0);
  };

  const response = recipeArray.reduce(
    (
      acc: { [x: string]: any },
      cur: {
        title: string;
        data: {
          metadata: { [x: string]: any };
          ingredients: any[];
          cookwares: any[];
          steps: Cook.Step[];
        };
      }
    ) => {
      const title = cur.title.replace(".cook", "").toLocaleLowerCase();

      const course = (cur.data.metadata?.["Course"] ?? "Other").toLowerCase();

      const data: LookupObjectData = {
        title,
        ingredients: cur.data?.ingredients.map((ing) => ing.name) ?? [],
        cookwares: cur.data?.cookwares.map((cw) => cw.name) ?? [],
        totalTimeMinutes: collectTimes(cur.data.steps)
      };

      return {
        ...acc,
        [course]: {
          ...acc[course],
          [title]: data
        }
      };
    },
    {} as RecipeResponse
  );

  return response;
};

export async function GET({ url }) {
  const recipes = await readReciepes();
  const processed = processRecipes(recipes);
  return json(processed);
}
