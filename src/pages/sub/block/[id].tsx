import React from 'react'
import { CardBody, Card, Divider, Snippet, Tabs, Tab } from '@heroui/react'
import { useRouter } from 'next/router'
import { getThemeColor, getUTCTime, timeAgo } from '@/utils/text'
import { unwrap, useBlock } from '@/utils/api'
import { ExtrinsicTable } from '@/components/extrinsic'
import { EventTable } from '@/components/event'
import { LogTable } from '@/components/log'
import { Container, PageContent } from '@/ui'

export default function Page() {
  const router = useRouter()
  const id = router.query.id
  const { data } = useBlock({
    block_num: Number(id),
  })

  const blockData = unwrap(data)

  return (
    <PageContent>
      <Container>
        <div className="flex flex-col gap-4">
          <div className="">Substrate Block #{id}</div>
          {blockData && (
            <>
              <Card>
                <CardBody>
                  <div className="flex items-center">
                    <div className="w-48">Timestamp</div>
                    <div>{getUTCTime(blockData.block_timestamp)}</div>
                  </div>
                  <Divider className="my-2.5" />
                  <div className="flex items-center">
                    <div className="w-48">Blocktime</div>
                    <div>{timeAgo(blockData.block_timestamp)}</div>
                  </div>
                  <Divider className="my-2.5" />
                  <div className="flex items-center">
                    <div className="w-48">Status</div>
                    <div>{blockData.finalized ? 'Finalized' : 'Unfinalized'}</div>
                  </div>
                  <Divider className="my-2.5" />
                  <div className="flex items-center">
                    <div className="w-48">Hash</div>
                    <Snippet symbol="">{blockData.hash}</Snippet>
                  </div>
                  <Divider className="my-2.5" />
                  <div className="flex items-center">
                    <div className="w-48">Parent Hash</div>
                    <Snippet symbol="">{blockData.parent_hash}</Snippet>
                  </div>
                  <Divider className="my-2.5" />
                  <div className="flex items-center">
                    <div className="w-48">State Root</div>
                    <div>{blockData.state_root}</div>
                  </div>
                  <Divider className="my-2.5" />
                  <div className="flex items-center">
                    <div className="w-48">Extrinsics Root</div>
                    <div>{blockData.extrinsics_root}</div>
                  </div>
                  <Divider className="my-2.5" />
                  <div className="flex items-center">
                    <div className="w-48">Collator</div>
                    <div>{blockData.validator}</div>
                  </div>
                  <Divider className="my-2.5" />
                  <div className="flex items-center">
                    <div className="w-48">Spec Version</div>
                    <div>{blockData.spec_version}</div>
                  </div>
                </CardBody>
              </Card>
              <Card>
                <CardBody>
                  <Tabs aria-label="tabs" variant="underlined" color={getThemeColor(true)}>
                    <Tab key="extrinsics" title="Extrinsics">
                      <ExtrinsicTable args={{ block_num: blockData.block_num }}></ExtrinsicTable>
                    </Tab>
                    <Tab key="events" title="Events">
                      <EventTable
                        args={{
                          block_num: blockData.block_num,
                        }}></EventTable>
                    </Tab>
                    <Tab key="log" title="Log">
                      <LogTable
                        args={{
                          block_num: blockData.block_num,
                        }}></LogTable>
                    </Tab>
                  </Tabs>
                </CardBody>
              </Card>
            </>
          )}
        </div>
      </Container>
    </PageContent>
  )
}
