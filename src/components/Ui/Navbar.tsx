import { IoSearchSharp } from 'react-icons/io5'
import { PiFilmSlateThin } from 'react-icons/pi'
import { useSearch } from '../../hooks/search';

interface Props {
    setSearch: (search: string) => void;
}

const Navbar = ({setSearch}: Props) => {
  const { query, setQuery, error } = useSearch()

  const handleQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value
    if(newQuery.startsWith(' ')) return
    setQuery(newQuery)
    }

  const handleSubmit = async(e:React.FormEvent) => {
    e.preventDefault()
    setSearch(query)
  }

  return (
    <header className='w-full bg-slate-900 py-4 px-2'>
        <nav className='p-2 flex flex-col md:flex-row gap-y-4 justify-between'>
            <div className='flex items-center gap-x-2 hover:[&>a>*]:text-cyan-500'>
                <a href='/'><PiFilmSlateThin size={35} className='text-white'/></a>
                <a href='/'><h1 className='text-2xl font-semibold text-white'>Find your favourite movie</h1></a>
            </div>
            <div>
            <form onSubmit={handleSubmit} className='relative flex items-center'>
                <input 
                type="text" 
                value={query} 
                onChange={handleQuery}
                placeholder='The Avengers, Star Wars, Matrix...'
                className='bg-slate-900 w-full rounded select-none outline-none text-slate-200 px-4 py-1 text-[13px] md:w-80 border-[1px] border-slate-200 hover:border-cyan-500 duration-300'
                />
                <button type='submit' className='absolute right-2'><IoSearchSharp size={16} className='text-white'/></button>
            </form>
            {error && <span className='text-cyan-500 font-regular text-xs absolute right-4 mt-1 '>{error}</span>}
            </div>
        </nav>
    </header>
  )
}

export default Navbar
