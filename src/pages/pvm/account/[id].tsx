import React, { useMemo } from 'react'
import { CardBody, Card, Divider, Tabs, Tab } from '@heroui/react'
import { useRouter } from 'next/router'
import { getBalanceAmount } from '@/utils/text'
import { unwrap, useAccount, usePVMAccount } from '@/utils/api'
import { useData } from '@/context'
import BigNumber from 'bignumber.js'
import { ExtrinsicTable } from '@/components/extrinsic'
import { TransferTable } from '@/components/transfer'
import { BIG_ZERO } from '@/utils/const'

export default function Page() {
  const router = useRouter()
  const { metadata, token, isLoading } = useData()
  const id = router.query.id as string
  const { data } = usePVMAccount({
    address: id,
  })

  const accountData = unwrap(data)

  return (
    <div className="flex flex-col gap-4 p-6">
      {accountData && (
        <>
          <div className="">Account #{accountData.evm_account}</div>
          <Card>
            <CardBody>
              <div className="flex items-center">
                <div className="w-48">Total Balance</div>
                <div>{getBalanceAmount(new BigNumber(accountData.balance), token?.decimals).toFormat()}</div>
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
