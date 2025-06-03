import React from 'react'
import { CardBody, Card, Divider } from '@heroui/react'
import { useRouter } from 'next/router'
import { getThemeColor, getUTCTime, timeAgo } from '@/utils/text'
import JsonView from '@uiw/react-json-view'
import { unwrap, useEvent } from '@/utils/api'
import { Container, PageContent } from '@/ui'
import { Link } from '@/components/link'
import { env } from 'next-runtime-env'
import { LoadingSpinner, LoadingText } from '@/components/loading'

export default function Page() {
  const router = useRouter()
  const id = router.query.id as string
  const NEXT_PUBLIC_API_HOST = env('NEXT_PUBLIC_API_HOST') || ''
  const { data, isLoading } = useEvent(NEXT_PUBLIC_API_HOST, {
    event_index: id as string,
  })

  const eventData = unwrap(data)

  return (
    <PageContent>
      <Container>
        <div className="flex flex-col gap-4">
          {isLoading ? (
            <LoadingSpinner />
          ) : (
            eventData && (
              <>
                <div className="flex flex-col lg:flex-row gap-1">
                  <div className="text-base">Substrate Event</div>
                  <div className="text-sm break-all sm:text-base">{eventData.extrinsic_index}</div>
                </div>
                <Card>
                  <CardBody>
                    <div className="flex items-center">
                      <div className="w-48">Timestamp</div>
                      <div>{getUTCTime(eventData.block_timestamp)}</div>
                    </div>
                    <Divider className="my-2.5" />
                    <div className="flex items-center">
                      <div className="w-48">Blocktime</div>
                      <div>{timeAgo(eventData.block_timestamp)}</div>
                    </div>
                    <Divider className="my-2.5" />
                    <div className="flex items-center">
                      <div className="w-48">Block</div>
                      <div>
                        <Link color={getThemeColor(true)} href={`/sub/block/${eventData.block_num}`}>
                          {eventData.block_num}
                        </Link>
                      </div>
                    </div>
                    <Divider className="my-2.5" />
                    <div className="flex items-center">
                      <div className="w-48">Action</div>
                      <div>{`${eventData.module_id}(${eventData.event_id})`}</div>
                    </div>
                    <Divider className="my-2.5" />
                    <div className="flex items-center">
                      <div className="w-48">Parameters</div>
                      <div>
                        <JsonView collapsed={2} value={eventData.params}></JsonView>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </>
            )
          )}
          {!isLoading && !eventData && <LoadingText />}
        </div>
      </Container>
    </PageContent>
  )
}
