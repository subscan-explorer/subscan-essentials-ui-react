import React, { useMemo, useState } from 'react'

import { BareProps } from '@/types/page'
import {
  Button,
  RadioGroup,
  Radio,
  Input,
  Select,
  SelectItem,
  Textarea,
} from '@heroui/react'
import { unwrap, usePVMResolcs, usePVMSolcs } from '@/utils/api'
import { getThemeColor } from '@/utils/text'
import { FileUpload } from '../file'
import _ from 'lodash'

interface Props extends BareProps {
  address: string
}

const Component: React.FC<Props> = ({ children, className, address }) => {
  const [nightly, setNightly] = useState<string>('false')
  const [compilerType, setCompilerType] = useState<string>('json')
  const [files, setFiles] = useState<any>()
  const [code, setCode] = useState<string>('')
  const [name, setName] = useState<string>('')
  const [target, setTarget] = useState<string>('')
  const [evmVersion, setEvmVersion] = useState<string[]>(['default'])
  const [optimizationRuns, setOptimizationRuns] = useState<string>('200')
  const [optimization, setOptimization] = useState<string>('false')

  const [compiler, setCompiler] = useState<string[]>(['v0.8.18+commit.87f61d96'])
  const [resolc, setResolc] = useState<string[]>(['v0.1.0-dev.12'])
  const evmVersionOptions = useMemo(() => {
    const evmVersionList = [
      'default',
      'london',
      'istanbul',
      'petersburg',
      'constantinople',
      'byzantium',
      'spuriousDragon',
      'tangerineWhistle',
      'homestead',
    ]
    let options: any[] = []
    _.forEach(evmVersionList, (item) => {
      options.push({
        name: item,
        value: item,
      })
    })
    return options
  }, [])
  const { data, error } = usePVMSolcs({
    releases: nightly !== 'true',
  })
  const compilerData = unwrap(data)
  const compilerOptions = useMemo(() => {
    let options: any[] = []
    _.forEach(compilerData, (item) => {
      // "soljson-v0.8.11+commit.d7f03943.js"
      let val = item.slice(8, -3)
      options.push({
        name: val,
        value: val,
      })
    })
    return options
  }, [compilerData])
  const { data: pvmData } = usePVMResolcs({})
  const resolcData = unwrap(pvmData)
  const resolcOptions = useMemo(() => {
    let options: any[] = []
    _.forEach(resolcData, (item) => {
      // "v0.1.0-dev.12"
      options.push({
        name: item,
        value: item,
      })
    })
    return options
  }, [resolcData])
  const reset = () => {
    window.location.reload()
  }
  
  return (
    <div className="space-y-5">
      <div>
        <RadioGroup
          value={compilerType}
          onValueChange={setCompilerType}
          label="Compiler Type"
          orientation="horizontal"
          classNames={{
            label: 'text-black',
          }}>
          <Radio value="json">Solidity (Standard-JSON-Input)</Radio>
          <Radio value="single">Solidity (Single file)</Radio>
        </RadioGroup>
      </div>
      <div>
        <div className="mb-2">Contract Name</div>
        <Input value={name} onValueChange={setName} label="" name="contract_name" placeholder="Optional" type="text" />
      </div>
      <div>
        <RadioGroup
          value={nightly}
          onValueChange={setNightly}
          label="Include nightly builds"
          orientation="horizontal"
          classNames={{
            label: 'text-black',
          }}>
          <Radio value="true">Yes</Radio>
          <Radio value="false">No</Radio>
        </RadioGroup>
      </div>
      {compilerType === 'single' && (
        <div>
          <div className="mb-2">PVM Version</div>
          <Select
            className="max-w-xs"
            label=""
            selectedKeys={evmVersion}
            onSelectionChange={(key) => {
              if (key.currentKey) {
                setEvmVersion([key.currentKey])
              }
            }}>
            {evmVersionOptions.map((item) => (
              <SelectItem key={item.value}>{item.name}</SelectItem>
            ))}
          </Select>
        </div>
      )}
      <div>
        <div className="mb-2">Compiler Version</div>
        <Select
          className="max-w-xs"
          label=""
          selectedKeys={compiler}
          onSelectionChange={(key) => {
            if (key.currentKey) {
              setCompiler([key.currentKey])
            }
          }}>
          {compilerOptions.map((item) => (
            <SelectItem key={item.value}>{item.name}</SelectItem>
          ))}
        </Select>
      </div>
      <div>
        <div className="mb-2">Resolc Version</div>
        <Select
          className="max-w-xs"
          label=""
          selectedKeys={resolc}
          onSelectionChange={(key) => {
            if (key.currentKey) {
              setResolc([key.currentKey])
            }
          }}>
          {resolcOptions.map((item) => (
            <SelectItem key={item.value}>{item.name}</SelectItem>
          ))}
        </Select>
      </div>
      {compilerType === 'single' && (
        <>
          <div>
            <RadioGroup
              value={optimization}
              onValueChange={setOptimization}
              label="Optimization"
              orientation="horizontal"
              classNames={{
                label: 'text-black',
              }}>
              <Radio value="true">Yes</Radio>
              <Radio value="false">No</Radio>
            </RadioGroup>
          </div>
          {optimization === 'true' ? (
            <div>
              <div className="mb-2">Optimization runs</div>
              <Input value={optimizationRuns} onValueChange={setOptimizationRuns} label="" name="optimization_runs" placeholder="" type="text" />
            </div>
          ) : null}
        </>
      )}
      {compilerType === 'json' && (
        <div>
          <div className="mb-2">Upload the Standard-Input-JSON (*.json) File</div>
          <FileUpload onChange={setFiles} value={files}></FileUpload>
        </div>
      )}
      {compilerType === 'single' && (
        <div>
          <div className="mb-2">Enter the Solidity Contract Code</div>
          <Textarea
            value={code}
            onValueChange={setCode}
            minRows={10}
            placeholder=""
          />
        </div>
      )}
      {compilerType === 'single' && (
        <div>
          <div className="mb-2">Compilation Target</div>
          <Input
            value={target}
            onValueChange={setTarget}
            label=""
            name="contract_name"
            placeholder='Optional: File and name of the contract or library this metadata is created for, such as "myFile.sol"'
            type="text"
          />
        </div>
      )}
      <div className="flex gap-4">
        <Button color={getThemeColor()}>Verify & Publish</Button>
        <Button onPress={reset}>Reset</Button>
      </div>
    </div>
  )
}

export default Component
