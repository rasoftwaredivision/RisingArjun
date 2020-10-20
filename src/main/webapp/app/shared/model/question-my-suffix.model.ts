import { IFundamentaldetailMySuffix } from 'app/shared/model/fundamentaldetail-my-suffix.model';
import { IAnswersheetMySuffix } from 'app/shared/model/answersheet-my-suffix.model';

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

export const enum Questionlevel {
  BEGINNERS = 'BEGINNERS',
  MODERATE = 'MODERATE',
  ADVANCE = 'ADVANCE'
}

export const enum Questionstatus {
  CREATED = 'CREATED',
  REWRITE = 'REWRITE',
  APPROVED = 'APPROVED'
}

export interface IQuestionMySuffix {
  id?: number;
  question?: any;
  questionDiagramContentType?: string;
  questionDiagram?: any;
  optionA?: string;
  optionB?: string;
  optionC?: string;
  optionD?: string;
  multiChoice?: boolean;
  answer?: Answeroption;
  maxMarks?: number;
  negativeMarks?: number;
  durationMins?: number;
  level?: Questionlevel;
  solution?: string;
  ansDiagramContentType?: string;
  ansDiagram?: any;
  video?: string;
  status?: Questionstatus;
  enterpriseEnterprisename?: string;
  enterpriseId?: number;
  courseCourse?: string;
  courseId?: number;
  subjectSubjectTitle?: string;
  subjectId?: number;
  topicTopicTitle?: string;
  topicId?: number;
  writerEmployeeId?: string;
  writerId?: number;
  approverEmployeeId?: string;
  approverId?: number;
  fundamentals?: IFundamentaldetailMySuffix[];
  answersheets?: IAnswersheetMySuffix[];
}

export const defaultValue: Readonly<IQuestionMySuffix> = {
  multiChoice: false
};
