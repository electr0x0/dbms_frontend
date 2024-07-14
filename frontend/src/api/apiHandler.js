'use client'

import axios from 'axios'

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000',
  headers: {
    'Content-Type': 'application/json',
  },
})

export const registerUser = async (userData) => {
  const djangoUserTest = {
      "username": userData.email,
      "email": userData.email,
      "first_name": userData.fname,
      "last_name": userData.lname,
      "password" : userData.password
  }

  return apiClient.post('/api/register/', djangoUserTest)
}
