const mongoose = require('mongoose');
require('dotenv').config();


export async function deleteUserByEmail(email) {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    
    // Delete the specific user by email
    await mongoose.connection.collection('playwright-test-users').deleteOne({ email });
    
    await mongoose.connection.close();
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
}

export default async function() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    // Clear the test collection
    await mongoose.connection.collection('playwright-test-users').deleteMany({});
    console.log('Cleared playwright-test-users collection');

    await mongoose.connection.close();
  } catch (error) {
    console.error('Error during cleanup:', error);
    throw error;
  }
} 