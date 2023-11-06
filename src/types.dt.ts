declare type ID = `${string}-${string}-${string}-${string}-${string}` | string;

declare type Kind = "multipleChoice" | "multipleResponse" | "matching" | "ordering" | "trueOrFalse";

declare interface Option {
  _id: ID, name: string, order: number
}

declare interface MultipleChoice {
  kind: "multipleChoice",
  name: string,
  _id: ID,
  options: Option[],
  correct: ID,
}

declare interface MultipleResponse {
  kind: "multipleResponse",
  name: string,
  _id: ID,
  options: {_id: ID, name: string, isCorrect: boolean, order: number}[]
}

declare interface Matching {
  kind: "matching",
  name: string,
  _id: ID,
  matching: {_id: ID, name: string, matches: number, order: number}[]
  matched: Option[]
}

declare interface Ordering {
  kind: "ordering",
  name: string,
  _id: ID
  options: Option[]
}

declare interface TrueOrFalse {
  kind: "trueOrFalse",
  name: string,
  _id: ID,
  isCorrect: boolean
}

declare type QuestionType = MultipleChoice | MultipleResponse | Matching | Ordering | TrueOrFalse