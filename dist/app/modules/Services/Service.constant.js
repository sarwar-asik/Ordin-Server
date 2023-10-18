"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serviceRelationalFieldsMapper = exports.serviceRelationalFields = exports.ServiceSearchableField = exports.ServiceFilterableFields = void 0;
exports.ServiceFilterableFields = [
    'searchTerm',
    // 'contact',
    // 'price',
    // 'status',
    'categoryId',
    'id'
];
exports.ServiceSearchableField = [
    'title',
    'contact',
    'price',
    'status'
];
exports.serviceRelationalFields = ['categoryId'];
exports.serviceRelationalFieldsMapper = {
    categoryId: 'categories'
};
