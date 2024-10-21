'use client'

import { useEffect, useState } from 'react'

// MUI Imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'
import Avatar from '@mui/material/Avatar'
import useMediaQuery from '@mui/material/useMediaQuery'
import type { Theme } from '@mui/material/styles'

// Third-party Imports
import classnames from 'classnames'

// Vars
const defaultData = [
  {
    title: 'Payments',
    subTitle: '$14,345,760',
    icon: 'ri-user-3-line'
  },
  {
    title: 'Pending Payments',
    subTitle: '$1,345,760',
    icon: 'ri-user-3-line'
  },
  {
    title: 'Payouts',
    subTitle: '$13,345,760',
    icon: 'ri-user-3-line'
  },
  {
    title: 'Pending Payouts',
    subTitle: '$1,645,760',
    icon: 'ri-user-3-line'
  }
]

const FlexxTableCard = () => {
  // Hooks
  const isBelowMdScreen = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'))
  const isBelowSmScreen = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'))

  const [data, setData] = useState(defaultData);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const getData = async () => {
    setIsLoading(true);

    const res = await fetch(`${process.env.API_URL}/apps/tableCardData`)

    if (!res.ok) {
      const errorMessage = 'Failed to fetch invoice data';

      setError(errorMessage);
      setIsLoading(false);
      throw new Error(errorMessage);
    }

    const newData = await res.json();

    setData(newData);
    setIsLoading(false);
  };

  useEffect(() => {
    // getData();
  }, []);

  if (isLoading) {
    return (
      <div>
        Loading...
      </div>
    )
  }

  if (error) {
    return <div>{error}</div>
  }

  return (
    <Card>
      <CardContent>
        <Grid container spacing={6}>
          {data.map((item, index) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={3}
              key={index}
              className='sm:[&:nth-of-type(odd)>div]:pie-6 sm:[&:nth-of-type(odd)>div]:border-ie md:[&:not(:last-child)>div]:pie-6 md:[&:not(:last-child)>div]:border-ie'
            >
              <div className='flex justify-between'>
                <div className='flex flex-col'>
                  <Typography>{item.title}</Typography>
                  <Typography variant='h4'>{item.subTitle}</Typography>
                </div>
                <Avatar variant='rounded' className='bs-[42px] is-[42px]'>
                  <i className={classnames('text-[26px]', item.icon)}></i>
                </Avatar>
              </div>
              {isBelowMdScreen && !isBelowSmScreen && index < data.length - 2 && (
                <Divider
                  className={classnames('mbs-6', {
                    'mie-6': index % 2 === 0
                  })}
                />
              )}
              {isBelowSmScreen && index < data.length - 1 && <Divider className='mbs-6' />}
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  )
}

export default FlexxTableCard
