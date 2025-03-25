import { Router } from "express";
import { PersonService } from '../services/PersonService';

const router = Router();

router.get("/persons", async (req, res) => {
  try {
    const searchText = req.query?.searchText;
    const persons = await PersonService.getPersons(searchText);
    res.json(persons);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/person", async (req, res) => {
  try {
    const { id } = req.query;
    const personData = await PersonService.getPersonById(id);
    if (!personData) {
      return res.status(404).json({ error: "Person not found" });
    }
    res.json(personData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/person", async (req, res) => {
  try {
    const { name, email } = req.body;
    if (!name || !email) {
      return res.status(400).json({ error: "Invalid data" });
    }
    const newPerson = await PersonService.createPerson(req.body);
    res.json(newPerson);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put("/person", async (req, res) => {
  try {
    const { id } = req.query;
    if (!id) {
      return res.status(400).json({ error: "Invalid ID" });
    }

    const { name, email } = req.body;
    if (!name || !email) {
      return res.status(400).json({ error: "Invalid data" });
    }

    const updatedPerson = await PersonService.updatePerson(id, req.body);
    if (!updatedPerson) {
      return res.status(404).json({ error: "Person not found" });
    }

    res.json(updatedPerson);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete("/person", async (req, res) => {
  try {
    const { id } = req.query;
    if (!id) {
      return res.status(400).json({ error: "Invalid ID" });
    }

    const deletedPerson = await PersonService.deletePerson(id);
    if (!deletedPerson) {
      return res.status(404).json({ error: "Person not found" });
    }

    res.json(deletedPerson);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export { router as personRoutes };
