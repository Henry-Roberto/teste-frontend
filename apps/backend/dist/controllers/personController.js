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
Object.defineProperty(exports, "__esModule", { value: true });
exports.personRoutes = void 0;
const express_1 = require("express");
const PersonService_1 = require("../services/PersonService");
const router = (0, express_1.Router)();
exports.personRoutes = router;
router.get("/persons", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const searchText = (_a = req.query) === null || _a === void 0 ? void 0 : _a.searchText;
        const persons = yield PersonService_1.PersonService.getPersons(searchText);
        res.json(persons);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}));
router.get("/person", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.query;
        const personData = yield PersonService_1.PersonService.getPersonById(id);
        if (!personData) {
            return res.status(404).json({ error: "Person not found" });
        }
        res.json(personData);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}));
router.post("/person", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email } = req.body;
        if (!name || !email) {
            return res.status(400).json({ error: "Invalid data" });
        }
        const newPerson = yield PersonService_1.PersonService.createPerson(req.body);
        res.json(newPerson);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}));
router.put("/person", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.query;
        if (!id) {
            return res.status(400).json({ error: "Invalid ID" });
        }
        const { name, email } = req.body;
        if (!name || !email) {
            return res.status(400).json({ error: "Invalid data" });
        }
        const updatedPerson = yield PersonService_1.PersonService.updatePerson(id, req.body);
        if (!updatedPerson) {
            return res.status(404).json({ error: "Person not found" });
        }
        res.json(updatedPerson);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}));
router.delete("/person", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.query;
        if (!id) {
            return res.status(400).json({ error: "Invalid ID" });
        }
        const deletedPerson = yield PersonService_1.PersonService.deletePerson(id);
        if (!deletedPerson) {
            return res.status(404).json({ error: "Person not found" });
        }
        res.json(deletedPerson);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}));
