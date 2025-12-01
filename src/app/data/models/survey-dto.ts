import { Question } from './question';

export interface SurveyDto {
  id?: string;
  title?: string;
  description?: string;
  questions?: Question[];
}
