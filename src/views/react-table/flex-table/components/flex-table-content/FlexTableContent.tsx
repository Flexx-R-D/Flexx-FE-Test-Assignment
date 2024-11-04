'use client'

// React Imports
import { useState, useCallback } from 'react'

// MUI Imports
import TablePagination from '@mui/material/TablePagination'
import Alert from '@mui/material/Alert'

// Third-party Imports
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  PaginationState,
  useReactTable
} from '@tanstack/react-table'

// Style Imports
import styles from '@core/styles/table.module.css'
import 'bootstrap-icons/font/bootstrap-icons.css'

// Type Imports
import type { FlexxTableType } from '@/types/pages/flexxTableType'

// Local Imports
import { columns } from './columns'

const FlexTableContent = ({ data }: { data: FlexxTableType[] | null }) => {
  // States
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0, //initial page index
    pageSize: 10 //default page size
  })

  // Variables
  const pageCount = data?.length ?? -1
  const rowsPerPageOptions = [5, 10, 25, 50, 100]

  const table = useReactTable({
    data: data ?? [],
    columns,
    pageCount,
    state: {
      pagination
    },
    enableRowSelection: true,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(), // client-side sorting
    onPaginationChange: setPagination, //update the pagination state when internal APIs mutate the pagination state
    filterFns: {
      fuzzy: () => false
    }
  })

  // Event Handlers
  const handleChangePage = useCallback((event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPagination(prevPagination => ({ ...prevPagination, pageIndex: newPage }))
  }, [])

  const handleChangeRowsPerPage = useCallback((event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setPagination({
      pageIndex: 0,
      pageSize: parseInt(event.target.value, 10)
    })
  }, [])

  if (!data?.length) {
    return <Alert severity='info'>No data found</Alert>
  }

  return (
    <div className='overflow-x-auto'>
      <table className={styles.table}>
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th key={header.id} style={{ textTransform: 'none' }}>
                  {header.isPlaceholder ? null : (
                    <div
                      style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
                      className={header.column.getCanSort() ? 'cursor-pointer select-none' : ''}
                      onClick={header.column.getToggleSortingHandler()}
                      title={
                        header.column.getCanSort()
                          ? header.column.getNextSortingOrder() === 'asc'
                            ? 'Sort ascending'
                            : header.column.getNextSortingOrder() === 'desc'
                              ? 'Sort descending'
                              : 'Clear sort'
                          : undefined
                      }
                    >
                      {flexRender(header.column.columnDef.header, header.getContext())}
                      {{
                        asc: <i className='bi bi-arrow-up' />,
                        desc: <i className='bi bi-arrow-down' />
                      }[header.column.getIsSorted() as string] ?? null}
                    </div>
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map(row => (
            <tr key={row.id}>
              {row.getVisibleCells().map(cell => (
                <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <TablePagination
        component='div'
        count={pageCount}
        page={pagination.pageIndex}
        onPageChange={handleChangePage}
        rowsPerPage={pagination.pageSize}
        rowsPerPageOptions={rowsPerPageOptions}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  )
}

export default FlexTableContent
