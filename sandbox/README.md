# このリポジトリで試したこと

- react-datasheet-grid を使用して、yup と react-hook-form を組み合わせたフォームバリデーションの実装
- react-datasheet-grid を使用して、Emotion（CSS in JS）でスタイリングのカスタマイズ

# メモ

## react-datasheet-grid と yup, react-hook-form の組み合わせ

このリポジトリでは、`react-datasheet-grid` を使用してデータグリッドを構築し、`yup` を利用してスキーマベースのバリデーションを実装しています。また、`react-hook-form` を活用してフォームの状態管理を行い、効率的なデータ入力とバリデーションを実現しています。

主なポイント:
- yup を使用して、各行のデータに対するバリデーションルールを定義
- react-hook-form の `useForm` を利用してフォーム全体の状態を管理
- データグリッドの変更をリアルタイムでフォームの状態に反映

## react-datasheet-grid と Emotion（CSS in JS）の組み合わせ

このリポジトリでは、`react-datasheet-grid` のスタイリングを `Emotion` を使用してカスタマイズしています。CSS in JS を活用することで、コンポーネントごとにスタイルを分離し、柔軟なデザイン変更を可能にしています。

主なポイント:
- Emotion の `css` を使用して、データグリッドのセルやヘッダーのスタイルを調整