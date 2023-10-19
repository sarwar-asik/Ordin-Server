export const ServiceSearchableField = ['title','price','contact'];


export const ServiceFilterableFields = [
  'contact',
  'price',
 
  'searchTerm',

  'title',
];

export const serviceRelationalFields: string[] = ['categoryId'];
export const serviceRelationalFieldsMapper: { [key: string]: string } = {
  categoryId: 'categories',
};
