import type { Recipe } from '../types/recipe.type';

export const pancakesRecipe: Recipe = {
  id: 3,
  ingredients: [
    '200 g plain flour',
    '2 tsp baking powder',
    '1 tbsp sugar',
    '1 egg',
    '300 ml milk',
    '2 tbsp melted butter',
    'A pinch of salt',
  ],
  instructions: [
    'Whisk the flour, baking powder, sugar, and salt in a bowl.',
    'Beat the egg with the milk and melted butter in a separate bowl.',
    'Pour the wet ingredients into the dry ingredients and stir until just combined.',
    'Cook spoonfuls of batter in a lightly buttered pan until bubbles form, then flip and cook until golden.',
    'Serve warm with fruit, yogurt, or maple syrup.',
  ],
  slug: 'pancakes',
  title: 'Fluffy Pancakes',
};
