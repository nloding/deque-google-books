import React from 'react'
import { Pagination, TableHead } from './'
import { TableData } from './TableData'

const Table = ({ columns, data, page, setPage, total }) => {
  return (
    <div className='flex flex-col'>
      <div className='-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
        <div className='py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8'>
          <div className='shadow overflow-hidden border-b border-gray-200 sm:rounded-lg'>
            <table className='min-w-full divide-y divide-gray-200'>
              <TableHead columns={columns} />
              <TableData columns={columns} data={data} />
            </table>
          </div>
          <Pagination page={page} count={10} total={total} setPage={setPage} />
        </div>
      </div>
    </div>
  )
}

export { Table }
