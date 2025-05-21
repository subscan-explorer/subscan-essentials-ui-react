import React, { useMemo } from 'react'

import { BareProps } from '@/types/page'
import { Table, Pagination, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue } from '@heroui/react'
import { getPVMAccountTokenListParams, getPVMTokenTransferListParams, pvmTokenType, unwrap, usePVMAccountTokens } from '@/utils/api'
import { PAGE_SIZE } from '@/utils/const'
import BigNumber from 'bignumber.js'
import { formatHash, getBalanceAmount, timeAgo } from '@/utils/text'
import { Link } from '../link'

interface Props extends BareProps {
  args?: getPVMAccountTokenListParams
  token?: pvmTokenType
}

const Component: React.FC<Props> = ({ args, token, children, className }) => {
  const [page, setPage] = React.useState(1)
  const rowsPerPage = PAGE_SIZE
  const { data } = usePVMAccountTokens({
    ...args,
    page: page - 1,
    row: rowsPerPage,
  })

  const blockData = unwrap(data)
  const total = blockData?.length || 0
  const items = blockData || []
  const pages = useMemo(() => {
    const total = blockData?.length || 0
    return total ? Math.ceil(total / rowsPerPage) : 0
  }, [blockData, rowsPerPage])

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
        td: 'h-[50px]'
      }}>
      <TableHeader>
        <TableColumn key="name">Token</TableColumn>
        <TableColumn key="contract">Contract</TableColumn>
        <TableColumn key="category">Type</TableColumn>
        <TableColumn key="balance">Amount</TableColumn>
      </TableHeader>
      <TableBody items={items || []} emptyContent={'No data'}>
        {(item) => (
          <TableRow key={item.contract}>
            {(columnKey) => {
              if (columnKey === 'balance') {
                return <TableCell>{getBalanceAmount(new BigNumber(item.balance), item.decimals).toFormat()}</TableCell>
              } else if (columnKey === 'name') {
                return <TableCell>{`${item.name}(${item.symbol})`}</TableCell>
              } else if (columnKey === 'category') {
                return <TableCell>{item.category === 'erc20' ? 'ERC-20' : 'ERC-721'}</TableCell>
              } else if (columnKey === 'contract') {
                return <TableCell><Link href={`/token/${item.contract}`}>{formatHash(item.contract)}</Link></TableCell>
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
