export interface LookupObjectData {
  title: string;
  ingredients: string[];
  totalTimeMinutes: number;
  cookwares: string[];
}

export type LookupObject = Record<string, LookupObjectData>;
