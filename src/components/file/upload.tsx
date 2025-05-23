import React from 'react'
import 'filepond/dist/filepond.min.css'
import { BareProps } from '@/types/page'
import { FilePond, FilePondProps } from 'react-filepond'

interface Props extends BareProps {
  allowMultiple?: boolean
  value?: FilePondProps['files']
  onChange?: (e: any) => void
}

const Component: React.FC<Props> = ({ onChange, allowMultiple, value, className }) => {
  return (
    <FilePond
      files={value}
      credits={false}
      allowMultiple={allowMultiple}
      onupdatefiles={onChange}
      labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'></FilePond>
  )
}

export default Component
