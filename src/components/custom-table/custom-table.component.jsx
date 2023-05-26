import DataTable from 'react-data-table-component'

export default function CustomTable({
  title,
  data,
  loading,
  columns,
  perPage = 10,
  pagination,
}) {
  return (
    <DataTable
      title={title}
      data={data}
      columns={columns}
      progressPending={loading}
      pagination={pagination}
      paginationPerPage={perPage}
    />
  )
}
