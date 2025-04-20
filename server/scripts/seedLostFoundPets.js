const mongoose = require('mongoose');
const LostFoundPet = require('../models/LostFoundPet');
const User = require('../models/User');
require('dotenv').config();

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
    isResolved: false
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
    isResolved: false
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
    isResolved: false
  }
];

const seedLostFoundPets = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

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

    // Disconnect from MongoDB
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  } catch (error) {
    console.error('Error seeding lost and found pets:', error);
    process.exit(1);
  }
};

// Run the seeding function
seedLostFoundPets(); 