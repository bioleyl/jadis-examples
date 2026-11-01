const LEADING_QUANTITY = /^(\d+(?:\.\d+)?)(\s.*)$/;
const ROUNDING = 10;

/** An ingredient for another number of servings: its leading quantity scaled (`200 g flour` → `300 g flour`). */
export function scaleIngredient(ingredient: string, factor: number): string {
  const match = LEADING_QUANTITY.exec(ingredient);
  if (!match) {
    return ingredient;
  }
  const [, quantity = '0', rest = ''] = match;
  return `${Math.round(Number(quantity) * factor * ROUNDING) / ROUNDING}${rest}`;
}
