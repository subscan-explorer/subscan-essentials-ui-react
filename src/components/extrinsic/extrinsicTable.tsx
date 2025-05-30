import React, { useMemo } from 'react'

import { BareProps } from '@/types/page'
import { Table, Pagination, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue, Spinner } from '@heroui/react'
import { formatHash, getThemeColor, timeAgo } from '@/utils/text'
import { getExtrinsicListParams, unwrap, useExtrinsics } from '@/utils/api'
import { PAGE_SIZE } from '@/utils/const'
import { Link } from '../link'
import { env } from 'next-runtime-env';

interface Props extends BareProps {
  args?: getExtrinsicListParams
}

const Component: React.FC<Props> = ({ children, className, args }) => {
  const [page, setPage] = React.useState(1)
  const NEXT_PUBLIC_API_HOST = env('NEXT_PUBLIC_API_HOST') || '';
  const rowsPerPage = PAGE_SIZE
  const { data, isLoading } = useExtrinsics(NEXT_PUBLIC_API_HOST, {
    ...args,
    page: page - 1,
    row: rowsPerPage,
    hidden_params: true,
  })
  const extrinsicsData = unwrap(data)
  const total = extrinsicsData?.count || 0
  const items = extrinsicsData?.extrinsics
   const pages = useMemo(() => {
      return extrinsicsData?.count ? Math.ceil(extrinsicsData?.count / rowsPerPage) : 0;
    }, [extrinsicsData?.count, rowsPerPage]);
  return (
    <Table
      aria-label="Table"
      bottomContent={
        <div className="flex w-full justify-center">
          {pages > 0 && (
            <Pagination color={getThemeColor(true)} isCompact showControls showShadow initialPage={1} page={page} total={pages} onChange={(page) => setPage(page)} />
          )}
        </div>
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
