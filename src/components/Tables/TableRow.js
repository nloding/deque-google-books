import { useState} from 'react'

const TableRow = ({ data, more, index }) => {
  const [showMore, setShowMore] = useState(false)

  const className = index % 2
    ? 'bg-gray-200'
    : 'bg-white'

  if (showMore) {
    return (
      <>
        <tr className={className}>
          { data.map((d) => (
            <td className='px-6 py-4 whitespace-nowrap'>
              <div className='flex items-center text-sm font-medium'>
                { d }
              </div>
            </td>
          ))}
          <td className='px-6 py-4 whitespace-nowrap'>
            <div className='flex items-center text-sm font-medium'>
              <button onClick={() => setShowMore(false)} type='button'>Close</button>
            </div>
          </td>
        </tr>
        <tr className={className}>
          <td className='px-6 py-4 whitespace-wrap' colSpan={data.length + 1}>
            <div className='flex items-center text-sm font-medium'>
              { more }
            </div>
          </td>
        </tr>
      </>
    )
  }

  return (
    <tr className={className}>
      { data.map((d) => (
        <td className='px-6 py-4 whitespace-nowrap'>
          <div className='flex items-center text-sm font-medium'>
            { d }
          </div>
        </td>
      ))}
      <td className='px-6 py-4 whitespace-nowrap'>
        <div className='flex items-center text-sm font-medium'>
          <button onClick={() => setShowMore(true)} type='button'>View More</button>
        </div>
      </td>
    </tr>
  )
}

export { TableRow }