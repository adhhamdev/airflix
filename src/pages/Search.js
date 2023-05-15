import { useEffect, useState } from 'react';
import Paginator from "../components/Paginator";
import VerticalList from '../components/VerticalList';

const Search = () => {
  const [results, setResults] = useState(null);
  const [searchPage, setSearchPage] = useState(1);
  const [query, setQuery] = useState('');
  const handleQuery = (ev) => {
    setQuery(ev.target.value);
  }

  useEffect(() => {
    const search = async () => {
      const searched = await fetch(`https://api.themoviedb.org/3//search/multi?api_key=08a7337c36b62d4a8a9dfafd26b3afb6&${query && `query=${query}`}&page=${searchPage}`);
      const searchedJson = await searched.json();
      setResults(searchedJson.results);
    }
    search();
  }, [query, searchPage]);

  const turnNextPage = () => {
    setSearchPage(prev => prev + 1)
  }

  const turnPrevPage = () => {
    setSearchPage(prev => prev - 1)
  }


  return (
    <div className="Search">
      <h1 className="pageTitle">Search</h1>
      <form className="search" name="search">
        <input type="text" placeholder="Search for a movie, person..." onChange={handleQuery} value={query} autoFocus required />
      </form>
      {query ? <VerticalList list={results} /> : <p className="noResults">NO RESULTS...</p>}
      {query && <Paginator prevFunc={turnPrevPage} page={searchPage} nextFunc={turnNextPage} />}
    </div>
  )
}

export default Search