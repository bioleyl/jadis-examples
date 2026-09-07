export interface Recipe {
  id: number;
  title: string;
  slug: string;
  ingredients: Array<string>;
  instructions: Array<string>;
}
