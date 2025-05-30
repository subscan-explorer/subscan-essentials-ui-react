import React, { useMemo } from 'react'

import { BareProps } from '@/types/page'
import { Table, Pagination, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue, Spinner } from '@heroui/react'
import {
  getPVMTokenTransferListParams,
  pvmTokenType,
  unwrap,
  usePVMTokenTransfers,
} from '@/utils/api'
import { PAGE_SIZE } from '@/utils/const'
import BigNumber from 'bignumber.js'
import { formatHash, getBalanceAmount, getThemeColor, timeAgo } from '@/utils/text'
import { Link } from '../link'
import { env } from 'next-runtime-env'

interface Props extends BareProps {
  args?: getPVMTokenTransferListParams
  token?: pvmTokenType
}

const Component: React.FC<Props> = ({ args, token, children, className }) => {
  const [page, setPage] = React.useState(1)
  const rowsPerPage = PAGE_SIZE
  const NEXT_PUBLIC_API_HOST = env('NEXT_PUBLIC_API_HOST') || ''
  const { data, isLoading } = usePVMTokenTransfers(NEXT_PUBLIC_API_HOST, {
    ...args,
    page: page - 1,
    row: rowsPerPage,
  })

  const blockData = unwrap(data)
  const total = blockData?.count || 0
  const items = blockData?.transfers
  const pages = useMemo(() => {
    return blockData?.count ? Math.ceil(blockData?.count / rowsPerPage) : 0
  }, [blockData?.count, rowsPerPage])

  return (
    <Table
      aria-label="Table"
      bottomContent={
        <div className="flex w-full justify-center">
          {pages > 0 && <Pagination isCompact showControls showShadow initialPage={1} page={page} total={pages} onChange={(page) => setPage(page)} />}
        </div>
      }
      classNames={{
        wrapper: 'min-h-[222px]',
        td: 'h-[50px]',
      }}>
      <TableHeader>
        <TableColumn key="hash">Transaction Hash</TableColumn>
        <TableColumn key="from">From</TableColumn>
        <TableColumn key="to">To</TableColumn>
        <TableColumn key="value">Amount</TableColumn>
        <TableColumn key="create_at">Time</TableColumn>
      </TableHeader>
      <TableBody isLoading={isLoading} loadingContent={<Spinner color={getThemeColor()} />} items={items || []} emptyContent={'No data'}>
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => {
              if (columnKey === 'from' || columnKey === 'to') {
                const address = columnKey === 'from' ? item.from : item.to
                return (
                  <TableCell>
                    <Link href={`/address/${address}`}>{formatHash(address)}</Link>
                  </TableCell>
                )
              } else if (columnKey === 'hash') {
                return (
                  <TableCell>
                    <Link href={`/tx/${item.hash}`}>{formatHash(item.hash)}</Link>
                  </TableCell>
                )
              } else if (columnKey === 'value') {
                return (
                  <TableCell>
                    {getBalanceAmount(new BigNumber(item.value), item.decimals).toFormat()} {item.symbol}
                  </TableCell>
                )
              } else if (columnKey === 'create_at') {
                return <TableCell>{timeAgo(item.create_at)}</TableCell>
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
