import React, { useMemo } from 'react'

import { BareProps } from '@/types/page'
import { Link, Table, Pagination, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue } from '@heroui/react'
import { formatHash, timeAgo } from '@/utils/text'
import { getExtrinsicListParams, unwrap, usePVMTxs } from '@/utils/api'
import { PAGE_SIZE } from '@/utils/const'
import { useData } from '@/context'

interface Props extends BareProps {
  args?: getExtrinsicListParams
}

const Component: React.FC<Props> = ({ children, className, args }) => {
  const { metadata, token, isLoading } = useData();
  const [page, setPage] = React.useState(1)
  const rowsPerPage = PAGE_SIZE
  const { data } = usePVMTxs({
    ...args,
    page: page - 1,
    row: rowsPerPage,
  })
  const extrinsicsData = unwrap(data)
  const total = extrinsicsData?.count || 0
  const items = extrinsicsData?.list
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
        <TableColumn key="hash">Transaction Hash</TableColumn>
        <TableColumn key="block_num">Block</TableColumn>
        <TableColumn key="from_address">From</TableColumn>
        <TableColumn key="to_address">To</TableColumn>
        <TableColumn key="value">{`Value (${token?.symbol})`}</TableColumn>
        <TableColumn key="block_timestamp">Time</TableColumn>
      </TableHeader>
      <TableBody items={items || []} emptyContent={"No data"}>
        {(item) => (
          <TableRow key={item.block_num}>
            {(columnKey) => {
              if (columnKey === 'hash') {
                return (
                  <TableCell>
                    <Link href={`/pvm/tx/${item.hash}`}>{formatHash(item.hash)}</Link>
                  </TableCell>
                )
              } else if (columnKey === 'from_address' || columnKey === 'to_address') {
                return (
                  <TableCell>
                    {formatHash(getKeyValue(item, columnKey))}
                  </TableCell>
                )
              } else if (columnKey === 'block_num') {
                return <TableCell><Link href={`/pvm/block/${item.block_num}`}>{item.block_num}</Link></TableCell>
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
