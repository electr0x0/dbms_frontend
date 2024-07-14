'use client'

import axios from 'axios';

const API_BASE_URL = "http://localhost:8000";

export const fetchDoctorData = async (doctorId) => {
    console.log('magirput')
  try {
    const response = await axios.get(`${API_BASE_URL}/api/doctor/${doctorId}/`);
    return response.data;
  } catch (error) {
    console.error('Error fetching doctor data:', error);
    throw error;
  }
};

export const updateDoctorData = async (doctorId, formData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/doctor/update/${doctorId}/`, formData);
    return response.data;
  } catch (error) {
    console.error('Error updating doctor details:', error);
    throw error;
  }
};
