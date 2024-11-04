// MUI Imports
import Stack from '@mui/material/Stack'

// Type Imports
import type { FlexxTableFinancialSummaryType } from '@/types/pages/flexxTableType'

// Style Imports
import 'bootstrap-icons/font/bootstrap-icons.css'

// Local Imports
import FlexTableHeaderCard from './FlexTableHeaderCard'

const FlexTableHeader = ({ data }: { data: FlexxTableFinancialSummaryType | null }) => {
  return (
    <Stack direction='row' flexWrap='wrap' gap={3} sx={{ padding: '1rem' }}>
      <FlexTableHeaderCard checked title='Payments' amount={data?.payments ?? 0} />
      <FlexTableHeaderCard title='Pending Payments' amount={data?.pending_payments ?? 0} />
      <FlexTableHeaderCard checked title='Payouts' amount={data?.payouts ?? 0} />
      <FlexTableHeaderCard title='Pending Payouts' amount={data?.pending_payouts ?? 0} />
    </Stack>
  )
}

export default FlexTableHeader
