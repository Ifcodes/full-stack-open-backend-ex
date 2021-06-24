const express = require("express");
// const { response, request } = require("express");
const Phonebook = require("./models/phonebook");
// const { response } = require("express");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.static("build"));
app.use(express.json());

// let persons = [
//   {
//     id: 1,
//     name: "Desmond",
//     phoneNumber: "08102228633",
//   },
//   {
//     id: 2,
//     name: "Faith",
//     phoneNumber: "07010100882",
//   },
//   {
//     id: 3,
//     name: "Williams",
//     phoneNumber: "08126149680",
//   },
// ];

app.get("/api/persons", (request, response) => {
  Phonebook.find({}).then((persons) => {
    response.json(persons);
  });
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

  // const nameexist = Phonebook.find({ name: body.name }).then((result) => {
  //   console.log(result);
  // });
  // console.log(nameexist);

  // if (!body.name || !body.phoneNumber) {
  //   return response.status(400).json({
  //     error: "Name or Phonenumber is missing",
  //   });
  // }
  // if (nameexist) {
  //   console.log(nameexist);
  //   return response.status(400).json({
  //     error: "Name already exist",
  //   });
  // }

  const person = new Phonebook({
    name: body.name,
    number: body.number,
    dateAdded: new Date(),
  });

  person.save().then((savedContact) => {
    response.json(savedContact);
  });
});

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
