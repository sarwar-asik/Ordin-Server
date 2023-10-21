export const ServiceSearchableField = ['title','price','contact'];


export const ServiceFilterableFields = [
  'contact',
  'price',
 
  'searchTerm',

  'title',
  'categoryId',
  'publisherId'

];

export const serviceRelationalFields: string[] = ['categoryId','publisherId'];
export const serviceRelationalFieldsMapper: { [key: string]: string } = {
  categoryId: 'categories',
};
