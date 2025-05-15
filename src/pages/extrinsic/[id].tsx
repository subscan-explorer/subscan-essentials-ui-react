import React from 'react'
import { CardBody, Card, Divider, Snippet, Tabs, Tab, Link } from '@heroui/react'
import { useRouter } from 'next/router'
import { checkIsExtrinsicIndex, getUTCTime, timeAgo } from '@/utils/text'
import JsonView from '@uiw/react-json-view'
import { unwrap, useExtrinsic } from '@/utils/api'
import { EventTable } from '@/components/event'
import { Container, PageContent } from '@/ui'

export default function Page() {
  const router = useRouter()
  const id = router.query.id as string

  const isExtrinsicIndex = checkIsExtrinsicIndex(id)
  const { data } = useExtrinsic(
    isExtrinsicIndex
      ? {
          extrinsic_index: id as string,
        }
      : {
          hash: id as string,
        }
  )

  const extrinsicData = unwrap(data)

  return (
    <PageContent>
      <Container>
        <div className="flex flex-col gap-4">
          {extrinsicData && (
            <>
              <div className="">Substrate Extrinsic #{extrinsicData.extrinsic_index}</div>
              <Card>
                <CardBody>
                  <div className="flex items-center">
                    <div className="w-48">Timestamp</div>
                    <div>{getUTCTime(extrinsicData.block_timestamp)}</div>
                  </div>
                  <Divider className="my-2.5" />
                  <div className="flex items-center">
                    <div className="w-48">Blocktime</div>
                    <div>{timeAgo(extrinsicData.block_timestamp)}</div>
                  </div>
                  <Divider className="my-2.5" />
                  <div className="flex items-center">
                    <div className="w-48">Block</div>
                    <div>
                      <Link href={`/block/${extrinsicData.block_num}`}>{extrinsicData.block_num}</Link>
                    </div>
                  </div>
                  <Divider className="my-2.5" />
                  <div className="flex items-center">
                    <div className="w-48">Lifetime</div>
                    <div>{extrinsicData.lifetime ? `${extrinsicData.lifetime?.birth} - ${extrinsicData.lifetime?.death}` : '-'}</div>
                  </div>
                  <Divider className="my-2.5" />
                  <div className="flex items-center">
                    <div className="w-48">Extrinsic Hash</div>
                    <Snippet symbol="">{extrinsicData.extrinsic_hash}</Snippet>
                  </div>
                  <Divider className="my-2.5" />
                  <div className="flex items-center">
                    <div className="w-48">Action</div>
                    <div>{`${extrinsicData.call_module}(${extrinsicData.call_module_function})`}</div>
                  </div>
                  <Divider className="my-2.5" />
                  <div className="flex items-center">
                    <div className="w-48">Sender</div>
                    <div>{extrinsicData.account_id || '-'}</div>
                  </div>
                  <Divider className="my-2.5" />
                  <div className="flex items-center">
                    <div className="w-48">Nonce</div>
                    <div>{extrinsicData.nonce}</div>
                  </div>
                  <Divider className="my-2.5" />
                  <div className="flex items-center">
                    <div className="w-48">Fee</div>
                    <div>{extrinsicData.fee}</div>
                  </div>
                  <Divider className="my-2.5" />
                  <div className="flex items-center">
                    <div className="w-48">Result</div>
                    <div>{extrinsicData.success ? 'Success' : 'Failed'}</div>
                  </div>
                  <Divider className="my-2.5" />
                  <div className="flex items-center">
                    <div className="w-48">Parameters</div>
                    <div>
                      <JsonView value={extrinsicData.params}></JsonView>
                    </div>
                  </div>
                  <Divider className="my-2.5" />
                  <div className="flex items-center">
                    <div className="w-48">Signature</div>
                    <div>{extrinsicData.signature || '-'}</div>
                  </div>
                </CardBody>
              </Card>
              <Card>
                <CardBody>
                  <Tabs aria-label="tabs" variant="underlined">
                    <Tab key="events" title="Events">
                      <EventTable
                        args={{
                          extrinsic_index: extrinsicData.extrinsic_index,
                        }}></EventTable>
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
