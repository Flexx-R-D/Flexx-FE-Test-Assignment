import { useCallback, useEffect, useState } from 'react'

export const useParallelRequests = <T>(urls: string[]) => {
  // States
  const [data, setData] = useState<T | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)

  // Function to fetch non-cached data
  const fetchData = useCallback(async () => {
    try {
      const responses = await Promise.all(urls.map(url => fetch(url)))
      const data = await Promise.all(responses.map(response => response.json()))

      if (data.some(item => item === null)) {
        // if one of the responses is null (there's an error)
        throw new Error('Failed to fetch data')
      }

      const key = JSON.stringify(urls)
      const value = JSON.stringify(data)
      localStorage.setItem(key, value) // cache (remember) the result

      setData(data as T)
    } catch (error) {
      setIsError(true)
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Effects
  useEffect(() => {
    // check if data is cached
    const key = JSON.stringify(urls)
    const cachedData = localStorage.getItem(key)

    if (cachedData) {
      const parsedData = JSON.parse(cachedData) as T
      setData(parsedData)
      setIsLoading(false)
    } else {
      fetchData()
    }

    // run only on component mount
  }, [])

  return { data, isLoading, isError, refetch: fetchData }
}
