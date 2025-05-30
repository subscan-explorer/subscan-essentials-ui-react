import React from 'react'

import { BareProps } from '@/types/page'
import { pvmContractInfoType } from '@/utils/api'
import _ from 'lodash'
import JsonView from '@uiw/react-json-view'
import { OverflowText } from '../overflowText'

interface Props extends BareProps {
  contract: pvmContractInfoType
}

const Component: React.FC<Props> = ({ children, className, contract }) => {
  return (
    <div className="space-y-5">
      <div>
        <div className="mb-2">Contract Information</div>
        <div className="grid lg:grid-cols-4 gap-2.5 py-5 bg-default-200">
          <div className="pl-5">
            <div className="mt-5 mb-1">Contract Name</div>
            <div>{contract.contract_name || '-'}</div>
          </div>
          <div className="pl-5">
            <div className="mt-5 mb-1">Compiler</div>
            <div>{contract.compiler_version || '-'}</div>
          </div>
          <div className="pl-5">
            <div className="mt-5 mb-1">PVM Version</div>
            <div>{contract.evm_version || '-'}</div>
          </div>
          <div className="pl-5">
            <div className="mt-5 mb-1">Optimization</div>
            {contract.optimize ? (
              <div>{`${contract.optimize} with ${contract.optimization_runs} runs`}</div>
            ) : (
              <div>{`${contract.optimize}` || '-'}</div>
            )}
          </div>
          {!_.isEmpty(contract.CompileSettings?.revive_version) && (
            <div className="pl-5 col-span-2">
              <div className="mt-5 mb-1">Revive Version</div>
              <div>{contract.CompileSettings?.revive_version || '-'}</div>
            </div>
          )}
        </div>
      </div>
      <div>
        <div className="mb-2">Contract ABI</div>
        <div>
          <JsonView collapsed={2} value={contract.abi || {}}></JsonView>
        </div>
      </div>
      <div>
        <div className="mb-2">Contract Source Code</div>
        <div>
          <OverflowText text={contract.source_code} />
        </div>
      </div>
      <div>
        <div className="mb-2">Contract Byte Code</div>
        <div>
          <OverflowText text={contract.creation_code} />
        </div>
      </div>
    </div>
  )
}

export default Component
