import { useState,useEffect } from "react"
const useDebounce = (search:string) => {
    const [debouncedValue, setDebouncedValue] = useState<string>("")
    useEffect(() => {
        const timer = setTimeout(() => {
             setDebouncedValue(search);
        }, 500);
        return () => clearTimeout(timer)
    }, [search])
   return debouncedValue
}
export default useDebounce;