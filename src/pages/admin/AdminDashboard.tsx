import React, { useState, useEffect } from 'react';
import './admin-dashboard.css'; // Import the CSS file

type AdoptionRequest = {
  id: number;
  userName: string;
  petName: string;
  petId: string;
  status: string;
  date: string;
};

type Pet = {
  id: number;
  name: string;
  age: number;
  breed: string;
  description: string;
  imageUrl: string;
  availability: boolean;
};

const AdminDashboard = () => {
  const [adoptionRequests, setAdoptionRequests] = useState<AdoptionRequest[]>([
    { id: 1, userName: 'John Doe', petName: 'Rex', petId: '001', status: 'Pending', date: '2025-04-27' },
    { id: 2, userName: 'Jane Smith', petName: 'Bella', petId: '002', status: 'Pending', date: '2025-04-25' },
    { id: 3, userName: 'Alex Green', petName: 'Milo', petId: '003', status: 'Pending', date: '2025-04-23' }
  ]);
  const [pets, setPets] = useState<Pet[]>([]); 
  const [newPet, setNewPet] = useState<Pet>({
    id: 0,
    name: '',
    age: 0,
    breed: '',
    description: '',
    imageUrl: '',
    availability: true,
  });

  useEffect(() => {
    const fetchAdoptionRequests = async () => {
      try {
        const token = localStorage.getItem('adminToken'); // Assuming token is saved here after admin login
    
        const response = await fetch('http://localhost:5000/api/adoptions', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` // 🔥 Important: Send JWT Token
          }
        });
    
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
    
        const result = await response.json();
        console.log('Fetched data:', result);
    
        if (Array.isArray(result.data)) {
          setAdoptionRequests(result.data);
        } else {
          console.error('Data is not an array:', result);
        }
      } catch (error) {
        console.error('Error fetching adoption requests:', error);
      }
    };
  }, []);

  const updateRequestStatus = (id: number, newStatus: string) => {
    if (window.confirm(`Are you sure you want to ${newStatus.toLowerCase()} this request?`)) {
      setAdoptionRequests((prevRequests) =>
        prevRequests.map((request) =>
          request.id === id ? { ...request, status: newStatus } : request
        )
      );
    }
  };

  const handleAddPet = (e: React.FormEvent) => {
    e.preventDefault();
    setPets([...pets, { ...newPet, id: Date.now() }]);
    setNewPet({ id: 0, name: '', age: 0, breed: '', description: '', imageUrl: '', availability: true });
  };

  const handleDeletePet = (id: number) => {
    if (window.confirm('Are you sure you want to delete this pet?')) {
      setPets(pets.filter((pet) => pet.id !== id));
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminLoggedIn');
    window.location.href = '/login'; // 👈 simple redirect
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Admin Dashboard</h1>
        <button onClick={handleLogout} className="logout-button">
          Logout
        </button>
      </div>

      <div className="panel-title">Adoption Requests Panel</div>
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <table className="table">
          <thead>
            <tr>
              <th>User Name</th>
              <th>Pet Name</th>
              <th>Pet ID</th>
              <th>Status</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {adoptionRequests.map((request) => (
              <tr key={request.id}>
                <td>{request.userName}</td>
                <td>{request.petName}</td>
                <td>{request.petId}</td>
                <td>{request.status}</td>
                <td>{request.date}</td>
                <td>
                  <button onClick={() => updateRequestStatus(request.id, 'Approved')} className="button button-approve">Approve</button>
                  <button onClick={() => updateRequestStatus(request.id, 'Rejected')} className="button button-reject">Reject</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="panel-title">Pet Management Panel</div>
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <form onSubmit={handleAddPet} className="add-pet-form">
          <input
            type="text"
            placeholder="Pet Name"
            value={newPet.name}
            onChange={(e) => setNewPet({ ...newPet, name: e.target.value })}
          />
          <input
            type="number"
            placeholder="Age"
            value={newPet.age}
            onChange={(e) => setNewPet({ ...newPet, age: Number(e.target.value) })}
          />
          <input
            type="text"
            placeholder="Breed"
            value={newPet.breed}
            onChange={(e) => setNewPet({ ...newPet, breed: e.target.value })}
          />
          <input
            type="text"
            placeholder="Description"
            value={newPet.description}
            onChange={(e) => setNewPet({ ...newPet, description: e.target.value })}
          />
          <input
            type="text"
            placeholder="Image URL"
            value={newPet.imageUrl}
            onChange={(e) => setNewPet({ ...newPet, imageUrl: e.target.value })}
          />
          <label>
            <input
              type="checkbox"
              checked={newPet.availability}
              onChange={(e) => setNewPet({ ...newPet, availability: e.target.checked })}
            />
            Available
          </label>
          <button type="submit">Add Pet</button>
        </form>

        <table className="pet-table">
          <thead>
            <tr>
              <th>Pet Name</th>
              <th>Age</th>
              <th>Breed</th>
              <th>Availability</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {pets.map((pet) => (
              <tr key={pet.id}>
                <td>
                  <img src={pet.imageUrl} alt={pet.name} />
                  {pet.name}
                </td>
                <td>{pet.age}</td>
                <td>{pet.breed}</td>
                <td>{pet.availability ? 'Yes' : 'No'}</td>
                <td>
                  <button onClick={() => handleDeletePet(pet.id)} className="button button-reject">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;
