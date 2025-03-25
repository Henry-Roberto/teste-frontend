import person from "../models/person";
import { SearchService } from "../services/SearchService";

export class PersonService<T> {
  static async getPersons(searchText) {
    const filter = SearchService.buildSearchFilter(searchText);
    return person.find(filter);
  }

  static async getPersonById(id) {
    return person.findById(id);
  }

  static async createPerson(personData) {
    personData.createdAt = new Date().getTime();
    personData.updatedAt = new Date().getTime();
    return person.create(personData);
  }

  static async updatePerson(id, personData) {
    personData.updatedAt = new Date();
    return person.findByIdAndUpdate(id, personData, { new: true });
  }

  static async deletePerson(id) {
    return person.findByIdAndDelete(id);
  }
}
