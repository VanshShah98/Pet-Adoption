const mongoose = require('mongoose');
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

// Define Pet Schema
const petSchema = new mongoose.Schema({
  name: String,
  type: String,
  breed: String
});

const Pet = mongoose.model('Pet', petSchema);

// List all pets
async function listPets() {
  try {
    const pets = await Pet.find({}, '_id name type breed');
    console.log('\nAvailable Pets:');
    console.log('----------------');
    pets.forEach(pet => {
      console.log(`ID: ${pet._id}`);
      console.log(`Name: ${pet.name}`);
      console.log(`Type: ${pet.type}`);
      console.log(`Breed: ${pet.breed}`);
      console.log('----------------');
    });
  } catch (error) {
    console.error('Error listing pets:', error);
  } finally {
    await mongoose.disconnect();
    console.log('\nDisconnected from MongoDB');
  }
}

listPets(); 