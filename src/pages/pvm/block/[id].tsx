import React from 'react'
import { CardBody, Card, Divider, Tabs, Tab } from '@heroui/react'
import { useRouter } from 'next/router'
import { getUTCTime, timeAgo } from '@/utils/text'
import { unwrap, usePVMBlock } from '@/utils/api'
import { ExtrinsicTable } from '@/components/extrinsic'

export default function Page() {
  const router = useRouter()
  const id = router.query.id
  const { data } = usePVMBlock({
    block_num: Number(id),
  })

  const blockData = unwrap(data)

  return (
    <div className="flex flex-col gap-4 p-6">
      <div className="">PVM Block #{id}</div>
      {blockData && (
        <>
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
                <div>{blockData.uncles ? 'Finalized' : 'Unfinalized'}</div>
              </div>
              <Divider className="my-2.5" />
              <div className="flex items-center">
                <div className="w-48">Mined by</div>
                <div>{blockData.miner}</div>
              </div>
              <Divider className="my-2.5" />
              <div className="flex items-center">
                <div className="w-48">Transaction</div>
                <div>{blockData.transaction_count}</div>
              </div>
              <Divider className="my-2.5" />
              <div className="flex items-center">
                <div className="w-48">Size</div>
                <div>{blockData.transaction_count}</div>
              </div>
              <Divider className="my-2.5" />
              <div className="flex items-center">
                <div className="w-48">Gas Used</div>
                <div>{blockData.transaction_count}</div>
              </div>
              <Divider className="my-2.5" />
              <div className="flex items-center">
                <div className="w-48">Gas Limit</div>
                <div>{blockData.transaction_count}</div>
              </div>
            </CardBody>
          </Card>
          <Card>
            <CardBody>
              <Tabs aria-label="tabs" variant="underlined">
                <Tab key="extrinsics" title="Extrinsics">
                  <ExtrinsicTable args={{ block_num: blockData.block_num }}></ExtrinsicTable>
                </Tab>
              </Tabs>
            </CardBody>
          </Card>
        </>
      )}
    </div>
  )
}
