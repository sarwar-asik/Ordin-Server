"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewRelationalFieldsMapper = exports.ReviewRelationalFields = exports.ReviewSearchableField = exports.ReviewFilterableFields = void 0;
exports.ReviewFilterableFields = [
    'searchTerm',
    'userId',
    'id'
];
exports.ReviewSearchableField = [
    'reviews',
    'rating',
];
exports.ReviewRelationalFields = ['userId'];
exports.ReviewRelationalFieldsMapper = {
    userId: 'user'
};
