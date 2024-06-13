'use client'

import React, { useEffect, useState, useMemo } from 'react'

import {
  createColumnHelper,
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel
} from '@tanstack/react-table'
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Typography,
  Button,
  TablePagination,
  Checkbox,
  MenuItem
} from '@mui/material'

import TablePaginationComponent from '@components/TablePaginationComponent'
import PatientTableFilter from './PatientTableFilter'
import CustomTextField from '@core/components/mui/TextField'
import { getInitials } from '@/utils/getInitials'
import CustomAvatar from '@core/components/mui/Avatar'

const columnHelper = createColumnHelper()

const PatientListTable = ({ tableData }) => {
  const [data, setData] = useState(tableData || [])
  const [globalFilter, setGlobalFilter] = useState('')
  const [rowSelection, setRowSelection] = useState({})

  const columns = useMemo(
    () => [
      columnHelper.accessor('fullName', {
        header: 'Name',
        cell: info => info.row.original.fullName
      }),
      columnHelper.accessor('age', {
        header: 'Age',
        cell: info => info.row.original.age
      }),
      columnHelper.accessor('gender', {
        header: 'Gender',
        cell: info => info.row.original.gender
      }),
      columnHelper.accessor('contact', {
        header: 'Contact',
        cell: info => info.row.original.contact
      }),
      columnHelper.accessor('address', {
        header: 'Address',
        cell: info => info.row.original.address
      }),
      columnHelper.accessor('diagnosis', {
        header: 'Diagnosis',
        cell: info => info.row.original.diagnosis
      }),
      columnHelper.accessor('doctor', {
        header: 'Doctor',
        cell: info => info.row.original.doctor
      }),
      columnHelper.accessor('status', {
        header: 'Status',
        cell: info => info.row.original.status
      }),
      columnHelper.accessor('admissionDate', {
        header: 'Admission Date',
        cell: info => info.row.original.admissionDate
      })
    ],
    []
  )

  const table = useReactTable({
    data,
    columns,
    state: {
      rowSelection,
      globalFilter
    },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onRowSelectionChange: setRowSelection,
    onGlobalFilterChange: setGlobalFilter
  })

  return (
    <Card>
      <CardHeader title='Patient List' />
      <PatientTableFilter setData={setData} tableData={tableData} />
      <CardContent>
        <table>
          <thead>
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <th key={header.id}>
                    {header.isPlaceholder ? null : (
                      <div onClick={header.column.getToggleSortingHandler()}>
                        {typeof header.column.columnDef.header === 'function'
                          ? header.column.columnDef.header()
                          : header.column.columnDef.header}
                        {header.column.getIsSorted() ? (header.column.getIsSorted() === 'desc' ? ' 🔽' : ' 🔼') : ''}
                      </div>
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.length > 0 ? (
              table.getRowModel().rows.map(row => (
                <tr key={row.id}>
                  {row.getVisibleCells().map(cell => (
                    <td key={cell.id}>{cell.value}</td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length} className='text-center'>
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </CardContent>
      <TablePagination
        component={() => <TablePaginationComponent table={table} />}
        count={table.getFilteredRowModel().rows.length}
        rowsPerPage={table.getState().pagination.pageSize}
        page={table.getState().pagination.pageIndex}
        onPageChange={(_, page) => {
          table.setPageIndex(page)
        }}
      />
      <CardActions>
        <Button variant='contained'>Add New Patient</Button>
      </CardActions>
    </Card>
  )
}

export default PatientListTable
