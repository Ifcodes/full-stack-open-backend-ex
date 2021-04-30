const express = require("express");
const { response, request } = require("express");
// const { response } = require("express");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());

let persons = [
  {
    id: 1,
    name: "Desmond",
    phone: "08102228633",
  },
  {
    id: 2,
    name: "Faith",
    phone: "07010100882",
  },
  {
    id: 3,
    name: "Williams",
    phone: "08126149680",
  },
];

app.get("/api/persons", (request, response) => {
  response.json(persons);
});

app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  const person = persons.find((person) => person.id === id);

  if (person) {
    response.json(person);
  } else {
    response.status(404).end();
  }
});

// let currenttime = new Date()

app.get("/info", (request, response) => {
  response.send(
    `<p>Phonebook has info for ${persons.length} people</p>
    <p>${new Date()}</p>
    `
  );
});

app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  const person = persons.find((person) => person.id === id);
  persons = persons.filter((p) => p.id !== person.id);
  response.json(person);
  response.status(204).end();
});

app.post("/api/persons", (request, response) => {
  const body = request.body;
  const nameexist = persons.find((person) => person.name === body.name);

  if (!body.name || !body.phone) {
    return response.status(400).json({
      error: "Name or Phonenumber is missing",
    });
  }
  if (nameexist) {
    return response.status(400).json({
      error: "Name already exist",
    });
  }

  const person = {
    id: Math.random().toString(36).substring(2, 10),
    name: body.name,
    phone: body.phone,
    dateAdded: new Date(),
  };

  persons = persons.concat(person);

  response.json(person);
});
const PORT = process.env.PORT || 3002;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
