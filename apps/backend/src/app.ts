import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db";
import { personRoutes } from "./controllers/PersonController";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors({
  origin: "http://localhost:4200",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));
app.use(express.json());

// Conexão com o banco de dados
connectDB();

// Rotas
app.use("/", personRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
