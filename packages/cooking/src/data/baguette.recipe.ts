import type { Recipe } from '../types/recipe.type';

export const baguetteRecipe: Recipe = {
  id: 0,
  ingredients: [
    '500 g strong white bread flour',
    '375 ml lukewarm water',
    '10 g fine sea salt',
    '7 g instant yeast',
  ],
  instructions: [
    'Mix the flour, water, salt, and yeast until a sticky dough forms.',
    'Cover and let the dough rise at room temperature for about 2 hours.',
    'Shape the dough into two baguettes and place them on a lined baking tray.',
    'Let the baguettes rest for 30 minutes while the oven heats to 240°C.',
    'Score the tops, add a little steam to the oven, and bake for 20–25 minutes until golden.',
  ],
  slug: 'baguette',
  title: 'Classic Baguette',
};
