'use client';

// Next Imports
import { useEffect, useState } from 'react'

// MUI Imports
import Grid from '@mui/material/Grid'

import FlexxTableView from '@views/react-table/FlexxTableView'
import { useFlexxTable } from './useFlexxTable';
import FlexxTableCard from './FlexxTableCard';

const Tables = () => {
  const { columns, defaultData } = useFlexxTable();

  const [data, setData] = useState(defaultData);
  const [selectedRows, setSelectedRows] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const getData = async () => {
    // Vars
    setIsLoading(true);

    const res = await fetch(`${process.env.API_URL}/apps/tableData`)

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

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <FlexxTableCard />
      </Grid>

      <Grid item xs={12}>
        {isLoading ? (
          <div>Loading...</div>
        ) : error ? (
          <div>{error}</div>
        ) : (
          <FlexxTableView
            columns={columns}
            data={data}
            rowSelection={selectedRows}
            setRowSelection={setSelectedRows}
            globalFilter={''}
            setGlobalFilter={() => { }}
          />
        )}
      </Grid>
    </Grid>
  )
}

export default Tables
