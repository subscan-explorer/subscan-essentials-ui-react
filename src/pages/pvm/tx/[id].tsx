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

export default function Page() {
  const router = useRouter()
  const id = router.query.id as string

  const { data } = usePVMTx({
    hash: id as string,
  })

  const extrinsicData = unwrap(data)
  const signature = useMemo(() => {
    if (extrinsicData?.v) {
      return '0x' + extrinsicData?.r.substring(2) + extrinsicData?.s.substring(2) + toHex(extrinsicData?.v).substring(2)
    }
    return ''
  }, [extrinsicData])

  const inputData = '0x50564d0000d00c010000000000010700c14001c00040038100e3b4186f6b6457e019497f9722a3daaf1344cd1fd0a4f2848be0079c531659145315fbf362efa92104d0b1ca08c53712ee8ebf3f17bffcff6b9c15aecec3dec7856b451053f235b15f76a198a82b93ed06ab6bf56fd094a97111f0e8e9dcc93bf6364c1ae8b94fcbb00a2b00d71c09b3ce419c234a7a7fa7378fb028c46'

  return (
    <PageContent>
      <Container>
        <div className="flex flex-col gap-4">
          {extrinsicData && (
            <>
              <div className="">PVM Transaction #{extrinsicData.hash}</div>
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
                      <Link href={`/pvm/block/${extrinsicData.block_num}`}>{extrinsicData.block_num}</Link>
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
                    <div><Link href={`/pvm/account/${extrinsicData.from_address}`}>{extrinsicData.from_address}</Link></div>
                  </div>
                  <Divider className="my-2.5" />
                  <div className="flex items-center">
                    <div className="w-48">To</div>
                    <div><Link href={`/pvm/account/${extrinsicData.to_address}`}>{extrinsicData.to_address}</Link></div>
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
                    <div className="max-h-52 overflow-auto flex-1" >
                      <OverflowText text={extrinsicData.input_data} />
                    </div>
                  </div>
                  <Divider className="my-2.5" />
                  <div className="flex items-center">
                    <div className="w-48">Txn Fee</div>
                    <div>{getBalanceAmount(new BigNumber(extrinsicData.gas_used).times(extrinsicData.txn_type === 2 ? extrinsicData.effective_gas_price : extrinsicData.gas_price), PVM_DECIMAL).toFormat()}</div>
                  </div>
                  <Divider className="my-2.5" />
                  <div className="flex items-center">
                    <div className="w-48">Signature</div>
                    <div>{signature || '-'}</div>
                  </div>
                </CardBody>
              </Card>
            </>
          )}
        </div>
      </Container>
    </PageContent>
  )
}
