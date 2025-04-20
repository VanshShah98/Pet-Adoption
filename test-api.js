const axios = require('axios');

async function testAPI() {
  try {
    console.log('Testing API connection...');
    
    // First, try to login to get a token
    const loginResponse = await axios.post('http://localhost:5000/api/users/login', {
      email: 'test@example.com',
      password: 'password123'
    });
    
    console.log('Login response:', loginResponse.data);
    const token = loginResponse.data.token;

    // Test the adoptions endpoint with authentication
    const adoptionResponse = await axios.post(
      'http://localhost:5000/api/adoptions/test-pet-id',
      { notes: 'Test adoption request' },
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    );
    
    console.log('Adoption response:', adoptionResponse.data);
  } catch (error) {
    console.error('Error:', error.message);
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Data:', error.response.data);
      console.error('Headers:', error.response.headers);
      console.error('URL:', error.response.config.url);
    }
  }
}

testAPI(); 