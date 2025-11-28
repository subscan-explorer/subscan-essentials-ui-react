import React from 'react'
import { Button } from '@heroui/react'
import { BareProps } from '@/types/page'
import { themeType } from '@/utils/text'

interface PaginationInfo {
  start_cursor: number
  end_cursor: number
  has_next_page: boolean
  has_previous_page: boolean
}

interface Props extends BareProps {
  pagination?: PaginationInfo
  onPrevious: () => void
  onNext: () => void
  color?: themeType
  showPageNumber?: boolean
  currentPage?: number
}

const Component: React.FC<Props> = ({
  pagination,
  onPrevious,
  onNext,
  color = 'primary',
  showPageNumber = false,
  currentPage = 1,
  className,
}) => {
  return (
    <div className={`flex w-full justify-center items-center gap-2 ${className || ''}`}>
      <Button
        size="sm"
        variant="flat"
        color={color}
        isDisabled={!pagination?.has_previous_page}
        onPress={onPrevious}
      >
        Previous
      </Button>
      {showPageNumber && <span className="text-sm">Page {currentPage}</span>}
      <Button
        size="sm"
        variant="flat"
        color={color}
        isDisabled={!pagination?.has_next_page}
        onPress={onNext}
      >
        Next
      </Button>
    </div>
  )
}

export default Component
