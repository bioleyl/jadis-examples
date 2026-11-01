export interface Recipe {
  id: number;
  title: string;
  slug: string;
  /** How many the ingredients are for. */
  servings: number;
  ingredients: string[];
  instructions: string[];
}

/** What the list shows of a recipe. */
export type RecipeSummary = Pick<Recipe, 'slug' | 'title' | 'servings'>;

/** What the recipes page shows: the recipes found, and the search that found them. */
export interface RecipesView {
  query: string;
  recipes: RecipeSummary[];
}

/** What the recipe page shows: the recipe, or that there is none of that name. */
export type RecipeView = { found: true; recipe: Recipe } | { found: false; slug: string };
