import React, { useMemo } from 'react'

import { BareProps } from '@/types/page'
import { Table, Pagination, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue } from '@heroui/react'
import { getBalanceAmount } from '@/utils/text'
import { getExtrinsicListParams, unwrap, usePVMAccounts } from '@/utils/api'
import { PAGE_SIZE } from '@/utils/const'
import { useData } from '@/context'
import BigNumber from 'bignumber.js'
import { Link } from '../link'
import { env } from 'next-runtime-env'

interface Props extends BareProps {
  args?: getExtrinsicListParams
}

const Component: React.FC<Props> = ({ children, className, args }) => {
  const { metadata, token, isLoading } = useData()
  const [page, setPage] = React.useState(1)
  const rowsPerPage = PAGE_SIZE
  const NEXT_PUBLIC_API_HOST = env('NEXT_PUBLIC_API_HOST') || ''
  const { data } = usePVMAccounts(NEXT_PUBLIC_API_HOST, {
    ...args,
    page: page - 1,
    row: rowsPerPage,
  })
  const extrinsicsData = unwrap(data)
  const total = extrinsicsData?.count || 0
  const items = extrinsicsData?.list
  const pages = useMemo(() => {
    return extrinsicsData?.count ? Math.ceil(extrinsicsData?.count / rowsPerPage) : 0
  }, [extrinsicsData?.count, rowsPerPage])
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
        <TableColumn key="address">Account</TableColumn>
        <TableColumn key="balance">{`Balance (${token?.symbol})`}</TableColumn>
      </TableHeader>
      <TableBody items={items || []} emptyContent={'No data'}>
        {(item) => (
          <TableRow key={item.evm_account}>
            {(columnKey) => {
              if (columnKey === 'balance') {
                return <TableCell>{getBalanceAmount(new BigNumber(item.balance), token?.decimals).toFormat()}</TableCell>
              } else if (columnKey === 'address') {
                return (
                  <TableCell>
                    <Link href={`/address/${item.evm_account}`}>{item.evm_account}</Link>
                  </TableCell>
                )
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
