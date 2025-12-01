import React from 'react'
import { CardBody, Card, Divider, Tabs, Tab } from '@heroui/react'
import { useRouter } from 'next/router'
import { getThemeColor, getUTCTime } from '@/utils/text'
import { unwrap, usePVMBlock } from '@/utils/api'
import { Container, PageContent } from '@/ui'
import { TxTable } from '@/components/tx'
import { Link } from '@/components/link'
import { env } from 'next-runtime-env'
import { LoadingSpinner, LoadingText } from '@/components/loading'

export default function Page() {
  const router = useRouter()
  const id = router.query.id
  const blockNum = Number(id)
  if (isNaN(blockNum)) {
    return <LoadingText />
  }
  const NEXT_PUBLIC_API_HOST = env('NEXT_PUBLIC_API_HOST') || ''
  const { data, isLoading } = usePVMBlock(NEXT_PUBLIC_API_HOST, {
    block_num: blockNum,
  })

  const blockData = unwrap(data)

  return (
    <PageContent>
      <Container>
        <div className="flex flex-col gap-4">
          {isLoading ? (
            <LoadingSpinner />
          ) : (
            blockData && (
              <>
                <div className="flex flex-col lg:flex-row gap-1">
                  <div className="text-base">Smart Contract Block</div>
                  <div className="text-sm break-all sm:text-base">#{id}</div>
                </div>
                <Card>
                  <CardBody>
                    <div className="flex items-center">
                      <div className="w-48">Block Hash</div>
                      <div>{blockData.block_hash}</div>
                    </div>
                    <Divider className="my-2.5" />
                    <div className="flex items-center">
                      <div className="w-48">Timestamp</div>
                      <div>{getUTCTime(blockData.timestamp)}</div>
                    </div>
                    <Divider className="my-2.5" />
                    <div className="flex items-center">
                      <div className="w-48">Status</div>
                      <div>{'Finalized'}</div>
                    </div>
                    <Divider className="my-2.5" />
                    <div className="flex items-center">
                      <div className="w-48">Mined by</div>
                      <div>
                        <Link href={`/address/${blockData.miner}`}>{blockData.miner}</Link>
                      </div>
                    </div>
                    <Divider className="my-2.5" />
                    <div className="flex items-center">
                      <div className="w-48">Transaction</div>
                      <div>{blockData.transaction_count}</div>
                    </div>
                    <Divider className="my-2.5" />
                    <div className="flex items-center">
                      <div className="w-48">Size</div>
                      <div>
                        {blockData.block_size} {'bytes'}
                      </div>
                    </div>
                    <Divider className="my-2.5" />
                    <div className="flex items-center">
                      <div className="w-48">Gas Used</div>
                      <div>{blockData.gas_used}</div>
                    </div>
                    <Divider className="my-2.5" />
                    <div className="flex items-center">
                      <div className="w-48">Gas Limit</div>
                      <div>{blockData.gas_limit}</div>
                    </div>
                  </CardBody>
                </Card>
                <Card>
                  <CardBody>
                    <Tabs aria-label="tabs" variant="underlined" color={getThemeColor()}>
                      <Tab key="transaction" title="Transaction">
                        <TxTable args={{ block_num: blockData.block_num }}></TxTable>
                      </Tab>
                    </Tabs>
                  </CardBody>
                </Card>
              </>
            )
          )}
          {!isLoading && !blockData && <LoadingText />}
        </div>
      </Container>
    </PageContent>
  )
}
