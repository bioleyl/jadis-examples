import type { Recipe } from '../types/recipe.type';

export const cookiesRecipe: Recipe = {
  id: 6,
  ingredients: [
    '125 g softened butter',
    '100 g light brown sugar',
    '75 g granulated sugar',
    '1 egg',
    '1 tsp vanilla extract',
    '225 g plain flour',
    '1 tsp baking soda',
    '150 g chocolate chips',
  ],
  instructions: [
    'Heat the oven to 180°C and line two baking trays with baking paper.',
    'Beat the butter and sugars until light and fluffy.',
    'Mix in the egg and vanilla extract.',
    'Fold in the flour and baking soda, then stir through the chocolate chips.',
    'Place spoonfuls of dough on the trays, leaving room for them to spread.',
    'Bake for 10–12 minutes until the edges are golden, then cool on the trays.',
  ],
  slug: 'chocolate-chip-cookies',
  title: 'Chocolate Chip Cookies',
};
