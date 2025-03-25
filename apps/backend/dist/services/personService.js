"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PersonService = void 0;
const person_1 = __importDefault(require("../models/person"));
const SearchService_1 = require("../services/SearchService");
class PersonService {
    static getPersons(searchText) {
        return __awaiter(this, void 0, void 0, function* () {
            const filter = SearchService_1.SearchService.buildSearchFilter(searchText);
            return person_1.default.find(filter);
        });
    }
    static getPersonById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return person_1.default.findById(id);
        });
    }
    static createPerson(personData) {
        return __awaiter(this, void 0, void 0, function* () {
            personData.createdAt = new Date().getTime();
            personData.updatedAt = new Date().getTime();
            return person_1.default.create(personData);
        });
    }
    static updatePerson(id, personData) {
        return __awaiter(this, void 0, void 0, function* () {
            personData.updatedAt = new Date();
            return person_1.default.findByIdAndUpdate(id, personData, { new: true });
        });
    }
    static deletePerson(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return person_1.default.findByIdAndDelete(id);
        });
    }
}
exports.PersonService = PersonService;
