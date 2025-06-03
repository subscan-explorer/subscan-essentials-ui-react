import React from 'react'
import { CardBody, Card, Tabs, Tab } from '@heroui/react'
import { useRouter } from 'next/router'
import { getBalanceAmount, getThemeColor } from '@/utils/text'
import { unwrap, usePVMAccounts } from '@/utils/api'
import { useData } from '@/context'
import BigNumber from 'bignumber.js'
import { TxTable } from '@/components/tx'
import { Container, PageContent } from '@/ui'
import TokenTransferTable from '@/components/erc20Token/tokenTransferTable'
import TokenTable from '@/components/pvmAccount/tokenTable'
import { env } from 'next-runtime-env'
import { LoadingSpinner, LoadingText } from '@/components/loading'

export default function Page() {
  const router = useRouter()
  const { metadata, token } = useData()
  const id = router.query.id as string
  const NEXT_PUBLIC_API_HOST = env('NEXT_PUBLIC_API_HOST') || ''
  const { data, isLoading } = usePVMAccounts(NEXT_PUBLIC_API_HOST, {
    address: id,
    row: 10,
    page: 0,
  })

  const accountListData = unwrap(data)
  const accountData = accountListData?.list?.[0]

  return (
    <PageContent>
      <Container>
        <div className="flex flex-col gap-4">
          {isLoading ? (
            <LoadingSpinner />
          ) : (
            accountData && (
              <>
                <div className="flex flex-col lg:flex-row gap-1">
                  <div className="text-base">Account</div>
                  <div className="text-sm break-all sm:text-base">#{accountData.evm_account}</div>
                </div>
                <Card>
                  <CardBody>
                    <div className="flex items-center">
                      <div className="w-48">Balance</div>
                      <div>
                        {getBalanceAmount(new BigNumber(accountData.balance), token?.decimals).toFormat()} {token?.symbol}
                      </div>
                    </div>
                  </CardBody>
                </Card>
                <Card>
                  <CardBody>
                    <Tabs aria-label="tabs" variant="underlined" color={getThemeColor()}>
                      <Tab key="erc20" title="ERC-20 Tokens">
                        <TokenTable
                          args={{
                            address: id,
                            category: 'erc20',
                          }}></TokenTable>
                      </Tab>
                      <Tab key="erc721" title="ERC-721 Tokens">
                        <TokenTable
                          args={{
                            address: id,
                            category: 'erc721',
                          }}></TokenTable>
                      </Tab>
                      <Tab key="transactions" title="Transactions">
                        <TxTable
                          args={{
                            address: id,
                          }}></TxTable>
                      </Tab>
                      <Tab key="transfers" title="Transfers">
                        <TokenTransferTable
                          args={{
                            address: id,
                          }}></TokenTransferTable>
                      </Tab>
                    </Tabs>
                  </CardBody>
                </Card>
              </>
            )
          )}
          {!isLoading && !accountData && <LoadingText />}
        </div>
      </Container>
    </PageContent>
  )
}
