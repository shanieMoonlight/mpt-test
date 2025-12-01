import { QuestionType } from "../../data/models/question-type";

export interface QuestionTypeMenuItem {
  type: QuestionType;
  icon: string;
  label: string;
}