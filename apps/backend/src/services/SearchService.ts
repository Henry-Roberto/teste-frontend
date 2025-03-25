export class SearchService {
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
