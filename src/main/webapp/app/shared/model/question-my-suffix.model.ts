import { IFundamentaldetailMySuffix } from 'app/shared/model/fundamentaldetail-my-suffix.model';
import { IAnswersheetMySuffix } from 'app/shared/model/answersheet-my-suffix.model';

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
  option1?: string;
  option2?: string;
  option3?: string;
  option4?: string;
  multiChoice?: boolean;
  answer?: string;
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
