import { IQuestionMySuffix } from 'app/shared/model/question-my-suffix.model';
import { ITestresultMySuffix } from 'app/shared/model/testresult-my-suffix.model';

export const enum Answeroption {
  A = 'A',
  B = 'B',
  C = 'C',
  D = 'D',
  A_B = 'A_B',
  A_C = 'A_C',
  A_D = 'A_D',
  B_C = 'B_C',
  B_D = 'B_D',
  C_D = 'C_D',
  A_B_C = 'A_B_C',
  A_B_D = 'A_B_D',
  A_C_D = 'A_C_D',
  B_C_D = 'B_C_D',
  A_B_C_D = 'A_B_C_D'
}

export const enum Answerstatus {
  DRAFT = 'DRAFT',
  FINAL = 'FINAL'
}

export interface IAnswersheetMySuffix {
  id?: number;
  answer?: Answeroption;
  marks?: number;
  status?: Answerstatus;
  questions?: IQuestionMySuffix[];
  testresults?: ITestresultMySuffix[];
}

export const defaultValue: Readonly<IAnswersheetMySuffix> = {};
