// JSON.stringify()
// JSON.parse()
const person = {
  "firstName": 'Destiny',
  "lastName": 'Caesar',
  "age": 20,
  "address": {
    "city": "Benin",
    "state": "Edo"
  },
  "isMarried": false,
  "hobbies": ['music', 'movies', 'sports'],
}

let jsonPerson = JSON.stringify(person)
let objectPerson = JSON.parse(jsonPerson)
console.log(jsonPerson, objectPerson)
