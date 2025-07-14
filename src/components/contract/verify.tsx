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
  addToast,
} from '@heroui/react'
import { unwrap, usePVMResolcs, usePVMSolcs } from '@/utils/api'
import { getThemeColor, parseFileText } from '@/utils/text'
import { FileUpload } from '../file'
import _ from 'lodash'
import axios from 'axios'
import qs from 'qs'
import { Link } from '../link'
import { env } from 'next-runtime-env'

interface Props extends BareProps {
  address: string
}

const Component: React.FC<Props> = ({ children, className, address }) => {
  const NEXT_PUBLIC_API_HOST = env('NEXT_PUBLIC_API_HOST') || ''
  const [isLoading, setIsLoading] = useState<boolean>(false)
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
  const { data, error } = usePVMSolcs(NEXT_PUBLIC_API_HOST, {
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
  const { data: pvmData } = usePVMResolcs(NEXT_PUBLIC_API_HOST, {})
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
  const submitForm = async () => {
    let verifyApi = {
      path: '/api/plugin/evm/etherscan?module=contract&action=verifysourcecode',
    }
    if (compilerType === 'json') {
      if (!files) {
        addToast({
            title: 'Warning',
            description: 'Please upload the Standard-Input-JSON file.',
            color: 'warning',
          });
        return
      }
    } else if (compilerType === 'single') {
      if (!code) {
        addToast({
            title: 'Warning',
            description: 'Please enter the Solidity contract code.',
            color: 'warning',
          });
        return
      }
    }
    let formData
    if (compilerType === 'json') {
      const file = files?.[0]?.file
      try {
        const jsonString = await parseFileText(file)
        formData = new FormData()
        formData.append('codeformat', 'solidity-standard-json-input')
        formData.append('module', 'contract')
        formData.append('action', 'verifysourcecode')
        formData.append('sourceCode', jsonString as string)
        if (name) {
          formData.append('contractname', name)
        }
        formData.append('contractaddress', address)
        formData.append('compilerversion', compiler[0])
        formData.append('resolcVersion', resolc[0])
      } catch (e) {}
    } else {
      let data: any = {
        contractaddress: address,
        codeformat: 'solidity-single-file',
        compilerversion: compiler[0],
        optimizationUsed: optimization === 'true' ? 1 : 0,
        sourceCode: code,
        resolcVersion: resolc[0],
      }
      if (optimization === 'true') {
        data['runs'] = optimizationRuns
      }
      if (target) {
        data['compilation_target'] = target
      }
      if (name) {
        data['contractname'] = name
      }
      if (evmVersion[0] !== 'default') {
        data['evmversion'] = evmVersion[0]
      }
      formData = qs.stringify(data)
    }
    setIsLoading(true)
    axios({
      url: verifyApi.path,
      method: 'POST',
      baseURL: `${NEXT_PUBLIC_API_HOST}`,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      timeout: 60000,
      data: formData,
    })
      .then((res) => {
        if (res.data.status === 0) {
          addToast({
            title: 'Error',
            description: res.data.result || res.data.message,
            color: 'danger',
          });
        } else {
          window.location.reload()
        }
        setIsLoading(false)
      })
      .catch((err) => {
        addToast({
            title: 'Error',
            description: err.response?.data?.result || err.message,
            color: 'danger',
          });
        setIsLoading(false)
      })
  }
  
  return (
    <div className="space-y-5 relative">
      <div className='absolute right-2 z-10'>
        <Link target="_blank" href="https://github.com/subscan-explorer/subscan-essentials/blob/master/docs/pvm_contract_verify.md">
          <Button>Verify Guide</Button>
        </Link>
      </div>
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
          <div className="mb-2">Smart Contract Version</div>
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
        <Button isLoading={isLoading} color={getThemeColor()} onPress={submitForm}>Verify & Publish</Button>
        <Button onPress={reset}>Reset</Button>
      </div>
    </div>
  )
}

export default Component
