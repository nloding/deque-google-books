import { TableRow } from "./TableRow"

const TableData = ({ columns, data, onClick }) => {
  const flatData = data.map((d) => columns.filter((c) => c.path).map((c) => d[c.path]))
  return (
    <tbody>
      {flatData.map((d, index) => <TableRow data={d} more={data[index].description || 'No description available'} index={index} onClick={onClick} key={index} />)}
    </tbody>
  )
}

export { TableData }