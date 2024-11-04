// React Imports
import { FC } from 'react'

// MUI Imports
import Stack from '@mui/material/Stack'
import CardContent from '@mui/material/CardContent'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'

// Style Imports
import 'bootstrap-icons/font/bootstrap-icons.css'
import '../../style.css'

interface FlexTableHeaderCardProps {
  title: string
  amount: number
  checked?: boolean
}

const FlexTableHeaderCard: FC<FlexTableHeaderCardProps> = ({ title, amount, checked }) => {
  const formattedAmount = amount.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0
  })

  return (
    <Card sx={{ flex: 1, minWidth: '200px' }}>
      <CardContent>
        <Stack direction='row' alignItems='center' justifyContent='space-between'>
          <Typography variant='body2' sx={{ color: 'text.secondary' }}>
            {title}
          </Typography>
          {checked ? (
            <button type='button' className='header-card-button green-btn'>
              <i className='bi bi-person-plus header-card-icon green-icon' />
            </button>
          ) : (
            <button type='button' className='header-card-button purple-btn'>
              <i className='bi bi-person-check header-card-icon purple-icon' />
            </button>
          )}
        </Stack>
        <Typography gutterBottom variant='h5' component='div' sx={checked ? undefined : { color: 'text.secondary' }}>
          {formattedAmount}
        </Typography>
      </CardContent>
    </Card>
  )
}

export default FlexTableHeaderCard
