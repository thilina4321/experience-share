import { useCallback, useState } from "react"

export const useHttp = ()=>{
    const [data, setData] = useState()
    const [loading, setLoading] = useState()
    const [error, setError] = useState()
    const [success, setSuccess] = useState()

    const sendRequest =  useCallback( async({url, method, body}, applyData)=>{
        setLoading(true)
        const response = await fetch(url, {
            method: method ? method : 'GET',
            body:body? JSON.stringify(body) : null,
            headers: {'Content-Type':'application/json'},
            
        })
        
        
        setLoading(false)
        if(!response.ok){
            console.log(response);
            setError('Something went wrong')
            return
        }

        const fetchData = await response.json()
        console.log(fetchData);
        setData(fetchData)
        setSuccess('Request succeed')
        if(applyData){

            console.log('mchn');
            applyData(fetchData)
        }
    }, [])

    return {
        sendRequest,
        loading,
        error,
        data,
        success
    }
}