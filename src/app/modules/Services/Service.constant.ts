

export const ServiceFilterableFields = [
  'searchTerm',
  // 'contact',
  // 'price',
  // 'status',
  'categoryId',
  'id'
];

export const ServiceSearchableField = [
  'title',
  'contact',
  'price',

  'status'

];



export const academicDepartmentSearchableFields: string[] = ['title'];

export const serviceRelationalFields: string[] = ['categoryId'];
export const serviceRelationalFieldsMapper: { [key: string]: string } = {
  categoryId: 'categories'
};