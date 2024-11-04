// MUI Imports
import Checkbox from '@mui/material/Checkbox'
import Stack from '@mui/material/Stack'
import IconButton from '@mui/material/IconButton'
import Chip from '@mui/material/Chip'

// Third-party Imports
import { createColumnHelper } from '@tanstack/react-table'

// Style Imports
import 'bootstrap-icons/font/bootstrap-icons.css'

// Type Imports
import type { FlexxTableType } from '@/types/pages/flexxTableType'

// Column Definitions
const columnHelper = createColumnHelper<FlexxTableType>()

export const columns = [
  columnHelper.display({
    id: 'select-column',
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllRowsSelected()}
        indeterminate={table.getIsSomeRowsSelected()}
        onChange={table.getToggleAllRowsSelectedHandler()} // or getToggleAllPageRowsSelectedHandler
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        disabled={!row.getCanSelect()}
        onChange={row.getToggleSelectedHandler()}
      />
    )
  }),
  columnHelper.accessor('transaction_id', {
    cell: info => info.getValue(),
    header: 'Transaction'
  }),
  columnHelper.accessor('policy_holder', {
    cell: info => info.getValue(),
    header: 'Policyholder'
  }),
  columnHelper.accessor('amount', {
    cell: info => {
      const amount = info.getValue()

      return amount.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 })
    },
    header: 'Amount'
  }),
  columnHelper.accessor('method', {
    cell: info => info.getValue(),
    header: 'Method'
  }),
  columnHelper.accessor('status', {
    cell: info => {
      const status = info.getValue()

      const completedGradient = 'radial-gradient(circle, rgba(207,229,193,1) 0%, rgba(227,219,248,1) 100%)'
      const pendingGradient = 'radial-gradient(circle, rgba(238,219,177,1) 0%, rgba(219,205,246,1) 100%)'
      const processingGradient = 'radial-gradient(circle, rgba(219,238,177,1) 0%, rgba(246,219,227,1) 100%)'
      const declinedGradient = 'radial-gradient(circle, rgba(238,177,207,1) 0%, rgba(246,219,219,1) 100%)'

      const getBackground = () => {
        switch (status) {
          case 'Completed':
            return completedGradient
          case 'Pending':
            return pendingGradient
          case 'Processing':
            return processingGradient
          case 'Declined':
            return declinedGradient
        }
      }

      return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Chip
            label={status}
            sx={{
              background: getBackground(),
              color: 'white',
              width: '100%'
            }}
          />
        </div>
      )
    },
    header: () => <div style={{ textAlign: 'center', width: '100%' }}>Status</div>
  }),
  columnHelper.display({
    id: 'tasks',
    cell: info => {
      const { upcoming_task, overdue_task } = info.row.original

      const upcomingTaskCount = upcoming_task === 'None' ? 0 : 1
      const overdueTaskCount = overdue_task === 'None' ? 0 : 1

      return (
        <Stack direction='column'>
          <span>Upcoming: {upcomingTaskCount}</span>
          <span>Overdue: {overdueTaskCount}</span>
        </Stack>
      )
    },
    header: 'Tasks'
  }),
  columnHelper.display({
    id: 'actions',
    header: 'Actions',
    cell: () => (
      <Stack direction='row' alignItems='center' justifyContent='center' spacing={1}>
        <IconButton>
          <i className='bi bi-eye' />
        </IconButton>
        <IconButton>
          <i className='bi bi-pencil-square' />
        </IconButton>
      </Stack>
    )
  })
]
