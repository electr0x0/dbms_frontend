'use client'

// React Imports
import { useState } from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'
import axios from 'axios'
import Swal from 'sweetalert2'

// Next Imports
import Link from 'next/link'
import { useParams } from 'next/navigation'

// MUI Imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import Checkbox from '@mui/material/Checkbox'
import Button from '@mui/material/Button'
import FormControlLabel from '@mui/material/FormControlLabel'
import Divider from '@mui/material/Divider'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'

import { registerUser } from '../../../api/apiHandler'

// Component Imports
import Logo from '@components/layout/shared/Logo'
import CustomTextField from '@core/components/mui/TextField'

// Styled Component Imports
import AuthIllustrationWrapper from './AuthIllustrationWrapper'

// Validation Schema
const validationSchema = yup.object({
  fname: yup.string().required('First Name is required'),
  lname: yup.string().required('Last Name is required'),
  email: yup.string().email('Enter a valid email').required('Email is required'),
  password: yup.string().min(4, 'Password should be of minimum 6 characters length').required('Password is required'),
  userGroup: yup.string().required('User group is required'),
  terms: yup.bool().oneOf([true], 'You must accept the terms and conditions')
})

const RegisterV1 = () => {
  // States
  const [isPasswordShown, setIsPasswordShown] = useState(false)

  // Hooks
  const { lang: locale } = useParams()
  const handleClickShowPassword = () => setIsPasswordShown(show => !show)

  const formik = useFormik({
    initialValues: {
      fname: '',
      lname: '',
      email: '',
      password: '',
      userGroup: '',
      terms: false
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        const response = await registerUser(values)
        console.log(response)
        if (response.status === 200 || 201) {
          Swal.fire({
            icon: 'success',
            title: 'Registration Successful',
            text: 'Your account has been created successfully!'
          })
          resetForm()
        }
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Registration Failed',
          text: error.response?.data?.message || 'Something went wrong!'
        })
      }
    }
  })

  return (
    <AuthIllustrationWrapper>
      <Card className='flex flex-col sm:is-[450px]'>
        <CardContent className='sm:!p-12'>
          <div className='flex justify-center mbe-6'>
            <Logo />
          </div>
          <div className='flex flex-col gap-1 mbe-6'>
            <Typography variant='h4'>Adventure starts here 🚀</Typography>
            <Typography>Make your app management easy and fun!</Typography>
          </div>
          <form noValidate autoComplete='off' onSubmit={formik.handleSubmit} className='flex flex-col gap-6'>
            <CustomTextField
              autoFocus
              fullWidth
              label='First Name'
              name='fname'
              placeholder='Enter your First name'
              value={formik.values.fname}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.fname && Boolean(formik.errors.fname)}
              helperText={formik.touched.fname && formik.errors.fname}
            />

            <CustomTextField
              autoFocus
              fullWidth
              label='Last Name'
              name='lname'
              placeholder='Enter your Last name'
              value={formik.values.lname}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.lname && Boolean(formik.errors.lname)}
              helperText={formik.touched.lname && formik.errors.lname}
            />

            <CustomTextField
              fullWidth
              label='Email'
              name='email'
              placeholder='Enter your email'
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />

            <CustomTextField
              fullWidth
              label='Password'
              name='password'
              placeholder='············'
              type={isPasswordShown ? 'text' : 'password'}
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    <IconButton edge='end' onClick={handleClickShowPassword} onMouseDown={e => e.preventDefault()}>
                      <i className={isPasswordShown ? 'tabler-eye-off' : 'tabler-eye'} />
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
            <FormControl fullWidth>
              <InputLabel>User Group</InputLabel>
              <Select
                name='userGroup'
                value={formik.values.userGroup}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.userGroup && Boolean(formik.errors.userGroup)}
              >
                <MenuItem value='patient'>Patient</MenuItem>
                <MenuItem value='doctor'>Doctor</MenuItem>
                <MenuItem value='admin'>Admin</MenuItem>
                <MenuItem value='manager'>Manager</MenuItem>
              </Select>
              {formik.touched.userGroup && formik.errors.userGroup && (
                <Typography color='error'>{formik.errors.userGroup}</Typography>
              )}
            </FormControl>
            <FormControlLabel
              control={
                <Checkbox
                  name='terms'
                  checked={formik.values.terms}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              }
              label={
                <>
                  <span>I agree to </span>
                  <Link className='text-primary' href='/' onClick={e => e.preventDefault()}>
                    privacy policy & terms
                  </Link>
                </>
              }
            />
            {formik.touched.terms && formik.errors.terms && (
              <Typography color='error'>{formik.errors.terms}</Typography>
            )}
            <Button fullWidth variant='contained' type='submit'>
              Sign Up
            </Button>
            <div className='flex justify-center items-center flex-wrap gap-2'>
              <Typography>Already have an account?</Typography>
              <Typography component={Link} href='/login/' color='primary'>
                Sign in instead
              </Typography>
            </div>
            <Divider className='gap-2 text-textPrimary'>or</Divider>
            <div className='flex justify-center items-center gap-1.5'>
              <IconButton className='text-facebook' size='small'>
                <i className='tabler-brand-facebook-filled' />
              </IconButton>
              <IconButton className='text-twitter' size='small'>
                <i className='tabler-brand-twitter-filled' />
              </IconButton>
              <IconButton className='text-textPrimary' size='small'>
                <i className='tabler-brand-github-filled' />
              </IconButton>
              <IconButton className='text-error' size='small'>
                <i className='tabler-brand-google-filled' />
              </IconButton>
            </div>
          </form>
        </CardContent>
      </Card>
    </AuthIllustrationWrapper>
  )
}

export default RegisterV1
