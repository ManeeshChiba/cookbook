export function labelize(name: string) {
  return name
    .replace(/(-)/, " ")
    .replace(/\w\S*/g, (text) => text.charAt(0).toUpperCase() + text.substring(1).toLowerCase());
}

export interface TextStep {
  type: "text";
  value: string;
}

export interface IngredientStep {
  type: "ingredient";
  name: string;
  quantity: number;
  units: string;
}

export interface CookwareStep {
  type: "cookware";
  name: string;
  quantity: number;
}

export interface TimerStep {
  type: "timer";
  name: string;
  quantity: number;
  units: string;
}

export type Step = TextStep | IngredientStep | CookwareStep | TimerStep;

export function isTextStep(step: Step): step is TextStep {
  return step.type === "text";
}

export function isIngredientStep(step: Step): step is IngredientStep {
  return step.type === "ingredient";
}

export function isCookwareStep(step: Step): step is CookwareStep {
  return step.type === "cookware";
}

export function isTimerStep(step: Step): step is TimerStep {
  return step.type === "timer";
}

export function stepsToText(steps: Array<Step[]>): string[] {
  return steps.map((stepBlocks: Step[]) => {
    return stepBlocks
      .map((block) => {
        switch (block.type) {
          case "text":
            return block.value;
          case "ingredient":
          case "cookware":
            return block.name;
          case "timer":
            return `${block.quantity} ${block.units}`;
          default:
            return "[MISSING BLOCK]";
        }
      })
      .join(" ");
  });
}
