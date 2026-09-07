import type { Recipe } from '../types/recipe.type';

export const lentilSoupRecipe: Recipe = {
  id: 7,
  ingredients: [
    '1 tbsp olive oil',
    '1 onion, diced',
    '2 carrots, diced',
    '2 garlic cloves, minced',
    '200 g dried red lentils',
    '1 litre vegetable stock',
    '1 tsp ground cumin',
    '400 g canned chopped tomatoes',
    'Salt, pepper, and lemon juice to taste',
  ],
  instructions: [
    'Heat the oil in a large pot and cook the onion and carrots for 6–8 minutes.',
    'Add the garlic and cumin, then cook for another minute.',
    'Stir in the lentils, stock, and tomatoes.',
    'Bring to a boil, then simmer for 20–25 minutes until the lentils are tender.',
    'Season with salt, pepper, and a squeeze of lemon juice before serving.',
  ],
  slug: 'lentil-soup',
  title: 'Hearty Lentil Soup',
};
