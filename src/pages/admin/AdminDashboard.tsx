import React, { useState, useEffect } from 'react';

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
  const [adoptionRequests, setAdoptionRequests] = useState<AdoptionRequest[]>([]);
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
        const response = await fetch('http://localhost:5000/api/adoption-requests');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log('Fetched data:', data);
        if (Array.isArray(data)) {
          setAdoptionRequests(data);
        } else {
          console.error('Data is not an array:', data);
        }
      } catch (error) {
        console.error('Error fetching adoption requests:', error);
      }
    };
    fetchAdoptionRequests();
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
    <div className="p-8 bg-pink-50 min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-extrabold text-pink-700">Admin Dashboard</h1>
        <button onClick={handleLogout} className="bg-pink-700 text-white px-5 py-2 rounded-lg shadow-md hover:bg-pink-800 transition duration-300">
          Logout
        </button>
      </div>

      <div className="mb-10">
        <h2 className="text-3xl mb-6 text-pink-600">Adoption Requests Panel</h2>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <table className="min-w-full">
            <thead>
              <tr className="bg-pink-100">
                <th className="px-6 py-3 text-left text-pink-600 font-semibold">User Name</th>
                <th className="px-6 py-3 text-left text-pink-600 font-semibold">Pet Name</th>
                <th className="px-6 py-3 text-left text-pink-600 font-semibold">Pet ID</th>
                <th className="px-6 py-3 text-left text-pink-600 font-semibold">Status</th>
                <th className="px-6 py-3 text-left text-pink-600 font-semibold">Date</th>
                <th className="px-6 py-3 text-left text-pink-600 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {adoptionRequests.map((request) => (
                <tr key={request.id} className="hover:bg-pink-50">
                  <td className="border-t px-6 py-4">{request.userName}</td>
                  <td className="border-t px-6 py-4">{request.petName}</td>
                  <td className="border-t px-6 py-4">{request.petId}</td>
                  <td className="border-t px-6 py-4">{request.status}</td>
                  <td className="border-t px-6 py-4">{request.date}</td>
                  <td className="border-t px-6 py-4">
                    <button onClick={() => updateRequestStatus(request.id, 'Approved')} className="bg-green-500 text-white px-3 py-1 rounded-full hover:bg-green-600 transition duration-300">Approve</button>
                    <button onClick={() => updateRequestStatus(request.id, 'Rejected')} className="bg-red-500 text-white px-3 py-1 rounded-full hover:bg-red-600 transition duration-300 ml-2">Reject</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div>
        <h2 className="text-3xl mb-6 text-pink-600">Pet Management Panel</h2>
        <div className="bg-white p-6 rounded-lg shadow-lg mb-10">
          <form onSubmit={handleAddPet} className="mb-6">
            <div className="grid grid-cols-2 gap-6">
              <input
                type="text"
                placeholder="Pet Name"
                value={newPet.name}
                onChange={(e) => setNewPet({ ...newPet, name: e.target.value })}
                className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
              <input
                type="number"
                placeholder="Age"
                value={newPet.age}
                onChange={(e) => setNewPet({ ...newPet, age: Number(e.target.value) })}
                className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
              <input
                type="text"
                placeholder="Breed"
                value={newPet.breed}
                onChange={(e) => setNewPet({ ...newPet, breed: e.target.value })}
                className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
              <input
                type="text"
                placeholder="Description"
                value={newPet.description}
                onChange={(e) => setNewPet({ ...newPet, description: e.target.value })}
                className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
              <input
                type="text"
                placeholder="Image URL"
                value={newPet.imageUrl}
                onChange={(e) => setNewPet({ ...newPet, imageUrl: e.target.value })}
                className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={newPet.availability}
                  onChange={(e) => setNewPet({ ...newPet, availability: e.target.checked })}
                  className="mr-2"
                />
                Available
              </label>
            </div>
            <button type="submit" className="mt-6 bg-pink-700 text-white p-3 rounded-lg hover:bg-pink-800 transition duration-300">Add Pet</button>
          </form>

          <table className="min-w-full">
            <thead>
              <tr className="bg-pink-100">
                <th className="px-6 py-3 text-left text-pink-600 font-semibold">Name</th>
                <th className="px-6 py-3 text-left text-pink-600 font-semibold">Age</th>
                <th className="px-6 py-3 text-left text-pink-600 font-semibold">Breed</th>
                <th className="px-6 py-3 text-left text-pink-600 font-semibold">Description</th>
                <th className="px-6 py-3 text-left text-pink-600 font-semibold">Image</th>
                <th className="px-6 py-3 text-left text-pink-600 font-semibold">Availability</th>
                <th className="px-6 py-3 text-left text-pink-600 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {pets.map((pet) => (
                <tr key={pet.id} className="hover:bg-pink-50">
                  <td className="border-t px-6 py-4">{pet.name}</td>
                  <td className="border-t px-6 py-4">{pet.age}</td>
                  <td className="border-t px-6 py-4">{pet.breed}</td>
                  <td className="border-t px-6 py-4">{pet.description}</td>
                  <td className="border-t px-6 py-4"><img src={pet.imageUrl} alt={pet.name} className="h-12 w-12 object-cover rounded-full" /></td>
                  <td className="border-t px-6 py-4">{pet.availability ? 'Yes' : 'No'}</td>
                  <td className="border-t px-6 py-4">
                    <button onClick={() => handleDeletePet(pet.id)} className="bg-red-500 text-white px-3 py-1 rounded-full hover:bg-red-600 transition duration-300">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
