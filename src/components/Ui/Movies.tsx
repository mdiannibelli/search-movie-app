import { useEffect, useState } from "react"
import { useGetMovies } from "../../hooks/getMovies"

interface Props {
    search: string
}

const Movies = ({search}: Props) => {
    const [sort, setSort] = useState(false)
    const { movies, loading, getMovies } = useGetMovies({search, sort})

    const handleSort = () => {
        setSort(!sort)
    }

    useEffect(() => {
        if(search === '') {
            const newSearch = "Spider Man"
            getMovies(newSearch)
           
        }
    }, [search])

    return (
        <section className="my-8 px-4">
            {(movies.length > 0) && <button className="text-white bg-slate-600 text-xs hover:bg-slate-400 duration-300 rounded p-1 my-4 m-1" onClick={handleSort}>Filter by A-Z</button>}
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-6 gap-x-2 gap-y-12 md:justify-items-center '>
                {
                    loading ? <span className="text-white text-2xl text-center col-span-6">Loading...</span> :
                    movies?.map((movie) => (
                            <a href="#" className="hover:animate-pulse" key={movie.id}>
                                <div>
                                    <img src={movie.poster} alt={movie.title} className='h-[420px] rounded w-72 object-cover' />
                                </div>
                                <div className='flex flex-col p-2'>
                                    <h3 className="text-white">{movie.title} ({movie.year})</h3>
                                    <span className="uppercase text-cyan-500 font-semibold">{movie.type}</span>
                                </div>
                            </a>
                        ))
                }
            </div>
        </section>
    )
}

export default Movies
