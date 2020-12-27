const TableRow = ({ data, onClick }) => {
  console.log({ data })
  return (
    <tr>
      { data.map((d) => (
        <td className='px-6 py-4 whitespace-nowrap'>
          <div className='flex items-center text-sm font-medium'>
            { d }
          </div>
        </td>
      ))}
      <td className='px-6 py-4 whitespace-nowrap'>
        <div className='flex items-center text-sm font-medium'>
          <button onClick={onClick} type='button'>View More</button>
        </div>
      </td>
    </tr>
  )
}

export { TableRow }