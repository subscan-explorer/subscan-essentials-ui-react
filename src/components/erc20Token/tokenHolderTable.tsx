import React, { useMemo } from 'react'

import { BareProps } from '@/types/page'
import { Table, Pagination, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue } from '@heroui/react'
import { getPVMTokenHolderListParams, pvmTokenType, unwrap, usePVMTokenHolders } from '@/utils/api'
import { PAGE_SIZE } from '@/utils/const'
import BigNumber from 'bignumber.js'
import { getBalanceAmount } from '@/utils/text'
import { Link } from '../link'

interface Props extends BareProps {
  args?: getPVMTokenHolderListParams
  token: pvmTokenType
}

const Component: React.FC<Props> = ({ args, token, children, className }) => {
  const [page, setPage] = React.useState(1)
  const rowsPerPage = PAGE_SIZE
  const { data } = usePVMTokenHolders({
    ...args,
    page: page - 1,
    row: rowsPerPage,
  })

  const blockData = unwrap(data)
  const total = blockData?.count || 0
  const items = blockData?.holders
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
        <TableColumn key="holder">Account</TableColumn>
        <TableColumn key="balance">Balance</TableColumn>
      </TableHeader>
      <TableBody items={items || []} emptyContent={'No data'}>
        {(item) => (
          <TableRow key={item.contract}>
            {(columnKey) => {
              if (columnKey === 'holder') {
                return (
                  <TableCell>
                    <Link href={`/pvm/account/${item.holder}`}>{item.holder}</Link>
                  </TableCell>
                )
              } else if (columnKey === 'balance') {
                return <TableCell>{getBalanceAmount(new BigNumber(item.balance), token.decimals).toFormat()}</TableCell>
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
