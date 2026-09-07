import type { Recipe } from '../types/recipe.type';

export const carbonaraRecipe: Recipe = {
  id: 4,
  ingredients: [
    '200 g spaghetti',
    '100 g pancetta or bacon, diced',
    '2 large eggs',
    '50 g finely grated Parmesan',
    '1 garlic clove, optional',
    'Freshly ground black pepper',
  ],
  instructions: [
    'Cook the spaghetti in salted water until al dente, reserving a mug of the cooking water.',
    'Fry the pancetta until crisp. Add the garlic for the final minute, then remove it.',
    'Whisk the eggs, Parmesan, and plenty of black pepper in a bowl.',
    'Take the pan off the heat and toss in the drained pasta.',
    'Stir in the egg mixture, loosening with pasta water until glossy and creamy.',
    'Serve immediately with extra Parmesan and black pepper.',
  ],
  slug: 'spaghetti-carbonara',
  title: 'Spaghetti Carbonara',
};
