import { useEffect, useRef, useState } from "react"

export function useSearch() {
    const [query, setQuery] = useState('')
    const [error, setError] = useState<string | null>(null)
    const firstTime = useRef(true)

    useEffect(() => {
        if(firstTime.current) {
            firstTime.current = query === ''
            return
        }

        if(query === '') {
            setError("Can't find an empty movie")
            return
        }

        if(/\d/.test(query)) {
            setError("Cant' find movie with a number")
            return
          }
        
        if(query.length <= 3) {
            setError("Enter a movie with more than 3 chracters")
            return
        }
        setError(null)
    }, [query])
    return { query, setQuery, error }
}