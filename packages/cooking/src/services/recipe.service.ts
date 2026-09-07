import { baguetteRecipe } from '../data/baguette.recipe';
import { carbonaraRecipe } from '../data/carbonara.recipe';
import { chickenCurryRecipe } from '../data/chicken-curry.recipe';
import { cookiesRecipe } from '../data/cookies.recipe';
import { lentilSoupRecipe } from '../data/lentil-soup.recipe';
import { pancakesRecipe } from '../data/pancakes.recipe';
import { tomatoPastaRecipe } from '../data/tomato-pasta.recipe';
import { vegetableStirFryRecipe } from '../data/vegetable-stir-fry.recipe';
import { assert } from '../helpers/assert.helper';

import type { Recipe } from '../types/recipe.type';

export class RecipeService {
  private static _instance: RecipeService;
  private readonly _recipes: Array<Recipe> = [
    baguetteRecipe,
    tomatoPastaRecipe,
    vegetableStirFryRecipe,
    pancakesRecipe,
    carbonaraRecipe,
    chickenCurryRecipe,
    cookiesRecipe,
    lentilSoupRecipe,
  ];

  private constructor() {}

  public static getInstance(): RecipeService {
    RecipeService._instance ??= new RecipeService();
    return RecipeService._instance;
  }

  get all(): Array<Recipe> {
    return this._recipes;
  }

  search(query: string): Array<Recipe> {
    const lowerCaseQuery = query.toLowerCase();
    return this._recipes.filter((recipe) => recipe.title.toLowerCase().includes(lowerCaseQuery));
  }

  byId(id: number): Recipe {
    const recipe = this._recipes.find((recipe) => recipe.id === id);
    assert(recipe, `RecipeService: Recipe with id ${id} not found`);
    return recipe;
  }
}
