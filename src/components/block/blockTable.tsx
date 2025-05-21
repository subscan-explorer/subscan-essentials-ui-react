import React, { useMemo } from 'react'

import { BareProps } from '@/types/page'
import { Table, Pagination, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue } from '@heroui/react'
import { unwrap, useBlocks } from '@/utils/api'
import { getThemeColor, timeAgo } from '@/utils/text'
import { PAGE_SIZE } from '@/utils/const'
import { Link } from '../link'

interface Props extends BareProps {
  args?: string
}

const Component: React.FC<Props> = ({ children, className }) => {
  const [page, setPage] = React.useState(1)
  const rowsPerPage = PAGE_SIZE
  const { data } = useBlocks({
    page: page - 1,
    row: rowsPerPage,
  })

  const blockData = unwrap(data)
  const total = blockData?.count || 0
  const items = blockData?.blocks
  const pages = useMemo(() => {
    return blockData?.count ? Math.ceil(blockData?.count / rowsPerPage) : 0
  }, [blockData?.count, rowsPerPage])

  return (
    <Table
      aria-label="Table"
      bottomContent={
        <div className="flex w-full justify-center">
          {pages > 0 && <Pagination color={getThemeColor(true)} isCompact showControls showShadow initialPage={1} page={page} total={pages} onChange={(page) => setPage(page)} />}
        </div>
      }
      classNames={{
        wrapper: 'min-h-[222px]',
        td: 'h-[50px]'
      }}>
      <TableHeader>
        <TableColumn key="block_num">Block</TableColumn>
        <TableColumn key="hash">Hash</TableColumn>
        <TableColumn key="extrinsics_count">Extrinsic</TableColumn>
        <TableColumn key="event_count">Event</TableColumn>
        <TableColumn key="block_timestamp">Time</TableColumn>
      </TableHeader>
      <TableBody items={items || []} emptyContent={"No data"}>
        {(item) => (
          <TableRow key={item.block_num}>
            {(columnKey) => {
              if (columnKey === 'block_num') {
                return (
                  <TableCell>
                    <Link color={getThemeColor(true)} href={`/sub/block/${item.block_num}`}>{item.block_num}</Link>
                  </TableCell>
                )
              } else if (columnKey === 'hash') {
                return (
                  <TableCell>
                    <Link color={getThemeColor(true)} href={`/sub/block/${item.block_num}`}>{item.hash}</Link>
                  </TableCell>
                )
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
