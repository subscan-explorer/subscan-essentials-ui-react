import React from 'react'
import { CardBody, Card, Tabs, Tab } from '@heroui/react'
import { useRouter } from 'next/router'
import { getBalanceAmount } from '@/utils/text'
import { unwrap, usePVMAccounts } from '@/utils/api'
import { useData } from '@/context'
import BigNumber from 'bignumber.js'
import { TxTable } from '@/components/tx'
import { Container, PageContent } from '@/ui'
import TokenTransferTable from '@/components/erc20Token/tokenTransferTable'
import TokenTable from '@/components/pvmAccount/tokenTable'

export default function Page() {
  const router = useRouter()
  const { metadata, token, isLoading } = useData()
  const id = router.query.id as string
  const { data } = usePVMAccounts({
    address: id,
    row: 10,
    page: 0,
  })

  const accountListData = unwrap(data)
  const accountData = accountListData?.list[0]

  return (
    <PageContent>
      <Container>
        <div className="flex flex-col gap-4">
          {accountData && (
            <>
              <div className="">Account #{accountData.evm_account}</div>
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
                  <Tabs aria-label="tabs" variant="underlined">
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
          )}
        </div>
      </Container>
    </PageContent>
  )
}
