import React, { useMemo } from 'react'

import { BareProps } from '@/types/page'
import { Table, Pagination, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue, Spinner } from '@heroui/react'
import { getLogListParams, unwrap, useLogs } from '@/utils/api'
import { PAGE_SIZE } from '@/utils/const'
import { Link } from '../link'
import { getThemeColor } from '@/utils/text'
import { env } from 'next-runtime-env'

interface Props extends BareProps {
  args?: getLogListParams
}

const Component: React.FC<Props> = ({ children, className, args }) => {
  const [page, setPage] = React.useState(1)
  const rowsPerPage = PAGE_SIZE
  const NEXT_PUBLIC_API_HOST = env('NEXT_PUBLIC_API_HOST') || ''
  const { data, isLoading } = useLogs(NEXT_PUBLIC_API_HOST, {
    ...args,
    page: page - 1,
    row: rowsPerPage,
  })
  const extrinsicsData = unwrap(data)
  const items = extrinsicsData || []
  const pages = useMemo(() => {
    const total = extrinsicsData?.length || 0
    return total ? Math.ceil(total / rowsPerPage) : 0
  }, [extrinsicsData, rowsPerPage])
  return (
    <Table
      aria-label="Table"
      bottomContent={
        <div className="flex w-full justify-center">
          {pages > 0 && (
            <Pagination
              color={getThemeColor(true)}
              isCompact
              showControls
              showShadow
              initialPage={1}
              page={page}
              total={pages}
              onChange={(page) => setPage(page)}
            />
          )}
        </div>
      }
      classNames={{
        wrapper: 'min-h-[222px]',
        td: 'h-[50px]',
      }}>
      <TableHeader>
        <TableColumn key="log_index">Log Index</TableColumn>
        <TableColumn key="block_num">Block</TableColumn>
        <TableColumn key="log_type">Type</TableColumn>
      </TableHeader>
      <TableBody isLoading={isLoading} loadingContent={<Spinner color={getThemeColor(true)} />} items={items || []} emptyContent={'No data'}>
        {(item) => (
          <TableRow key={item.log_index}>
            {(columnKey) => {
              if (columnKey === 'block_num') {
                return (
                  <TableCell>
                    <Link color={getThemeColor(true)} href={`/sub/block/${item.block_num}`}>
                      {item.block_num}
                    </Link>
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
