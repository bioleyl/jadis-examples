import type { Recipe } from '../types/recipe.type';

export const chickenCurryRecipe: Recipe = {
  id: 5,
  ingredients: [
    '2 chicken breasts, cut into bite-sized pieces',
    '1 tbsp vegetable oil',
    '1 onion, finely chopped',
    '2 garlic cloves, minced',
    '1 tbsp curry powder',
    '400 g canned chopped tomatoes',
    '150 ml coconut milk',
    'Cooked rice and fresh coriander, to serve',
  ],
  instructions: [
    'Heat the oil in a large pan and cook the onion for 5 minutes until softened.',
    'Add the garlic and curry powder, then cook for 1 minute.',
    'Add the chicken and cook until lightly browned on all sides.',
    'Stir in the tomatoes and coconut milk, then bring to a gentle simmer.',
    'Cook for 15–20 minutes until the chicken is cooked through and the sauce has thickened.',
    'Serve with rice and fresh coriander.',
  ],
  slug: 'chicken-curry',
  title: 'Easy Chicken Curry',
};
