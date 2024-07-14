'use client'

import React, { useState, useEffect } from 'react'
import { fetchDoctorData, updateDoctorData } from '../../api/DoctorApiRequests'

// MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import MenuItem from '@mui/material/MenuItem'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'

// Custom Component Import
import CustomTextField from '@core/components/mui/TextField'

const specializationOptions = ['Cardiology', 'Neurology', 'Pediatrics', 'General Surgery', 'Orthopedics']

const DoctorInfoForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    department: '',
    specialization: specializationOptions[0],
    yearsOfExperience: '',
    dutyHours: '',
    roomNumber: ''
  })

  useEffect(() => {
    const getDoctorData = async () => {
      console.log("hello")
      try {
        const result = await fetchDoctorData(4); // Assuming doctorId is 4
        setFormData({
          username: result.data.doctor_name,
          department: result.data.department,
          specialization: result.data.specialization,
          yearsOfExperience: result.data.years_of_experience,
          dutyHours: result.data.daily_hours,
          roomNumber: result.data.room_number
        })
      } catch (error) {
        console.error('Error fetching doctor data:', error)
      }
    }

    getDoctorData()
  }, [])

  const handleInputChange = e => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSpecializationChange = e => {
    const { value } = e.target
    setFormData({ ...formData, specialization: value })
  }

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      const result = await updateDoctorData(4, formData); // Assuming doctorId is 4
      console.log('Doctor details updated successfully:', result)
    } catch (error) {
      console.error('Error updating doctor details:', error)
    }
  }

  const handleReset = () => {
    setFormData({
      username: '',
      department: '',
      specialization: specializationOptions[0],
      yearsOfExperience: '',
      dutyHours: '',
      roomNumber: ''
    })
  }

  return (
    <Card>
      <CardHeader title='Your Info' />
      <Divider />
      <form onSubmit={handleSubmit}>
        <CardContent>
          <Grid container spacing={6}>
            <Grid item xs={12}>
              <Typography variant='body2' className='font-medium'>
                Doctor Information
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <CustomTextField
                fullWidth
                label='Doctor Name'
                placeholder='johnDoe'
                name='username'
                value={formData.username}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <CustomTextField
                fullWidth
                label='Department'
                placeholder='Department'
                name='department'
                value={formData.department}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <CustomTextField
                select
                fullWidth
                label='Specialization'
                name='specialization'
                value={formData.specialization}
                onChange={handleSpecializationChange}
                SelectProps={{ multiple: false }}
              >
                {specializationOptions.map(specialization => (
                  <MenuItem key={specialization} value={specialization}>
                    {specialization}
                  </MenuItem>
                ))}
              </CustomTextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <CustomTextField
                fullWidth
                label='Years of Experience'
                placeholder='Years of Experience'
                name='yearsOfExperience'
                value={formData.yearsOfExperience}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <CustomTextField
                fullWidth
                label='Duty Hours'
                placeholder='Duty Hours'
                name='dutyHours'
                value={formData.dutyHours}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <CustomTextField
                fullWidth
                label='Room Number'
                placeholder='Room Number'
                name='roomNumber'
                value={formData.roomNumber}
                onChange={handleInputChange}
              />
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <CardActions>
          <Button type='submit' variant='contained' className='mie-2'>
            Submit
          </Button>
          <Button type='button' variant='outlined' onClick={handleReset}>
            Reset
          </Button>
        </CardActions>
      </form>
    </Card>
  )
}

export default DoctorInfoForm
