import React, { useMemo } from 'react'

import { BareProps } from '@/types/page'
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue, Spinner } from '@heroui/react'
import { unwrap, useBlocks } from '@/utils/api'
import { getThemeColor, timeAgo } from '@/utils/text'
import { PAGE_SIZE } from '@/utils/const'
import { Link } from '../link'
import { CursorPagination } from '../cursorPagination'
import { env } from 'next-runtime-env'

interface Props extends BareProps {
  args?: string
}

const Component: React.FC<Props> = ({ children, className }) => {
  const [page, setPage] = React.useState(1)
  const [cursor, setCursor] = React.useState<{ after?: number; before?: number }>({})
  const NEXT_PUBLIC_API_HOST = env('NEXT_PUBLIC_API_HOST') || ''
  const rowsPerPage = PAGE_SIZE
  const { data, isLoading } = useBlocks(NEXT_PUBLIC_API_HOST, {
    row: rowsPerPage,
    ...cursor,
  })

  const blockData = unwrap(data)
  const items = blockData?.blocks
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
          color={getThemeColor(true)}
        />
      }
      classNames={{
        wrapper: 'min-h-[222px]',
        td: 'h-[50px]',
      }}>
      <TableHeader>
        <TableColumn key="block_num">Block</TableColumn>
        <TableColumn key="hash">Hash</TableColumn>
        <TableColumn key="extrinsics_count">Extrinsic</TableColumn>
        <TableColumn key="event_count">Event</TableColumn>
        <TableColumn key="block_timestamp">Time</TableColumn>
      </TableHeader>
      <TableBody isLoading={isLoading} loadingContent={<Spinner color={getThemeColor(true)} />} items={items || []} emptyContent={'No data'}>
        {(item) => (
          <TableRow key={item.block_num}>
            {(columnKey) => {
              if (columnKey === 'block_num') {
                return (
                  <TableCell>
                    <Link color={getThemeColor(true)} href={`/sub/block/${item.block_num}`}>
                      {item.block_num}
                    </Link>
                  </TableCell>
                )
              } else if (columnKey === 'hash') {
                return (
                  <TableCell>
                    <Link color={getThemeColor(true)} href={`/sub/block/${item.block_num}`}>
                      {item.hash}
                    </Link>
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
