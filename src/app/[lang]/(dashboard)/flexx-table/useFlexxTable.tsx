'use client';

// Next Imports

import Link from 'next/link'

// MUI Imports
import { useParams } from 'next/navigation';

import Typography from '@mui/material/Typography'

// Component imports
import { createColumnHelper } from '@tanstack/react-table'

import { Checkbox, IconButton, Tooltip } from '@mui/material';

import classnames from 'classnames'

import type { FlexxTableType } from '@/types/pages/flexxTableType'
import { getLocalizedUrl } from '@/utils/i18n'
import OptionMenu from '@/@core/components/option-menu';
import CustomAvatar from '@/@core/components/mui/Avatar';
import type { ThemeColor } from '@/@core/types';

type InvoiceStatusObj = {
  [key: string]: {
    icon: string
    color: ThemeColor
  }
}

export const useFlexxTable = () => {
  const { lang: locale } = useParams()

  const invoiceStatusObj: InvoiceStatusObj = {
    Sent: { color: 'secondary', icon: 'ri-send-plane-2-line' },
    Paid: { color: 'success', icon: 'ri-check-line' },
    Draft: { color: 'primary', icon: 'ri-mail-line' },
    'Partial Payment': { color: 'warning', icon: 'ri-pie-chart-2-line' },
    'Past Due': { color: 'error', icon: 'ri-information-line' },
    Downloaded: { color: 'info', icon: 'ri-arrow-down-line' }
  }

  const columnHelper = createColumnHelper<FlexxTableType>()

  const columns = [

    columnHelper.accessor('id', {
      enableColumnFilter: false,
      enableSorting: false,
      header: ({ table }) => (
        <Checkbox
          {...{
            checked: table.getIsAllRowsSelected(),
            indeterminate: table.getIsSomeRowsSelected(),
            onChange: table.getToggleAllRowsSelectedHandler()
          }}
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          {...{
            checked: row.getIsSelected(),
            disabled: !row.getCanSelect(),
            indeterminate: row.getIsSomeSelected(),
            onChange: row.getToggleSelectedHandler()
          }}
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
      header: 'Amount',
      cell: ({ row }) => <Typography>{`$${row.original.amount}`}</Typography>
    }),
    columnHelper.accessor('method', {
      cell: info => info.getValue(),
      header: 'Method'
    }),
    columnHelper.accessor('status', {
      header: 'Status',
      cell: ({ row }) => (
        <Tooltip
          title={
            <div>
              <Typography variant='body2' component='span' className='text-inherit'>
                {row.original.status}
              </Typography>
              <br />
              <Typography variant='body2' component='span' className='text-inherit'>
                Balance:
              </Typography>{' '}
              {row.original.amount}
              <br />
              <Typography variant='body2' component='span' className='text-inherit'>
                Due Date:
              </Typography>{' '}
            </div>
          }
        >
          <CustomAvatar skin='light' color={invoiceStatusObj[row.original?.invoiceStatus]?.color} size={28}>
            <i className={classnames('bs-4 is-4', invoiceStatusObj[row.original?.invoiceStatus]?.icon)} />
          </CustomAvatar>
        </Tooltip>
      )
    }),
    columnHelper.accessor('tasks', {
      cell: info => info.getValue(),
      header: 'Tasks'
    }),
    columnHelper.accessor('action', {
      header: 'Action',
      cell: ({ row }) => (
        <div className='flex items-center'>
          <IconButton>
            <i className='ri-delete-bin-7-line text-[22px] text-textSecondary' />
          </IconButton>
          <IconButton>
            <Link

              href={getLocalizedUrl(`apps/invoice/preview/${row.original.id}`, locale as Locale)}
              className='flex'
            >
              <i className='ri-eye-line text-[22px] text-textSecondary' />
            </Link>
          </IconButton>
          <OptionMenu
            iconClassName='text-[22px] text-textSecondary'
            options={[
              {
                text: 'Download',
                icon: 'ri-download-line text-[22px]',
                menuItemProps: { className: 'flex items-center gap-2 text-textSecondary' }
              },
              {
                text: 'Edit',
                icon: 'ri-pencil-line text-[22px]',

                href: getLocalizedUrl(`apps/invoice/edit/${row.original.id}`, locale as Locale),
                linkProps: {
                  className: 'flex items-center is-full plb-2 pli-4 gap-2 text-textSecondary'
                }
              },
              {
                text: 'Duplicate',
                icon: 'ri-file-copy-line text-[22px]',
                menuItemProps: { className: 'flex items-center gap-2 text-textSecondary' }
              }
            ]}
          />
        </div>
      ),
      enableSorting: false
    })
  ];

  const defaultData = [
    {
      transaction_id: '00001',
      policy_holder: "Company A",
      amount: 16500,
      method: 'TBD',
      status: 'Past Due',
      tasks: 'Upcoming: 2',
      balance: 0,
      dueDate: ''
    },
    {
      transaction_id: '00002',
      policy_holder: "Company B",
      amount: 10500,
      method: 'IBD',
      status: 'Past Due',
      tasks: 'Upcoming: 1',
      balance: 0,
      dueDate: ''
    },
  ];

  return {
    defaultData,
    columns,
  }
};
