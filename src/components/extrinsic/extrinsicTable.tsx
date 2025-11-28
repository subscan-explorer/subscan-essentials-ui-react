import React, { useMemo } from 'react'

import { BareProps } from '@/types/page'
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue, Spinner } from '@heroui/react'
import { formatHash, getThemeColor, timeAgo } from '@/utils/text'
import { getExtrinsicListParams, unwrap, useExtrinsics } from '@/utils/api'
import { PAGE_SIZE } from '@/utils/const'
import { Link } from '../link'
import { CursorPagination } from '../cursorPagination'
import { env } from 'next-runtime-env';

interface Props extends BareProps {
  args?: getExtrinsicListParams
}

const Component: React.FC<Props> = ({ children, className, args }) => {
  const [page, setPage] = React.useState(1)
  const [cursor, setCursor] = React.useState<{ after?: number; before?: number }>({})
  const NEXT_PUBLIC_API_HOST = env('NEXT_PUBLIC_API_HOST') || '';
  const rowsPerPage = PAGE_SIZE
  const { data, isLoading } = useExtrinsics(NEXT_PUBLIC_API_HOST, {
    ...args,
    row: rowsPerPage,
    hidden_params: true,
    ...cursor,
  })
  const extrinsicsData = unwrap(data)
  const items = extrinsicsData?.extrinsics
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
        td: 'h-[50px]'
      }}>
      <TableHeader>
        <TableColumn key="extrinsic_index">Extrinsic ID</TableColumn>
        <TableColumn key="extrinsic_hash">Hash</TableColumn>
        <TableColumn key="call_module">Action</TableColumn>
        <TableColumn key="success">Result</TableColumn>
        <TableColumn key="block_timestamp">Time</TableColumn>
      </TableHeader>
      <TableBody isLoading={isLoading} loadingContent={<Spinner color={getThemeColor(true)} />} items={items || []} emptyContent={"No data"}>
        {(item) => (
          <TableRow key={item.extrinsic_index}>
            {(columnKey) => {
              if (columnKey === 'extrinsic_index') {
                return (
                  <TableCell>
                    <Link color={getThemeColor(true)} href={`/sub/extrinsic/${item.extrinsic_index}`}>{item.extrinsic_index}</Link>
                  </TableCell>
                )
              } else if (columnKey === 'extrinsic_hash') {
                return (
                  <TableCell>
                    <Link color={getThemeColor(true)} href={`/sub/extrinsic/${item.extrinsic_hash}`}>{formatHash(item.extrinsic_hash)}</Link>
                  </TableCell>
                )
              } else if (columnKey === 'success') {
                return <TableCell>{item.success ? 'Success' : 'Failed'}</TableCell>
              } else if (columnKey === 'call_module') {
                return <TableCell>{`${item.call_module}(${item.call_module_function})`}</TableCell>
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
