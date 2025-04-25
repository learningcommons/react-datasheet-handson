import { createTheme } from "@mui/material";

export const DataSheetGridInputTheme = createTheme({
  components: {
    // TextField 関連のコンポーネントのスタイルを調整する
    MuiInputLabel: {
      styleOverrides: {
        formControl: {
          // 移動をクリック時に動かないように固定
          position: "static",
          transform: "none",
          transition: "none",
          // クリックを可能に
          pointerEvents: "auto",
          cursor: "pointer",
          // 幅いっぱいを解除
          display: "inline",
          alignSelf: "start",
          // タイポグラフィを指定
          fontWeight: "bold",
          fontSize: "0.75rem",
          // テーマの Composition を使えば以下のようにも書ける
          // base.typography.subtitle2
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          // デフォルトだと、
          // ラベルをはみ出させるための小さなmarginがある
          marginTop: 0,
        },
        input: {
          paddingTop: "10px",
          paddingBottom: "8px",
          height: "100%",
        },
        notchedOutline: {
          // デフォルトだと、 position が absolute、
          // ラベルをはみ出させるため上に少しの余白がある
          top: 0,
          display : "none",
          "legend" : {
            // 内包された legend 要素によって、四角の左側の切り欠きが実現されているので、
            // 表示されないように。
            // (SCSS と同様にネスト記述が可能です。)
            display: "none",
          },
        },
      },
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          // フォーム下部のテキスト、エラーメッセージ
          // お好みで左余白を無くしています。
          marginLeft: 0,
        },
      },
    },
  },
});