"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchService = void 0;
class SearchService {
    static buildSearchFilter(searchText) {
        if (!searchText) {
            return {};
        }
        const objSearchText = { $regex: searchText, $options: 'i' };
        return {
            $or: [
                { name: objSearchText },
                { email: objSearchText },
                { githubUser: objSearchText },
            ],
        };
    }
}
exports.SearchService = SearchService;
