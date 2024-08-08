import { navigate } from 'gatsby'
import React, { useEffect } from 'react'

const useRedirectTo404 = (serverData: any) => {
    useEffect(() => {
        console.log('came in cath and redirect',serverData)
        if (serverData?.redirectTo404) {
            navigate('/404')
        }
    }, [serverData])
}

export default useRedirectTo404