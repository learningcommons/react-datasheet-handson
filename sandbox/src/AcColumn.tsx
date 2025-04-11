import React, { useLayoutEffect} from 'react'
import { CellProps, Column } from 'react-datasheet-grid'
import { AcInput } from './AcComponent'

type Item = {
    label: string
    value: string
  }
  
  type SelectOptions = {
    items: Item[]
  }

  
  const CellComponentPart = React.memo(
    ({
      rowData,
      setRowData,
      focus,
      stopEditing,
      columnData,
    }: CellProps<string, SelectOptions>) => {
      const inputRef = React.useRef<HTMLInputElement>(null);
      const defaultValue = columnData.items.find(({ value }) => value === rowData) ?? null

      useLayoutEffect(() => {
        if (focus) {
            inputRef.current?.focus()
        } else {
            // inputRef.current?.blur()
        }
      }, [focus])
  
      return (
        <>
        <AcInput
            inputRef={inputRef} 
            // onBlur={undefined} 
            // onFocus={undefined} 
            // onKeyDown={undefined} 
            defaultValue={defaultValue?.value}
            onChange={(cellData) => {
              if (cellData === null) return;
                setRowData(cellData);
                setTimeout(stopEditing, 0);
            }}
            items={columnData.items}       
         >
            </AcInput>
        
        </>
 
      )
    }
  )
  
export const AcColumn = (
    options: SelectOptions
  ): Column<string | null, SelectOptions> => ({
    component: CellComponentPart,
    columnData: options,
    disableKeys: true,
    keepFocus: true,
    deleteValue: () => null,
    copyValue: ({ rowData }) =>
      options.items.find((item) => item.value === rowData)?.label ?? null,
    pasteValue: ({ value }) =>
      options.items.find((item) => item.label === value)?.value ?? null,
  })
  