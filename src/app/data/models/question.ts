import { QuestionType } from "./question-type";

export interface Question {
  questionId?: number;
  questionText?: string;
  mandatoryInd?: boolean;
  questionType?: QuestionType;
  options?: string[];
  randomizeOptionsInd?: boolean;
  cards?: string[] | null;
  programmerNotes?: string;
  instructions?: string;
}
