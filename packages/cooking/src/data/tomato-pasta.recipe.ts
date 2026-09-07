import type { Recipe } from '../types/recipe.type';

export const tomatoPastaRecipe: Recipe = {
  id: 1,
  ingredients: [
    '200 g dried pasta',
    '2 tbsp olive oil',
    '2 garlic cloves, finely chopped',
    '400 g canned chopped tomatoes',
    '1 tsp dried oregano',
    'Fresh basil and grated Parmesan, to serve',
  ],
  instructions: [
    'Cook the pasta in salted water according to the packet instructions.',
    'Warm the olive oil in a pan and cook the garlic for 1 minute.',
    'Add the tomatoes and oregano, then simmer for 10 minutes.',
    'Drain the pasta and toss it through the sauce.',
    'Finish with fresh basil and Parmesan before serving.',
  ],
  slug: 'tomato-pasta',
  title: 'Quick Tomato Pasta',
};
