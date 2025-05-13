import React, { useMemo } from 'react'
import { CardBody, Card, Divider, Tabs, Tab } from '@heroui/react'
import { useRouter } from 'next/router'
import { getBalanceAmount } from '@/utils/text'
import { unwrap, useAccount } from '@/utils/api'
import { useData } from '@/context'
import BigNumber from 'bignumber.js'
import { ExtrinsicTable } from '@/components/extrinsic'
import { TransferTable } from '@/components/transfer'
import { BIG_ZERO } from '@/utils/const'

export default function Page() {
  const router = useRouter()
  const { metadata, token, isLoading } = useData()
  const id = router.query.id as string
  const { data } = useAccount({
    address: id,
  })

  const accountData = unwrap(data)

  const transferable = useMemo(() => {
    if (accountData) {
      let pre = new BigNumber(accountData.balance).minus(accountData.locked).minus(accountData.reserved)
      if (metadata?.enabledNewTransferableFormulas) {
        if (new BigNumber(accountData.locked).isGreaterThan(new BigNumber(accountData.reserved))) {
          pre = new BigNumber(accountData.balance).minus(accountData.locked)
        } else {
          pre = new BigNumber(accountData.balance).minus(accountData.reserved)
        }
      }
      return pre.lt(0) ? BIG_ZERO : pre
    } else {
      return BIG_ZERO
    }
  }, [accountData?.reserved, accountData?.locked, accountData?.balance, metadata?.enabledNewTransferableFormulas])

  return (
    <div className="flex flex-col gap-4 p-4">
      {accountData && (
        <>
          <div className="">Account #{accountData.address}</div>
          <Card>
            <CardBody>
              <div className="flex items-center">
                <div className="w-48">Total Balance</div>
                <div>{getBalanceAmount(new BigNumber(accountData.balance), token?.decimals).toFormat()}</div>
              </div>
              <Divider className="my-2.5" />
              <div className="flex items-center">
                <div className="w-48">Transferrable</div>
                <div>{getBalanceAmount(transferable, token?.decimals).toFormat()}</div>
              </div>
              <Divider className="my-2.5" />
              <div className="flex items-center">
                <div className="w-48">Locked</div>
                <div>{getBalanceAmount(new BigNumber(accountData.locked), token?.decimals).toFormat()}</div>
              </div>
              <Divider className="my-2.5" />
              <div className="flex items-center">
                <div className="w-48">Reserved</div>
                <div>{getBalanceAmount(new BigNumber(accountData.reserved), token?.decimals).toFormat()}</div>
              </div>
            </CardBody>
          </Card>
          <Card>
            <CardBody>
              <Tabs aria-label="tabs" variant="underlined">
                <Tab key="extrinsics" title="Extrinsics">
                  <ExtrinsicTable
                    args={{
                      address: id,
                    }}></ExtrinsicTable>
                </Tab>
                <Tab key="transfers" title="Transfers">
                  <TransferTable
                    args={{
                      address: id,
                    }}></TransferTable>
                </Tab>
              </Tabs>
            </CardBody>
          </Card>
        </>
      )}
    </div>
  )
}
