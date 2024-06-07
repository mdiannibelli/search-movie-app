import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import type { MovieResponse } from "../interfaces/movie-response"
import { Movie } from "../interfaces/movies"

interface Props {
    search: string
    sort: boolean
}

export function useGetMovies({search, sort}: Props) {
    const [responseMovies, setResponseMovies] = useState<Movie[]>([])
    const [loading, setLoading] = useState(false)
    const previousSearch = useRef(search) // Do not repeat a search


    const getMovies = useCallback(async(search:string) => {
        if(previousSearch.current === search) return
        try {
            setLoading(true)
            previousSearch.current = search
            const res = await fetch(`${import.meta.env.VITE_MOVIE_ENDPOINT}${import.meta.env.VITE_API_KEY}&s=${search}`)
            const data = await res.json()
            const { Search } = data 
    
            if(!res) throw new Error("Error at fetching to API")
            const mappedMovies = Search?.map((movie:MovieResponse) => ({
                id: movie.imdbID,
                title: movie.Title,
                poster: movie.Poster,
                year: movie.Year,
                type: movie.Type
            }))
            if(mappedMovies) {
                setResponseMovies(mappedMovies)
            }
            setLoading(false)
        } catch (error) {
            console.log(error)
        }
    }, [])

    useEffect(() => {
        if(search) {
            getMovies(search)
        }
    }, [search])

    const sortedMovies = useMemo(() => {
        return sort ? [...responseMovies].sort((a,b) => a.title.localeCompare(b.title)) : responseMovies
    }, [sort, responseMovies])

    return {movies:sortedMovies, getMovies, loading }
}