import { useEffect, useState } from "react";
import { Alert } from "react-native";

const useAppwrite = (func: any) => {
    const [data, setData] = useState([] as Document[]);
      const [isLoading, setIsLoading] = useState(true)
      const fetchData = async () => {
        setIsLoading(true)
        try{
          const response = await func()
          setData(response)
        }
        catch(err: any){
          Alert.alert('Error', err.message)
        }
        finally{
          setIsLoading(false)
        }
      }
      useEffect(() => {
        fetchData()
      }, [])
      const refetch = () => fetchData()
      return {data, isLoading, refetch}
}


export default useAppwrite;
