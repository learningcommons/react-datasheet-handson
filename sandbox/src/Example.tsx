import { useState } from 'react'
import {
  DataSheetGrid,
  keyColumn,
  textColumn,
} from 'react-datasheet-grid'

// データの型定義
type RowData = {
  [key: string]: string; // すべてのカラムが文字列を持つ
};

// Import the style only once in your app!
import 'react-datasheet-grid/dist/style.css'
import { useForm } from 'react-hook-form';

export const Example = () => {

// 12列のカラム定義を自動生成
const columns = Array.from({ length: 12 }, (_, i) => ({ ...keyColumn(`column-${i + 1}`, textColumn), title:`column-${i + 1}`}))

// 1000行のデータを自動生成
const rows = Array.from({ length: 1000 }, (_, rowIndex) => {
  const row: RowData = {};
  for (let colIndex = 1; colIndex <= 12; colIndex++) {
    row[`column-${colIndex}`] = `Row ${rowIndex + 1} Col ${colIndex}`;
  }
  return row;
});

const defaultValues = { data : rows}

const { setValue, handleSubmit, watch } = useForm({
  defaultValues,
});

const data = watch("data"); // データ変更を監視

const onSubmit = (formData : any) => {
  console.log("送信データ:", formData);
};

return (
  <form onSubmit={handleSubmit(onSubmit)}>
    <DataSheetGrid
      value={data}
      onChange={(newData) => {
        console.log(newData)
        setValue("data", newData, { shouldDirty: true })
      }}
      columns={
        columns
      }
    />
    <button type="submit">送信</button>
  </form>
);
}