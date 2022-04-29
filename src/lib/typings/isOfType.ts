export const isOfType = <T>(value: unknown, propertyToCheck: keyof T): value is T =>
  (value as T)[propertyToCheck] !== undefined;

export type objectType = {
  str: string;
  num: number;
  bool: boolean;
};
