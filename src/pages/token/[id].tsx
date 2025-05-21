import React from 'react'
import { CardBody, Card, Tabs, Tab, Divider } from '@heroui/react'
import { useRouter } from 'next/router'
import { getBalanceAmount } from '@/utils/text'
import { unwrap, usePVMAccounts, usePVMTokens } from '@/utils/api'
import { useData } from '@/context'
import BigNumber from 'bignumber.js'
import { TransferTable } from '@/components/transfer'
import { TxTable } from '@/components/tx'
import { Container, PageContent } from '@/ui'
import TokenHolderTable from '@/components/erc20Token/tokenHolderTable'
import TokenTransferTable from '@/components/erc20Token/tokenTransferTable'

export default function Page() {
  const router = useRouter()
  const { metadata, token, isLoading } = useData()
  const id = router.query.id as string
  const { data } = usePVMTokens({
    contract: id,
    row: 10,
    page: 0,
  })

  const tokenListData = unwrap(data)
  const tokenData = tokenListData?.list[0]

  return (
    <PageContent>
      <Container>
        <div className="flex flex-col gap-4">
          {tokenData && (
            <>
              <div className="">
                {tokenData.category === 'erc20' ? 'ERC-20 Token' : 'ERC-721 Token'} #{tokenData.contract}
              </div>
              <Card>
                <CardBody>
                  <div className="flex items-center">
                    <div className="w-48">Token Name</div>
                    <div>{tokenData.name}</div>
                  </div>
                  <Divider className="my-2.5" />
                  <div className="flex items-center">
                    <div className="w-48">Token Symbol</div>
                    <div>{tokenData.symbol}</div>
                  </div>
                  <Divider className="my-2.5" />
                  <div className="flex items-center">
                    <div className="w-48">Token Supply</div>
                    <div>{getBalanceAmount(new BigNumber(tokenData.totalSupply), tokenData.decimals).toFormat()}</div>
                  </div>
                  <Divider className="my-2.5" />
                  <div className="flex items-center">
                    <div className="w-48">Decimals</div>
                    <div>{tokenData.decimals}</div>
                  </div>
                  <Divider className="my-2.5" />
                </CardBody>
              </Card>
              <Card>
                <CardBody>
                  <Tabs aria-label="tabs" variant="underlined">
                    <Tab key="holders" title="Holders">
                      <TokenHolderTable
                        token={tokenData}
                        args={{
                          token_address: id,
                        }}></TokenHolderTable>
                    </Tab>
                    <Tab key="transactions" title="Transactions">
                      <TxTable
                        args={{
                          address: id,
                        }}></TxTable>
                    </Tab>
                    <Tab key="transfers" title="Transfers">
                      <TokenTransferTable
                        token={tokenData}
                        args={{
                          token_address: id,
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
