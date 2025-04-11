import * as yup from "yup";

// スキーマ定義：行ごと
  const rowSchema = yup.object({
    userName: yup.string().required("名前は必須です"),
    empNo: yup.number().required("年齢は必須です").typeError("年齢は数値で入力してください"),
    ac: yup.string(),
    "column-1": yup.string(),
    "column-2": yup.string(),
    "column-3": yup.string(),
    "column-4": yup.string(),
    "column-5": yup.string(),
    "column-6": yup.string(),
    "column-7": yup.string(),
    "column-8": yup.string(),
    "column-9": yup.string(),
    "column-10": yup.string(),
    "column-11": yup.string(),
  }).required();
  
  // スキーマ：全体（配列）
export const schema = yup.object({
    rows: yup.array().of(rowSchema).required(),
  });
  
export type RowValue = yup.InferType<typeof rowSchema>;
export type FormValues = yup.InferType<typeof schema>