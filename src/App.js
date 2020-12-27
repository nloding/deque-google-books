import { useState } from 'react'
import { Table } from './components/Tables'

const App = () => {
  const [term, setTerm] = useState('')
  const [results, setResults] = useState([])
  const [page, setPage] = useState(1)

  const columns = [
    { name: 'Author(s)', path: 'authors' },
    { name: 'Title', path: 'title' },
    { name: 'Action' }
  ]

  const search = (term, page) => {
    const startIndex = page === 1
      ? 1
      : page * 10 + 1

    const timer = new Date().getTime()
    
    fetch(`https://www.googleapis.com/books/v1/volumes?q=${term}&startIndex=${startIndex}&maxResults=10&key=${process.env.REACT_APP_GOOGLE_BOOKS_API_KEY}`)
      .then(response => response.json())
      .then(response => {
        
        const result = { 
          responseTime: (new Date().getTime() - timer), 
          total: response.totalItems, 
          data: [],
          earliestPublication: null,
          mostRecentPublication: null,
          mostCommonAuthor: null
        }

        result.data = response.items.map((item) => {
          const { volumeInfo: { authors, description, title } } = item
          return {
            description,
            title,
            authors: authors ? authors.join(', ') : 'Unknown'
          }
        })

        // none of this is O(n)
        const sortedByPublicationDate = response.items.sort((a, b) => Date.parse(a.volumeInfo.publishedDate) > Date.parse(b.volumeInfo.publishedDate))
        result.earliestPublication = sortedByPublicationDate.shift().volumeInfo.publishedDate
        result.mostRecentPublication = sortedByPublicationDate.pop().volumeInfo.publishedDate
        
        // this isn't O(n) either
        // get array of all authors
        const authors = response.items
          .reduce((a, i) => a.concat(i.volumeInfo.authors), [])
        // filter by occurrence
        const sortedAuthors = authors.sort((a, b) => (
          authors.filter((x) => x === a).length - authors.filter((x) => x === b).length
        ))
        result.mostCommonAuthor = sortedAuthors.pop()

        setResults(result)
      })
  }

  const handleSearch = (event) => {
    event.preventDefault()

    // todo: clean the input?

    search(term, 1)
  }

  const handlePageChange = (newPage) => {
    setPage(newPage)
    search(term, newPage)
  }

  return (
    <div className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">Deque Technical Test</h2>
        </div>
        <div className="mt-5 md:mt-0 md:col-span-2">
          <form onSubmit={handleSearch} action="#" method="POST">
            <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
              <div className="grid grid-cols-3 gap-6">
                <div className="col-span-3 sm:col-span-2">
                  <label htmlFor="search" className="block text-sm font-medium text-gray-700">
                    Search Books
                  </label>
                  <div className="mt-1 flex">
                    <input 
                      type="text" 
                      name="search" 
                      id="search" 
                      className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full sm:text-sm border border-gray-300"
                      value={term}
                      onChange={(event) => setTerm(event.target.value)}
                    />
                  </div>
                </div>
                <div className="px-4 py-3 text-right sm:px-6">
                  <button type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    Search
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
        <div className="mt-10">
          { results && results.data && <Table
            columns={columns}
            data={results.data}
            page={page}
            setPage={handlePageChange}
            total={results.total}
          /> }
          { (!results || !results.data) && 'Enter a search term' }
        </div>
        {results && results.data && (
          <div className="mt-10">
            Additional Info:
            <ul>
              <li>Response Time: { results.responseTime }ms</li>
              <li>Earliest Publication Date: { results.earliestPublication }</li>
              <li>Most Recent Publication Date: { results.mostRecentPublication }</li>
              <li>Most Common Author: { results.mostCommonAuthor }</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}

export default App
