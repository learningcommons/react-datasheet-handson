import React, { KeyboardEventHandler, useLayoutEffect, useRef, useState } from 'react'
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import { DataSheetGridInputTheme } from './DataSheetGridInputTheme';
import { ThemeProvider } from '@mui/material';

// イメージは { constItem : { fieldType: ImplFieldType.String,textValue: acItem.constOption.value} | ... } | { systemItemCode : {}}
type MappingAcItem = string 

type Props<CellData extends MappingAcItem> = {
  inputRef : React.RefObject<HTMLInputElement | null>
  onChange : (cell : CellData) => void;
  // onBlur : InputProps["onBlur"]
  // onFocus : InputProps["onFocus"]
  // onKeyDown : KeyboardEventHandler<HTMLDivElement> | undefined
  // ReactDataSheetGridは、setRowDataでセルに値を代入してTable自体にバブリングさせていく。
  // MappingAcInputは、onSelectAcItemやonBlurをそっちに繋げてやる必要がある。
  // Compomnent単位では、CellValueとして連携して、setRowData()
  defaultValue?: CellData
  // cell: [CellData, (cellData: CellData) => void];
  items : Choice[]  
}

type Choice = {
  label: string
  description? : string
  value: string
}


export const AcInput: React.FC<Props<string>> = ({
  onChange,
  inputRef,
  defaultValue,

  // onBlur,
  // onFocus,
  // onKeyDown,
  items
}) => {
  const initialValue = React.useMemo( () => defaultValue, [defaultValue])
    const ref = React.useMemo<React.RefObject<HTMLInputElement | null>>(() => {
      if (inputRef) {
        return inputRef;
      }
      return React.createRef();
    }, [inputRef]);

    const menuItems  = items.map((item, index) => (
      <MenuItem key={item.value} value={item.value} id={`value${index}`}>
        {item.description ? <ListItemText primary={item.label} secondary={item.description} /> : item.label}
      </MenuItem>
    ))
    
    return (
      <>
      <ThemeProvider theme={DataSheetGridInputTheme}>
      <TextField
        autoFocus={false}
        margin="dense"
        defaultValue={initialValue}
        fullWidth
        select
        inputRef={ref}
        sx={{ backgroundColor: "common.white", m: 0, height: "100%" }}
        onChange={(e) => {
          onChange(e.target.value)
        }}
        // onFocus={onFocus}
        // onBlur={onBlur}
        // onKeyDown={onKeyDown}
        autoComplete="off"
      >
      {menuItems}
      </TextField>
      </ThemeProvider>
    </>
    )
  }
