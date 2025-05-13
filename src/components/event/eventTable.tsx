import React, { useMemo } from 'react'

import { BareProps } from '@/types/page'
import { Link, Table, Pagination, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue } from '@heroui/react'
import { timeAgo } from '@/utils/text'
import { getEventListParams, unwrap, useEvents } from '@/utils/api'
import { PAGE_SIZE } from '@/utils/const'

interface Props extends BareProps {
  args?: getEventListParams
}

const Component: React.FC<Props> = ({ children, className, args }) => {
  const [page, setPage] = React.useState(1)
  const rowsPerPage = PAGE_SIZE
  const { data } = useEvents({
    ...args,
    page: page - 1,
    row: rowsPerPage,
  })
  const extrinsicsData = unwrap(data)
  const total = extrinsicsData?.count || 0
  const items = extrinsicsData?.events
   const pages = useMemo(() => {
      return extrinsicsData?.count ? Math.ceil(extrinsicsData?.count / rowsPerPage) : 0;
    }, [extrinsicsData?.count, rowsPerPage]);
  return (
    <Table
      aria-label="Example table with client side pagination"
      bottomContent={
        <div className="flex w-full justify-center">
          {pages > 0 && (
            <Pagination isCompact showControls showShadow initialPage={1} page={page} total={pages} onChange={(page) => setPage(page)} />
          )}
        </div>
      }
      classNames={{
        wrapper: 'min-h-[222px]',
      }}>
      <TableHeader>
        <TableColumn key="event_idx">Event ID</TableColumn>
        <TableColumn key="module_id">Action</TableColumn>
        <TableColumn key="block_timestamp">Time</TableColumn>
      </TableHeader>
      <TableBody items={items || []} emptyContent={"No data"}>
        {(item) => (
          <TableRow key={item.event_idx}>
            {(columnKey) => {
              if (columnKey === 'event_idx') {
                return (
                  <TableCell>
                    <Link href={`/extrinsic/${item.extrinsic_index}`}>{item.event_index}</Link>
                  </TableCell>
                )
              } else if (columnKey === 'module_id') {
                return <TableCell>{`${item.module_id}(${item.event_id})`}</TableCell>
              } else if (columnKey === 'block_timestamp') {
                return <TableCell>{timeAgo(item.block_timestamp)}</TableCell>
              }
              return <TableCell>{getKeyValue(item, columnKey)}</TableCell>
            }}
          </TableRow>
        )}
      </TableBody>
    </Table>
  )
}

export default Component
