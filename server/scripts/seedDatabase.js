// Import required modules first
const path = require('path');
const fs = require('fs');
const mongoose = require('mongoose');

// Fix the path to the .env file
const envPath = path.resolve(__dirname, '../.env');
console.log(`Loading environment variables from: ${envPath}`);
require('dotenv').config({ path: envPath });

// Debug environment variables
console.log('Environment variables loaded:');
console.log(`MONGODB_URI: ${process.env.MONGODB_URI ? 'Set' : 'Not set'}`);
console.log(`JWT_SECRET: ${process.env.JWT_SECRET ? 'Set' : 'Not set'}`);
console.log(`NODE_ENV: ${process.env.NODE_ENV || 'Not set'}`);

// Import models
const User = require('../models/User');
const Pet = require('../models/Pet');
const AdoptionRequest = require('../models/AdoptionRequest');
const Review = require('../models/Review');
const LostFoundPet = require('../models/LostFoundPet');

// Sample data
const sampleUsers = [
  {
    name: 'John Doe',
    email: 'john.doe@example.com',
    password: 'password123',
    phone: '555-123-4567',
    role: 'user',
    address: '123 Main St, New York, NY 10001',
    createdAt: new Date()
  },
  {
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    password: 'password123',
    phone: '555-987-6543',
    role: 'admin',
    address: '456 Oak Ave, Los Angeles, CA 90001',
    createdAt: new Date()
  }
];

const samplePets = [
  {
    name: 'Max',
    age: 2,
    breed: 'Golden Retriever',
    type: 'Dog',
    description: 'Friendly and energetic Golden Retriever who loves to play fetch and go for walks.',
    imageUrl: 'https://images.unsplash.com/photo-1552053831-71594a27632d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    gender: 'Male',
    vaccinated: true,
    isAdopted: false,
    addedBy: null, // Will be set dynamically
    createdAt: new Date()
  },
  {
    name: 'Luna',
    age: 1,
    breed: 'Siamese',
    type: 'Cat',
    description: 'Sweet and affectionate Siamese cat who enjoys cuddling and playing with toys.',
    imageUrl: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    gender: 'Female',
    vaccinated: true,
    isAdopted: false,
    addedBy: null, // Will be set dynamically
    createdAt: new Date()
  },
  {
    name: 'Charlie',
    age: 3,
    breed: 'Beagle',
    type: 'Dog',
    description: 'Playful and curious Beagle who loves exploring and has a great nose for finding treats.',
    imageUrl: 'https://images.unsplash.com/photo-1593134257782-e89567b7718a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    gender: 'Male',
    vaccinated: true,
    isAdopted: false,
    addedBy: null, // Will be set dynamically
    createdAt: new Date()
  },
  {
    name: 'Bella',
    age: 2,
    breed: 'Maine Coon',
    type: 'Cat',
    description: 'Gentle giant Maine Coon who is very affectionate and gets along well with other pets.',
    imageUrl: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    gender: 'Female',
    vaccinated: true,
    isAdopted: false,
    addedBy: null, // Will be set dynamically
    createdAt: new Date()
  }
];

const sampleAdoptions = [
  {
    petId: null, // Will be set dynamically
    userId: null, // Will be set dynamically
    status: 'approved',
    notes: 'I have always wanted a Golden Retriever and have a large yard for him to play in.',
    adminNotes: 'Applicant has a suitable home environment for a Golden Retriever.',
    createdAt: new Date()
  },
  {
    petId: null, // Will be set dynamically
    userId: null, // Will be set dynamically
    status: 'pending',
    notes: 'I have had cats before and live in a pet-friendly apartment building.',
    createdAt: new Date()
  }
];

const sampleReviews = [
  {
    petId: null, // Will be set dynamically
    userId: null, // Will be set dynamically
    rating: 5,
    comment: 'Max is the best dog ever! He is so friendly and well-behaved.',
    createdAt: new Date()
  },
  {
    petId: null, // Will be set dynamically
    userId: null, // Will be set dynamically
    rating: 4,
    comment: 'Luna is a sweet cat who loves to cuddle. She has adjusted well to our home.',
    createdAt: new Date()
  }
];

// Sample lost and found pets data
const lostFoundPets = [
  {
    name: 'Max',
    type: 'dog',
    breed: 'Golden Retriever',
    color: 'Golden',
    age: 2,
    gender: 'male',
    status: 'lost',
    location: {
      street: '123 Oak Street',
      city: 'Seattle',
      state: 'WA',
      zipCode: '98101'
    },
    dateLastSeen: new Date('2024-02-15'),
    description: 'Friendly golden retriever wearing a blue collar. Last seen near Green Lake Park.',
    imageUrl: 'https://images.unsplash.com/photo-1552053831-71594a27632d?q=80&w=662&auto=format&fit=crop',
    contactInfo: {
      name: 'John Smith',
      email: 'john.smith@example.com',
      phone: '(206) 555-0123'
    },
    isResolved: false,
    addedBy: null // Will be set to a user ID
  },
  {
    name: 'Luna',
    type: 'cat',
    breed: 'Siamese',
    color: 'Cream and Brown',
    age: 1,
    gender: 'female',
    status: 'found',
    location: {
      street: '456 Pine Avenue',
      city: 'Seattle',
      state: 'WA',
      zipCode: '98102'
    },
    dateLastSeen: new Date('2024-02-14'),
    description: 'Found a friendly Siamese cat near Capitol Hill. Very well-groomed and wearing a pink collar.',
    imageUrl: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=686&auto=format&fit=crop',
    contactInfo: {
      name: 'Sarah Johnson',
      email: 'sarah.j@example.com',
      phone: '(206) 555-0456'
    },
    isResolved: false,
    addedBy: null // Will be set to a user ID
  },
  {
    name: 'Rocky',
    type: 'dog',
    breed: 'German Shepherd',
    color: 'Black and Tan',
    age: 3,
    gender: 'male',
    status: 'lost',
    location: {
      street: '789 Cedar Lane',
      city: 'Bellevue',
      state: 'WA',
      zipCode: '98004'
    },
    dateLastSeen: new Date('2024-02-13'),
    description: 'Large German Shepherd, very friendly but may be scared. Last seen near Bellevue Downtown Park.',
    imageUrl: 'https://images.unsplash.com/photo-1589941013453-ec89f33b5e95?q=80&w=687&auto=format&fit=crop',
    contactInfo: {
      name: 'Michael Brown',
      email: 'michael.b@example.com',
      phone: '(425) 555-0789'
    },
    isResolved: false,
    addedBy: null // Will be set to a user ID
  }
];

// Connect to MongoDB
const connectDB = async () => {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error('MONGODB_URI is not defined in the environment variables');
    }
    
    console.log(`Attempting to connect to MongoDB at: ${process.env.MONGODB_URI.replace(/\/\/[^:]+:[^@]+@/, '//***:***@')}`);
    
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    console.error('Full error:', error);
    process.exit(1);
  }
};

// Clear existing data
const clearData = async () => {
  try {
    await User.deleteMany({});
    await Pet.deleteMany({});
    await AdoptionRequest.deleteMany({});
    await Review.deleteMany({});
    await LostFoundPet.deleteMany({});
    
    console.log('All existing data cleared');
  } catch (error) {
    console.error(`Error clearing data: ${error.message}`);
  }
};

// Seed the database
const seedDatabase = async () => {
  try {
    // Connect to the database
    await connectDB();
    
    // Clear existing data
    await clearData();
    
    // Insert users
    const users = await User.insertMany(sampleUsers);
    console.log(`${users.length} users inserted`);
    
    // Update pet records with addedBy user ID
    samplePets.forEach(pet => {
      pet.addedBy = users[0]._id; // Set all pets to be added by the first user
    });
    
    // Insert pets
    const pets = await Pet.insertMany(samplePets);
    console.log(`${pets.length} pets inserted`);
    
    // Update adoption records with pet IDs and user IDs
    sampleAdoptions[0].petId = pets[0]._id;
    sampleAdoptions[0].userId = users[0]._id;
    sampleAdoptions[1].petId = pets[1]._id;
    sampleAdoptions[1].userId = users[1]._id;
    
    // Insert adoptions
    const adoptions = await AdoptionRequest.insertMany(sampleAdoptions);
    console.log(`${adoptions.length} adoptions inserted`);
    
    // Update review records with pet and user IDs
    sampleReviews[0].petId = pets[0]._id;
    sampleReviews[0].userId = users[0]._id;
    sampleReviews[1].petId = pets[1]._id;
    sampleReviews[1].userId = users[1]._id;
    
    // Insert reviews
    const reviews = await Review.insertMany(sampleReviews);
    console.log(`${reviews.length} reviews inserted`);
    
    // Function to seed lost and found pets
    await seedLostFoundPets();
    
    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error(`Error seeding database: ${error.message}`);
    process.exit(1);
  }
};

// Function to seed lost and found pets
async function seedLostFoundPets() {
  try {
    // Clear existing lost and found pets
    await LostFoundPet.deleteMany({});
    console.log('Cleared existing lost and found pets');

    // Get a user to associate with the lost and found pets
    const user = await User.findOne({ email: 'john.doe@example.com' });
    if (!user) {
      throw new Error('Sample user not found');
    }

    // Add user reference to each lost and found pet
    const lostFoundPetsWithUser = lostFoundPets.map(pet => ({
      ...pet,
      addedBy: user._id
    }));

    // Insert lost and found pets
    await LostFoundPet.insertMany(lostFoundPetsWithUser);
    console.log('Seeded lost and found pets');
  } catch (error) {
    console.error('Error seeding lost and found pets:', error);
    throw error;
  }
}

// Run the seeding function
seedDatabase(); 