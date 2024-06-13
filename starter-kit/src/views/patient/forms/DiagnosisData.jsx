// React Import
'use client'
import { useState } from 'react'

// MUI Imports
import List from '@mui/material/List'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import ListItem from '@mui/material/ListItem'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import MenuItem from '@mui/material/MenuItem'
import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'
import Box from '@mui/material/Box'
import Select from '@mui/material/Select'

// Third-party Imports
import { useDropzone } from 'react-dropzone'

// FileUploaderMultiple Component
const FileUploaderMultiple = () => {
  // States
  const [files, setFiles] = useState([])

  // Hooks
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: acceptedFiles => {
      setFiles(acceptedFiles.map(file => Object.assign(file)))
    }
  })

  const renderFilePreview = file => {
    if (file.type.startsWith('image')) {
      return <img width={38} height={38} alt={file.name} src={URL.createObjectURL(file)} />
    } else {
      return <i className='tabler-file-description' />
    }
  }

  const handleRemoveFile = file => {
    const uploadedFiles = files
    const filtered = uploadedFiles.filter(i => i.name !== file.name)

    setFiles([...filtered])
  }

  const fileList = files.map(file => (
    <ListItem key={file.name}>
      <div className='file-details'>
        <div className='file-preview'>{renderFilePreview(file)}</div>
        <div>
          <Typography className='file-name'>{file.name}</Typography>
          <Typography className='file-size' variant='body2'>
            {Math.round(file.size / 100) / 10 > 1000
              ? `${(Math.round(file.size / 100) / 10000).toFixed(1)} mb`
              : `${(Math.round(file.size / 100) / 10).toFixed(1)} kb`}
          </Typography>
        </div>
      </div>
      <IconButton onClick={() => handleRemoveFile(file)}>
        <i className='tabler-x text-xl' />
      </IconButton>
    </ListItem>
  ))

  const handleRemoveAllFiles = () => {
    setFiles([])
  }

  return (
    <>
      <div {...getRootProps({ className: 'dropzone' })}>
        <input {...getInputProps()} />
        <div className='flex items-center flex-col'>
          <Avatar variant='rounded' className='bs-12 is-12 mbe-9'>
            <i className='tabler-upload' />
          </Avatar>
          <Typography variant='h4' className='mbe-2.5'>
            Drop files here or click to upload.
          </Typography>
          <Typography>
            Drop files here or click{' '}
            <a href='/' onClick={e => e.preventDefault()} className='text-textPrimary no-underline'>
              browse
            </a>{' '}
            thorough your machine
          </Typography>
        </div>
      </div>
      {files.length ? (
        <>
          <List>{fileList}</List>
          <div className='buttons'>
            <Button color='error' variant='outlined' onClick={handleRemoveAllFiles}>
              Remove All
            </Button>
            <Button variant='contained'>Upload Files</Button>
          </div>
        </>
      ) : null}
    </>
  )
}

// Main Component
const DiagnosisForm = () => {
  // States
  const [value, setValue] = useState('upload')
  const [fileType, setFileType] = useState('')

  const handleTabChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <Box>
      <Tabs value={value} onChange={handleTabChange} aria-label='Upload Tabs'>
        <Tab label='Upload' value='upload' />
        <Tab label='Upload History' value='upload_history' />
      </Tabs>
      {value === 'upload' && (
        <Box p={3}>
          <Typography variant='h6'>Upload Diagnostic Report</Typography>
          <Select
            fullWidth
            value={fileType}
            onChange={e => setFileType(e.target.value)}
            displayEmpty
            inputProps={{ 'aria-label': 'Select File Type' }}
          >
            <MenuItem value='' disabled>
              Select File Type
            </MenuItem>
            <MenuItem value='blood_test'>Blood Test</MenuItem>
            <MenuItem value='xray'>X-Ray</MenuItem>
            <MenuItem value='ecg'>ECG</MenuItem>
            <MenuItem value='mri'>MRI</MenuItem>
          </Select>
          <FileUploaderMultiple />
        </Box>
      )}
      {value === 'upload_history' && (
        <Box p={3}>
          <Typography variant='h6'>Upload History</Typography>
          <List>
            <ListItem>
              <Typography variant='body1'>Blood Test - Report1.pdf</Typography>
            </ListItem>
            <ListItem>
              <Typography variant='body1'>X-Ray - Report2.pdf</Typography>
            </ListItem>
            <ListItem>
              <Typography variant='body1'>ECG - Report3.pdf</Typography>
            </ListItem>
            <ListItem>
              <Typography variant='body1'>MRI - Report4.pdf</Typography>
            </ListItem>
          </List>
        </Box>
      )}
    </Box>
  )
}

export default DiagnosisForm
