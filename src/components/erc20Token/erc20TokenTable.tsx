import React, { useMemo } from 'react'

import { BareProps } from '@/types/page'
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue, Spinner } from '@heroui/react'
import { getPVMTokenListParams, unwrap, usePVMTokens } from '@/utils/api'
import { getThemeColor, timeAgo } from '@/utils/text'
import { PAGE_SIZE } from '@/utils/const'
import { Link } from '../link'
import { CursorPagination } from '../cursorPagination'
import { env } from 'next-runtime-env'

interface Props extends BareProps {
  args?: getPVMTokenListParams
}

const Component: React.FC<Props> = ({ args, children, className }) => {
  const [page, setPage] = React.useState(1)
  const [cursor, setCursor] = React.useState<{ after?: number; before?: number }>({})
  const rowsPerPage = PAGE_SIZE
  const NEXT_PUBLIC_API_HOST = env('NEXT_PUBLIC_API_HOST') || ''
  const { data, isLoading } = usePVMTokens(NEXT_PUBLIC_API_HOST, {
    ...args,
    row: rowsPerPage,
    ...cursor,
  })

  const blockData = unwrap(data)
  const items = blockData?.list
  const pagination = blockData?.pagination
  const handlePrevious = () => {
    if (pagination?.has_previous_page && pagination.start_cursor !== undefined) {
      setCursor({ before: pagination.start_cursor })
      setPage(page - 1)
    }
  }

  const handleNext = () => {
    if (pagination?.has_next_page && pagination.end_cursor !== undefined) {
      setCursor({ after: pagination.end_cursor })
      setPage(page + 1)
    }
  }

  return (
    <Table
      aria-label="Table"
      bottomContent={
        <CursorPagination
          pagination={pagination}
          onPrevious={handlePrevious}
          onNext={handleNext}
          color={getThemeColor()}
        />
      }
      classNames={{
        wrapper: 'min-h-[222px]',
        td: 'h-[50px]',
      }}>
      <TableHeader>
        <TableColumn key="symbol">Symbol</TableColumn>
        <TableColumn key="name">Name</TableColumn>
        <TableColumn key="contract">Contract</TableColumn>
        <TableColumn key="holders">Holder</TableColumn>
      </TableHeader>
      <TableBody isLoading={isLoading} loadingContent={<Spinner color={getThemeColor()} />} items={items || []} emptyContent={'No data'}>
        {(item) => (
          <TableRow key={item.contract}>
            {(columnKey) => {
              if (columnKey === 'contract') {
                return (
                  <TableCell>
                    <Link href={`/token/${item.contract}`}>{item.contract}</Link>
                  </TableCell>
                )
              } else if (columnKey === 'symbol') {
                return (
                  <TableCell>
                    <Link href={`/token/${item.contract}`}>{item.symbol}</Link>
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
