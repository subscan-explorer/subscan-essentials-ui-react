import React, { useMemo } from 'react'
import { CardBody, Card, Divider } from '@heroui/react'
import { useRouter } from 'next/router'
import { getBalanceAmount, getUTCTime, timeAgo } from '@/utils/text'
import { unwrap, usePVMTx } from '@/utils/api'
import { Container, PageContent } from '@/ui'
import { PVM_DECIMAL } from '@/utils/const'
import BigNumber from 'bignumber.js'
import { toHex } from 'web3-utils'
import { OverflowText } from '@/components/overflowText'
import { Link } from '@/components/link'
import { env } from 'next-runtime-env'
import { LoadingSpinner, LoadingText } from '@/components/loading'

export default function Page() {
  const router = useRouter()
  const id = router.query.id as string
  const NEXT_PUBLIC_API_HOST = env('NEXT_PUBLIC_API_HOST') || ''

  const { data, isLoading } = usePVMTx(NEXT_PUBLIC_API_HOST, {
    hash: id as string,
  })

  const extrinsicData = unwrap(data)
  const signature = useMemo(() => {
    if (extrinsicData?.v) {
      return '0x' + extrinsicData?.r.substring(2) + extrinsicData?.s.substring(2) + toHex(extrinsicData?.v).substring(2)
    }
    return ''
  }, [extrinsicData])

  return (
    <PageContent>
      <Container>
        <div className="flex flex-col gap-4">
          {isLoading ? (
            <LoadingSpinner />
          ) : (
            extrinsicData && (
              <>
                <div className="flex flex-col lg:flex-row gap-1">
                  <div className="text-base">Smart Contract Transaction</div>
                  <div className="text-sm break-all sm:text-base">#{extrinsicData.hash}</div>
                </div>
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
                      <div className="w-48">Status</div>
                      <div>{'Confirmed'}</div>
                    </div>
                    <Divider className="my-2.5" />
                    <div className="flex items-center">
                      <div className="w-48">Tx Hash</div>
                      <div>{extrinsicData.hash}</div>
                    </div>
                    <Divider className="my-2.5" />
                    <div className="flex items-center">
                      <div className="w-48">From</div>
                      <div>
                        <Link href={`/address/${extrinsicData.from_address}`}>{extrinsicData.from_address}</Link>
                      </div>
                    </div>
                    <Divider className="my-2.5" />
                    <div className="flex items-center">
                      <div className="w-48">To</div>
                      <div>
                        <Link href={`/address/${extrinsicData.to_address}`}>{extrinsicData.to_address}</Link>
                      </div>
                    </div>
                    <Divider className="my-2.5" />
                    <div className="flex items-center">
                      <div className="w-48">Value</div>
                      <div>{getBalanceAmount(new BigNumber(extrinsicData.value), PVM_DECIMAL).toFormat()}</div>
                    </div>
                    <Divider className="my-2.5" />
                    <div className="flex items-center">
                      <div className="w-48">Result</div>
                      <div>{extrinsicData.success ? 'Success' : 'Failed'}</div>
                    </div>
                    <Divider className="my-2.5" />
                    <div className="flex items-center">
                      <div className="w-48">Nonce</div>
                      <div>{extrinsicData.nonce}</div>
                    </div>
                    <Divider className="my-2.5" />
                    <div className="flex items-center">
                      <div className="w-48">Input Data</div>
                      <div className="max-h-52 overflow-auto flex-1">
                        <OverflowText text={extrinsicData.input_data} />
                      </div>
                    </div>
                    <Divider className="my-2.5" />
                    <div className="flex items-center">
                      <div className="w-48">Txn Fee</div>
                      <div>
                        {getBalanceAmount(
                          new BigNumber(extrinsicData.gas_used).times(
                            extrinsicData.txn_type === 2 ? extrinsicData.effective_gas_price : extrinsicData.gas_price
                          ),
                          PVM_DECIMAL
                        ).toFormat()}
                      </div>
                    </div>
                    <Divider className="my-2.5" />
                    <div className="flex items-center">
                      <div className="w-48">Signature</div>
                      <div>{signature || '-'}</div>
                    </div>
                  </CardBody>
                </Card>
              </>
            )
          )}
          {!isLoading && !extrinsicData && <LoadingText />}
        </div>
      </Container>
    </PageContent>
  )
}
