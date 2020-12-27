import React from 'react'

const TableHead = ({ columns }) => {
  return (
    <thead className='bg-gray-50'>
      <tr>
        { columns.map((c) => {
          return (
            <th scope='col' className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider' key={c.name}>
              { c.name }
            </th>
          )
        })}
      </tr>
    </thead>
  )
}

export { TableHead }
