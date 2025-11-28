import React, { useMemo } from 'react'

import { BareProps } from '@/types/page'
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue, Spinner } from '@heroui/react'
import { getPVMContractListParams, unwrap, usePVMContracts } from '@/utils/api'
import { PAGE_SIZE } from '@/utils/const'
import { useData } from '@/context'
import { Link } from '../link'
import { CursorPagination } from '../cursorPagination'
import { env } from 'next-runtime-env'
import { getThemeColor } from '@/utils/text'

interface Props extends BareProps {
  args?: getPVMContractListParams
}

const Component: React.FC<Props> = ({ children, className, args }) => {
  const { metadata, token } = useData()
  const [page, setPage] = React.useState(1)
  const [cursor, setCursor] = React.useState<{ after?: number; before?: number }>({})
  const rowsPerPage = PAGE_SIZE
  const NEXT_PUBLIC_API_HOST = env('NEXT_PUBLIC_API_HOST') || ''
  const { data, isLoading } = usePVMContracts(NEXT_PUBLIC_API_HOST, {
    ...args,
    row: rowsPerPage,
    ...cursor,
  })
  const contractsData = unwrap(data)
  const items = contractsData?.list
  const pagination = contractsData?.pagination
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
        <TableColumn key="address">Contract</TableColumn>
        <TableColumn key="contract_name">Name</TableColumn>
        <TableColumn key="transaction_count">Transaction</TableColumn>
        <TableColumn key="verify_status">Status</TableColumn>
      </TableHeader>
      <TableBody isLoading={isLoading} loadingContent={<Spinner color={getThemeColor()} />} items={items || []} emptyContent={'No data'}>
        {(item) => (
          <TableRow key={item.address}>
            {(columnKey) => {
              if (columnKey === 'address') {
                return (
                  <TableCell>
                    <Link href={`/contract/${item.address}`}>{item.address}</Link>
                  </TableCell>
                )
              } else if (columnKey === 'verify_status') {
                return <TableCell>{item.verify_status === 'verified' ? 'Verified' : 'Unverified'}</TableCell>
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
