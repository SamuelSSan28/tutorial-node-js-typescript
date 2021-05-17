import { UsersController } from "./controllers/usersController";
import express from "express";
import "./database";

const app = express();

app.use(express.json());

const userController = new UsersController()

app.get("/login/:username/:password",userController.login)

app.post("/users",userController.createUser)

app.listen(3333,()=>console.log("Server Started"))