import axios, { InternalAxiosRequestConfig } from 'axios';

// Create axios instance with base URL
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to add auth token to requests
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: any) => {
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  register: async (userData: any) => {
    const response = await api.post('/users/register', userData);
    return response.data;
  },
  login: async (credentials: { email: string; password: string }) => {
    const response = await api.post('/users/login', credentials);
    return response.data;
  },
  getProfile: async () => {
    const response = await api.get('/users/profile');
    return response.data;
  },
};

// Pets API
export const petsAPI = {
  getAllPets: async () => {
    const response = await api.get('/pets');
    return response.data;
  },
  getPetById: async (id: string) => {
    const response = await api.get(`/pets/${id}`);
    return response.data;
  },
  createPet: async (petData: any) => {
    const response = await api.post('/pets', petData);
    return response.data;
  },
  updatePet: async (id: string, petData: any) => {
    const response = await api.put(`/pets/${id}`, petData);
    return response.data;
  },
  deletePet: async (id: string) => {
    const response = await api.delete(`/pets/${id}`);
    return response.data;
  },
};

// Adoption API
export const adoptionAPI = {
  createAdoptionRequest: async (petId: string, adoptionData: { notes: string }) => {
    try {
      const response = await api.post(`/adoptions/${petId}`, adoptionData);
      return response.data;
    } catch (error: any) {
      if (error.response?.status === 404) {
        throw new Error('Pet not found');
      } else if (error.response?.status === 400) {
        throw new Error(error.response.data.error || 'Invalid request');
      } else {
        throw error;
      }
    }
  },
  getAdoptionRequests: async () => {
    const response = await api.get('/adoptions');
    return response.data;
  },
  updateAdoptionStatus: async (id: string, status: string, adminNotes?: string) => {
    const response = await api.put(`/adoptions/${id}/status`, { status, adminNotes });
    return response.data;
  },
};

// Reviews API
export const reviewsAPI = {
  createReview: async (petId: string, reviewData: { rating: number; comment: string }) => {
    const response = await api.post(`/reviews/${petId}`, reviewData);
    return response.data;
  },
  getPetReviews: async (petId: string) => {
    const response = await api.get(`/reviews/pet/${petId}`);
    return response.data;
  },
  updateReview: async (id: string, reviewData: { rating: number; comment: string }) => {
    const response = await api.put(`/reviews/${id}`, reviewData);
    return response.data;
  },
  deleteReview: async (id: string) => {
    const response = await api.delete(`/reviews/${id}`);
    return response.data;
  },
};

// Lost and Found Pets API
export const lostFoundPetsAPI = {
  // Get all lost and found pets with optional filters
  getAll: async (params?: {
    status?: 'lost' | 'found';
    type?: 'dog' | 'cat' | 'other';
    breed?: string;
    city?: string;
    state?: string;
    isResolved?: boolean;
    page?: number;
    limit?: number;
  }) => {
    const response = await api.get('/lost-found-pets', { params });
    return response.data;
  },

  // Get a single lost or found pet by ID
  getById: async (id: string) => {
    const response = await api.get(`/lost-found-pets/${id}`);
    return response.data;
  },

  // Create a new lost or found pet entry
  create: async (data: {
    name: string;
    type: 'dog' | 'cat' | 'other';
    breed: string;
    color: string;
    age: number;
    gender: 'male' | 'female' | 'unknown';
    status: 'lost' | 'found';
    location: {
      street?: string;
      city: string;
      state: string;
      zipCode?: string;
    };
    dateLastSeen: Date;
    description: string;
    imageUrl?: string;
    contactInfo: {
      name: string;
      phone: string;
      email: string;
    };
  }) => {
    const response = await api.post('/lost-found-pets', data);
    return response.data;
  },

  // Update an existing lost or found pet entry
  update: async (id: string, data: Partial<{
    name: string;
    type: 'dog' | 'cat' | 'other';
    breed: string;
    color: string;
    age: number;
    gender: 'male' | 'female' | 'unknown';
    status: 'lost' | 'found';
    location: {
      street?: string;
      city: string;
      state: string;
      zipCode?: string;
    };
    dateLastSeen: Date;
    description: string;
    imageUrl?: string;
    contactInfo: {
      name: string;
      phone: string;
      email: string;
    };
  }>) => {
    const response = await api.put(`/lost-found-pets/${id}`, data);
    return response.data;
  },

  // Mark a lost or found pet as resolved
  resolve: async (id: string) => {
    const response = await api.patch(`/lost-found-pets/${id}/resolve`);
    return response.data;
  },

  // Delete a lost or found pet entry
  delete: async (id: string) => {
    const response = await api.delete(`/lost-found-pets/${id}`);
    return response.data;
  },
};

export default api; 