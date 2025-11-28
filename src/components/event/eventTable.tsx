import React, { useMemo } from 'react'

import { BareProps } from '@/types/page'
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue, Spinner } from '@heroui/react'
import { getThemeColor, timeAgo } from '@/utils/text'
import { getEventListParams, unwrap, useEvents } from '@/utils/api'
import { PAGE_SIZE } from '@/utils/const'
import { Link } from '../link'
import { CursorPagination } from '../cursorPagination'
import { env } from 'next-runtime-env'

interface Props extends BareProps {
  args?: getEventListParams
}

const Component: React.FC<Props> = ({ children, className, args }) => {
  const [page, setPage] = React.useState(1)
  const [cursor, setCursor] = React.useState<{ after?: number; before?: number }>({})
  const rowsPerPage = PAGE_SIZE
  const NEXT_PUBLIC_API_HOST = env('NEXT_PUBLIC_API_HOST') || ''
  const { data, isLoading } = useEvents(NEXT_PUBLIC_API_HOST, {
    ...args,
    row: rowsPerPage,
    hidden_params: true,
    ...cursor,
  })
  const extrinsicsData = unwrap(data)
  const items = extrinsicsData?.events
  const pagination = extrinsicsData?.pagination

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
        <TableColumn key="event_idx">Event ID</TableColumn>
        <TableColumn key="module_id">Action</TableColumn>
        <TableColumn key="block_timestamp">Time</TableColumn>
      </TableHeader>
      <TableBody isLoading={isLoading} loadingContent={<Spinner color={getThemeColor(true)} />} items={items || []} emptyContent={'No data'}>
        {(item) => (
          <TableRow key={item.event_idx}>
            {(columnKey) => {
              if (columnKey === 'event_idx') {
                return (
                  <TableCell>
                    <Link color={getThemeColor(true)} href={`/sub/event/${item.event_index}`}>
                      {item.event_index}
                    </Link>
                  </TableCell>
                )
              } else if (columnKey === 'module_id') {
                return <TableCell>{`${item.module_id}(${item.event_id})`}</TableCell>
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
