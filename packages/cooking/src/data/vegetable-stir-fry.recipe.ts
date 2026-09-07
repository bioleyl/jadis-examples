import type { Recipe } from '../types/recipe.type';

export const vegetableStirFryRecipe: Recipe = {
  id: 2,
  ingredients: [
    '1 tbsp sesame oil',
    '1 carrot, thinly sliced',
    '1 bell pepper, thinly sliced',
    '150 g broccoli florets',
    '2 spring onions, sliced',
    '2 tbsp soy sauce',
    'Cooked rice, to serve',
  ],
  instructions: [
    'Heat the sesame oil in a large wok or frying pan.',
    'Stir-fry the carrot, pepper, and broccoli for 5–6 minutes until tender-crisp.',
    'Add the spring onions and soy sauce, then toss for another minute.',
    'Serve immediately over warm rice.',
  ],
  slug: 'vegetable-stir-fry',
  title: 'Sesame Vegetable Stir-Fry',
};
