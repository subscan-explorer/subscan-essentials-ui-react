import React from 'react'
import { CardBody, Card, Tabs, Tab, Divider } from '@heroui/react'
import { useRouter } from 'next/router'
import { getBalanceAmount, getThemeColor } from '@/utils/text'
import { unwrap, usePVMAccounts, usePVMContract } from '@/utils/api'
import { useData } from '@/context'
import { TxTable } from '@/components/tx'
import { Container, PageContent } from '@/ui'
import TokenTransferTable from '@/components/erc20Token/tokenTransferTable'
import BigNumber from 'bignumber.js'
import { Link } from '@/components/link'
import { ContractInfo, ContractVerify } from '@/components/contract'
import { env } from 'next-runtime-env'
import { LoadingSpinner, LoadingText } from '@/components/loading'

export default function Page() {
  const router = useRouter()
  const { metadata, token } = useData()
  const id = router.query.id as string
  const NEXT_PUBLIC_API_HOST = env('NEXT_PUBLIC_API_HOST') || ''
  const { data } = usePVMContract(NEXT_PUBLIC_API_HOST, {
    address: id,
  })

  const { data: accountsData, isLoading } = usePVMAccounts(NEXT_PUBLIC_API_HOST, {
    address: id,
    row: 10,
    page: 0,
  })

  const accountListData = unwrap(accountsData)
  const accountData = accountListData?.list?.[0]
  const contractData = unwrap(data)

  return (
    <PageContent>
      <Container>
        <div className="flex flex-col gap-4">
          {isLoading ? (
            <LoadingSpinner />
          ) : (
            contractData && (
              <>
                <div className="flex flex-col lg:flex-row gap-1">
                  <div className="text-base">Contract</div>
                  <div className="text-sm break-all sm:text-base">#{contractData.address}</div>
                </div>
                <Card>
                  <CardBody>
                    <div className="flex items-center">
                      <div className="w-48">Contract Name</div>
                      <div>{contractData.contract_name}</div>
                    </div>
                    <Divider className="my-2.5" />
                    <div className="flex items-center">
                      <div className="w-48">Creator</div>
                      <div>
                        <Link href={`/address/${contractData.deployer}`}>{contractData.deployer}</Link>
                      </div>
                    </div>
                    <Divider className="my-2.5" />
                    <div className="flex items-center">
                      <div className="w-48">Create At</div>
                      <div>
                        <Link href={`/tx/${contractData.tx_hash}`}>{contractData.tx_hash}</Link>
                      </div>
                    </div>
                    <Divider className="my-2.5" />
                    <div className="flex items-center">
                      <div className="w-48">Balance</div>
                      <div>
                        {getBalanceAmount(new BigNumber(accountData?.balance || 0), token?.decimals).toFormat()} {token?.symbol}
                      </div>
                    </div>
                    <Divider className="my-2.5" />
                  </CardBody>
                </Card>
                <Card>
                  <CardBody>
                    <Tabs aria-label="tabs" variant="underlined" color={getThemeColor()}>
                      <Tab key="contract" title="Contract">
                        {contractData.verify_status === 'verified' ? (
                          <ContractInfo contract={contractData}></ContractInfo>
                        ) : (
                          <ContractVerify address={id} />
                        )}
                      </Tab>
                      <Tab key="transactions" title="Transactions">
                        <TxTable
                          args={{
                            address: id,
                          }}></TxTable>
                      </Tab>
                      <Tab key="erc20" title="ERC-20 Transfers">
                        <TokenTransferTable
                          args={{
                            address: id,
                            category: 'erc20',
                          }}></TokenTransferTable>
                      </Tab>
                      <Tab key="erc721" title="ERC-721 Transfers">
                        <TokenTransferTable
                          args={{
                            address: id,
                            category: 'erc721',
                          }}></TokenTransferTable>
                      </Tab>
                    </Tabs>
                  </CardBody>
                </Card>
              </>
            )
          )}
          {!isLoading && !contractData && <LoadingText />}
        </div>
      </Container>
    </PageContent>
  )
}
