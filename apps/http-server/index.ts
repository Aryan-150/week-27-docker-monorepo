import express from "express";
import { client } from "@repo/db/client";

const app = express();

app.use(express.json());

app.get("/users", (req, res) => {
  client.user.findMany()
    .then(users => {
      res.json(users);
    })
    .catch(err => {
      res.status(500).json({ error: err.message });
    });
})

app.post("/user", (req, res) => {
  const username = req.body.username as string;
  const password = req.body.password as string;
  
  if (!username || !password) {
    res.status(400).json({ error: "Username and password are required" });
    return
  }

  client.user.create({
    data: {
      username,
      password
    }
  })
    .then(user => {
      res.status(201).json(user);
    })
    .catch(err => {
      res.status(500).json({ error: err.message });
    });
})

app.listen(8080);