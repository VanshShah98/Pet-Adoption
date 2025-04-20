# Database Seeding Script

This script populates the MongoDB Atlas database with sample data for the Pet Adoption platform.

## What the Script Does

1. Connects to your MongoDB Atlas database using the connection string in your `.env` file
2. Clears any existing data in the collections
3. Inserts sample data for:
   - Users (including an admin user)
   - Pets (dogs and cats)
   - Adoption requests
   - Reviews

## How to Run the Script

1. Make sure your MongoDB Atlas connection string is correctly set in the `.env` file
2. Navigate to the server directory in your terminal
3. Run the following command:

```bash
npm run seed
```

## Sample Data Details

### Users
- Regular user: john.doe@example.com / password123
- Admin user: jane.smith@example.com / password123

### Pets
- Max (Golden Retriever)
- Luna (Siamese Cat)
- Charlie (Beagle)
- Bella (Maine Coon)

### Adoption Requests
- Approved adoption request for Max
- Pending adoption request for Luna

### Reviews
- 5-star review for Max
- 4-star review for Luna

## Model Structure

The seeding script is designed to work with the following model structures:

### User Model
```javascript
{
  name: String,
  email: String,
  password: String,
  phone: String,
  role: String (enum: ['admin', 'user']),
  address: String
}
```

### Pet Model
```javascript
{
  name: String,
  age: Number,
  breed: String,
  type: String (enum: ['Dog', 'Cat', 'Bird', 'Other']),
  description: String,
  imageUrl: String,
  gender: String (enum: ['Male', 'Female']),
  vaccinated: Boolean,
  isAdopted: Boolean,
  addedBy: ObjectId (ref: 'User')
}
```

### AdoptionRequest Model
```javascript
{
  petId: ObjectId (ref: 'Pet'),
  userId: ObjectId (ref: 'User'),
  status: String (enum: ['pending', 'approved', 'rejected']),
  notes: String,
  adminNotes: String
}
```

### Review Model
```javascript
{
  userId: ObjectId (ref: 'User'),
  petId: ObjectId (ref: 'Pet'),
  rating: Number (1-5),
  comment: String
}
```

## Customizing the Sample Data

You can modify the sample data in the `seedDatabase.js` file to add more pets, users, or change the existing data to better match your needs.

## Troubleshooting

If you encounter any issues:

1. Make sure your MongoDB Atlas connection string is correct
2. Check that your IP address is whitelisted in MongoDB Atlas
3. Verify that your username and password are correct
4. Ensure that the database user has the necessary permissions
5. If you get a "MODULE_NOT_FOUND" error, make sure all the model files exist and have the correct structure 