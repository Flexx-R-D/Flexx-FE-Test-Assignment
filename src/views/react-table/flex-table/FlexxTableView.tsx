'use client'

// MUI Imports
import Card from '@mui/material/Card'
import CircularProgress from '@mui/material/CircularProgress'
import Alert from '@mui/material/Alert'
import AlertTitle from '@mui/material/AlertTitle'

// Local Imports
import FlexTableContent from './components/flex-table-content/FlexTableContent'
import FlexTableHeader from './components/flex-table-header/FlexTableHeader'

// Type Imports
import { FlexxTableFinancialSummaryType, FlexxTableType } from '@/types/pages/flexxTableType'

// Custom Hook Imports
import { useParallelRequests } from './hooks'

// Constants Imports
import { FLEX_TABLE_URL, FLEX_TABLE_FINANCIAL_SUMMARY_URL } from './constants'

// Style Imports
import './style.css'

const FlexxTableView = () => {
  const { data, isLoading, isError } = useParallelRequests<[FlexxTableType[], FlexxTableFinancialSummaryType]>([
    FLEX_TABLE_URL,
    FLEX_TABLE_FINANCIAL_SUMMARY_URL
  ])

  if (isLoading) {
    return (
      <div className='p-8 text-center'>
        <CircularProgress />
      </div>
    )
  }

  if (isError) {
    return (
      <Alert severity='error'>
        <AlertTitle>Error</AlertTitle>
        Something went wrong
      </Alert>
    )
  }

  if (!data) {
    return <Alert severity='error'>No data</Alert>
  }

  const [tableData, financialSummaryData] = data

  return (
    <Card>
      <FlexTableHeader data={financialSummaryData} />
      <FlexTableContent data={tableData} />
    </Card>
  )
}

export default FlexxTableView
