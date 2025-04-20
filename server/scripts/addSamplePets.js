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
  name: { type: String, required: true },
  age: { type: Number, required: true },
  breed: { type: String, required: true },
  type: { type: String, required: true, enum: ['Dog', 'Cat', 'Bird', 'Other'] },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },
  gender: { type: String, required: true, enum: ['Male', 'Female'] },
  vaccinated: { type: Boolean, default: false },
  isAdopted: { type: Boolean, default: false },
  addedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

const Pet = mongoose.model('Pet', petSchema);

// Sample pets data
const samplePets = [
  {
    name: 'Max',
    age: 2,
    breed: 'Golden Retriever',
    type: 'Dog',
    description: 'Friendly and energetic dog who loves to play fetch.',
    imageUrl: 'https://images.unsplash.com/photo-1633722715463-d30f4f325e24',
    gender: 'Male',
    vaccinated: true,
    isAdopted: false,
    addedBy: '6800f3f9341b6edde9c385a0' // Replace with a valid admin user ID
  },
  {
    name: 'Luna',
    age: 1,
    breed: 'Maine Coon',
    type: 'Cat',
    description: 'Gentle and affectionate cat who loves to cuddle.',
    imageUrl: 'https://images.unsplash.com/photo-1591429939960-b7d5add10b5c',
    gender: 'Female',
    vaccinated: true,
    isAdopted: false,
    addedBy: '6800f3f9341b6edde9c385a0' // Replace with a valid admin user ID
  }
];

// Add sample pets to database
async function addSamplePets() {
  try {
    // Clear existing pets
    await Pet.deleteMany({});
    console.log('Cleared existing pets');

    // Add new pets
    const pets = await Pet.insertMany(samplePets);
    console.log('Added sample pets:', pets);
  } catch (error) {
    console.error('Error adding sample pets:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}

addSamplePets(); 