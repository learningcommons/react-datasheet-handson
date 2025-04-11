import {
  DataSheetGrid,
  keyColumn,
  textColumn,
  intColumn,
} from 'react-datasheet-grid'

import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import 'react-datasheet-grid/dist/style.css'
import { FormValues, RowValue, schema } from './type';
import { AcColumn } from './AcColumn';




export const Example = () => {
// 12列のカラム定義を自動生成
const numberColumns = Array.from({ length: 12 }, (_, i) => ({ ...keyColumn(`column-${i + 1}`, textColumn), title:`column-${i + 1}`}))
const options = [
  {label : "hoge", value: "hogeValue"},
  {label : "fuga", value: "fugaValue"},
  {label : "piyo", value: "piyoValue"}
]
const columns = [
  { ...keyColumn(`userName`, textColumn), title:`名前`},
  { ...keyColumn(`empNo`, intColumn), title:`社員番号`},
  { ...keyColumn(`ac`, AcColumn({ items : options})), title:`補完`},
  ...numberColumns
]


// 1000行のデータを自動生成
const data = Array.from({ length: 1000 }, (_, rowIndex) => {
  const row: RowValue = {
    empNo : rowIndex,
    userName : "john miller",
    ac : undefined,
    "column-1" : `Row ${rowIndex + 1} Col 1`,
    "column-2" : `Row ${rowIndex + 1} Col 2`,
    "column-3" : `Row ${rowIndex + 1} Col 3`,
    "column-4" : `Row ${rowIndex + 1} Col 4`,
    "column-5" : `Row ${rowIndex + 1} Col 5`,
    "column-6" : `Row ${rowIndex + 1} Col 6`,
    "column-7" : `Row ${rowIndex + 1} Col 7`,
    "column-8" : `Row ${rowIndex + 1} Col 8`,
    "column-9" : `Row ${rowIndex + 1} Col 9`,
    "column-10" : `Row ${rowIndex + 1} Col 10`,
    "column-11" : `Row ${rowIndex + 1} Col 11`,
  }  
  return row;
});

const methods = useForm<FormValues>({
  defaultValues: {    rows : data  },
  resolver: yupResolver(schema),
  mode: "onChange", // onBlur, onChange両方ともそんなにパフォーマンスは悪くない
});

const { handleSubmit, setValue, watch, formState: { errors } } = methods;

const onSubmit = (data: FormValues) => {  console.log(data);};

const rows = watch("rows");

return (
  <>
  <FormProvider {...methods}>
      <form onSubmit={        
        handleSubmit(onSubmit, (errors) => console.log("error", errors))
      }>
    <DataSheetGrid
      value={rows}
      onChange={(newRows : FormValues) => {
        setValue("rows", newRows)    
      }}
      columns={
        columns
      }
    />
     <button type="submit">送信</button>
      </form>
    </FormProvider>
    </>
);
}

