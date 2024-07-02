import React, { useEffect, useState } from 'react'

const useUnloadMinHeight = () => {
  const [removeMinHeight,setRemoveMinHeight] = useState(true)

  useEffect(() => {
    let x = setTimeout(() => {
      setRemoveMinHeight(false)
    }, 2000);

    return () => {
      clearTimeout(x)
    }
  }, [])
  return (removeMinHeight)
}

export default useUnloadMinHeight