import React, { useMemo } from 'react'

import { BareProps } from '@/types/page'
import { Table, Pagination, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue } from '@heroui/react'
import { unwrap, usePVMBlocks } from '@/utils/api'
import { timeAgo } from '@/utils/text'
import { PAGE_SIZE } from '@/utils/const'
import { Link } from '../link'

interface Props extends BareProps {
  args?: string
}

const Component: React.FC<Props> = ({ children, className }) => {
  const [page, setPage] = React.useState(1)
  const rowsPerPage = PAGE_SIZE
  const { data } = usePVMBlocks({
    page: page - 1,
    row: rowsPerPage,
  })

  const blockData = unwrap(data)
  const total = blockData?.count || 0
  const items = blockData?.list
  const pages = useMemo(() => {
    return blockData?.count ? Math.ceil(blockData?.count / rowsPerPage) : 0
  }, [blockData?.count, rowsPerPage])

  return (
    <Table
      aria-label="Example table with client side pagination"
      bottomContent={
        <div className="flex w-full justify-center">
          {pages > 0 && <Pagination isCompact showControls showShadow initialPage={1} page={page} total={pages} onChange={(page) => setPage(page)} />}
        </div>
      }
      classNames={{
        wrapper: 'min-h-[222px]',
      }}>
      <TableHeader>
        <TableColumn key="block_num">Block</TableColumn>
        <TableColumn key="miner">Miner</TableColumn>
        <TableColumn key="transactions">Transactions</TableColumn>
        <TableColumn key="block_timestamp">Time</TableColumn>
      </TableHeader>
      <TableBody items={items || []} emptyContent={'No data'}>
        {(item) => (
          <TableRow key={item.block_num}>
            {(columnKey) => {
              if (columnKey === 'block_num') {
                return (
                  <TableCell>
                    <Link href={`/pvm/block/${item.block_num}`}>{item.block_num}</Link>
                  </TableCell>
                )
              } else if (columnKey === 'miner') {
                return (
                  <TableCell>
                    <Link href={`/pvm/account/${item.miner}`}>{item.miner}</Link>
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
