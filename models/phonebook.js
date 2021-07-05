const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const url = process.env.MONGODB_URI

console.log('connecting to', url)

mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB', error.message)
  })

const phonebookSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: [3, 'Must contain at least 3 characters'],
    required: true,
    unique: true,
  },
  number: {
    type: String,
    minLength: 8,
    required: true,
    unique: true,
  },
})

phonebookSchema.plugin(uniqueValidator)

phonebookSchema.set('to JSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject._v
  },
})

module.exports = mongoose.model('Phonbook', phonebookSchema)

//   contact.save().then((result) => {
//     console.log(`added ${name} number ${number} to phonebook`);
//     mongoose.connection.close();
//   });
// } else {
//   Contact.find({}).then((result) => {
//     console.log("phonebook:");
//     result.forEach((re) => {
//       console.log(`${re.name} ${re.number}`);
//     });
//     mongoose.connection.close();
//   });
// }
