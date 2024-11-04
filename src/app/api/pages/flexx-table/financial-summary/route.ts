// Next Imports
import { NextResponse } from 'next/server'

// Data Imports
import { data } from '@/app/api/fake-db/pages/flexx-table/financial-summary'

export async function GET() {
  return NextResponse.json(data)
}
