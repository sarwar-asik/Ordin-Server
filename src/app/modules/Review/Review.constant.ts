

export const ReviewFilterableFields = [
    'searchTerm',
    'userId',
    'id'
  ];
  
  export const ReviewSearchableField = [
    'reviews',
    'rating',
  
  ];
  
  
  export const ReviewRelationalFields: string[] = ['userId'];
  export const ReviewRelationalFieldsMapper: { [key: string]: string } = {
    userId: 'user'
  };