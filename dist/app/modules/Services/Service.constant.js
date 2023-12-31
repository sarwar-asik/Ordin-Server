"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serviceRelationalFieldsMapper = exports.serviceRelationalFields = exports.ServiceFilterableFields = exports.ServiceSearchableField = void 0;
exports.ServiceSearchableField = ['title', 'price', 'contact'];
exports.ServiceFilterableFields = [
    'contact',
    'price',
    'searchTerm',
    'title',
    'categoryId',
    'publisherId'
];
exports.serviceRelationalFields = ['categoryId', 'publisherId'];
exports.serviceRelationalFieldsMapper = {
    categoryId: 'categories',
};
