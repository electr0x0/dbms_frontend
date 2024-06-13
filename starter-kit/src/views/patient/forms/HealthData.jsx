'use client'

// React Imports
import { useState } from 'react'

// MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Tab from '@mui/material/Tab'
import MenuItem from '@mui/material/MenuItem'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import Divider from '@mui/material/Divider'
import InputAdornment from '@mui/material/InputAdornment'
import IconButton from '@mui/material/IconButton'

// Components Imports
import CustomTextField from '@core/components/mui/TextField'

// Styled Component Imports
import AppReactDatepicker from '../../../libs/styles/AppReactDatepicker'

const FormLayoutsWithTabs = () => {
  // States
  const [value, setValue] = useState('personal_info')

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    country: '',
    language: [],
    date: null,
    phoneNumber: '',
    email: '',
    bloodPressure: '',
    cholesterol: '',
    heartRate: '',
    glucoseLevel: '',
    medications: '',
    allergies: []
  })

  const handleTabChange = (event, newValue) => {
    setValue(newValue)
  }

  const handleReset = () => {
    setFormData({
      firstName: '',
      lastName: '',
      country: '',
      language: [],
      date: null,
      phoneNumber: '',
      email: '',
      bloodPressure: '',
      cholesterol: '',
      heartRate: '',
      glucoseLevel: '',
      medications: '',
      allergies: []
    })
  }

  return (
    <Card>
      <TabContext value={value}>
        <TabList variant='scrollable' onChange={handleTabChange} className='border-be'>
          <Tab label='Personal Info' value='personal_info' />
          <Tab label='Health Data' value='health_data' />
          <Tab label='Contact Info' value='contact_info' />
        </TabList>
        <form onSubmit={e => e.preventDefault()}>
          <CardContent>
            <TabPanel value='personal_info'>
              <Grid container spacing={6}>
                <Grid item xs={12} sm={6}>
                  <CustomTextField
                    fullWidth
                    label='First Name'
                    placeholder='John'
                    value={formData.firstName}
                    onChange={e => setFormData({ ...formData, firstName: e.target.value })}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <CustomTextField
                    fullWidth
                    label='Last Name'
                    placeholder='Doe'
                    value={formData.lastName}
                    onChange={e => setFormData({ ...formData, lastName: e.target.value })}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <CustomTextField
                    select
                    fullWidth
                    label='Country'
                    value={formData.country}
                    onChange={e => setFormData({ ...formData, country: e.target.value })}
                  >
                    <MenuItem value=''>Select Country</MenuItem>
                    <MenuItem value='BD'>Bangladesh</MenuItem>
                    <MenuItem value='Saudi'>Saudi Arabia</MenuItem>
                    <MenuItem value='IN'>India</MenuItem>
                    <MenuItem value='PK'>Pakistan</MenuItem>
                  </CustomTextField>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <CustomTextField
                    select
                    fullWidth
                    label='Language'
                    value={formData.language}
                    SelectProps={{
                      multiple: true,
                      onChange: e => setFormData({ ...formData, language: e.target.value })
                    }}
                  >
                    <MenuItem value='English'>English</MenuItem>
                    <MenuItem value='Bangla'>Bangla</MenuItem>
                  </CustomTextField>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <AppReactDatepicker
                    selected={formData.date}
                    showYearDropdown
                    showMonthDropdown
                    onChange={date => setFormData({ ...formData, date })}
                    placeholderText='MM/DD/YYYY'
                    customInput={<CustomTextField fullWidth label='Birth Date' placeholder='MM-DD-YYYY' />}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <CustomTextField
                    fullWidth
                    label='Phone Number'
                    type='number'
                    placeholder='123-456-7890'
                    value={formData.phoneNumber}
                    onChange={e => setFormData({ ...formData, phoneNumber: e.target.value })}
                  />
                </Grid>
              </Grid>
            </TabPanel>
            <TabPanel value='health_data'>
              <Grid container spacing={6}>
                <Grid item xs={12} sm={6}>
                  <CustomTextField
                    fullWidth
                    label='Blood Pressure'
                    placeholder='120/80 mmHg'
                    value={formData.bloodPressure}
                    onChange={e => setFormData({ ...formData, bloodPressure: e.target.value })}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <CustomTextField
                    fullWidth
                    label='Cholesterol'
                    placeholder='200 mg/dL'
                    value={formData.cholesterol}
                    onChange={e => setFormData({ ...formData, cholesterol: e.target.value })}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <CustomTextField
                    fullWidth
                    label='Heart Rate'
                    placeholder='70 bpm'
                    value={formData.heartRate}
                    onChange={e => setFormData({ ...formData, heartRate: e.target.value })}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <CustomTextField
                    fullWidth
                    label='Glucose Level'
                    placeholder='90 mg/dL'
                    value={formData.glucoseLevel}
                    onChange={e => setFormData({ ...formData, glucoseLevel: e.target.value })}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <CustomTextField
                    fullWidth
                    label='Medications'
                    placeholder='List of current medications'
                    value={formData.medications}
                    onChange={e => setFormData({ ...formData, medications: e.target.value })}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <CustomTextField
                    select
                    fullWidth
                    label='Allergies'
                    value={formData.allergies}
                    SelectProps={{
                      multiple: true,
                      onChange: e => setFormData({ ...formData, allergies: e.target.value })
                    }}
                  >
                    <MenuItem value='Peanut'>Peanut</MenuItem>
                    <MenuItem value='Dhon'>Dhon</MenuItem>
                  </CustomTextField>
                </Grid>
              </Grid>
            </TabPanel>
            <TabPanel value='contact_info'>
              <Grid container spacing={6}>
                <Grid item xs={12} sm={6}>
                  <CustomTextField
                    fullWidth
                    type='email'
                    label='Email'
                    placeholder='johndoe@gmail.com'
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                  />
                </Grid>
              </Grid>
            </TabPanel>
          </CardContent>
          <Divider />
          <CardActions>
            <Button type='submit' variant='contained' className='mie-2'>
              Submit
            </Button>
            <Button type='reset' variant='tonal' color='secondary' onClick={() => handleReset()}>
              Reset
            </Button>
          </CardActions>
        </form>
      </TabContext>
    </Card>
  )
}

export default FormLayoutsWithTabs
