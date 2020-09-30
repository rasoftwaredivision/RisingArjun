import { IQuestionMySuffix } from 'app/shared/model/question-my-suffix.model';

export interface IAnswersheetMySuffix {
  id?: number;
  answer?: string;
  marks?: number;
  testResultIdId?: number;
  questions?: IQuestionMySuffix[];
}

export const defaultValue: Readonly<IAnswersheetMySuffix> = {};
