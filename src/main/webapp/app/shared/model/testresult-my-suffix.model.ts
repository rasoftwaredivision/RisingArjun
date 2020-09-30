import { Moment } from 'moment';

export interface ITestresultMySuffix {
  id?: number;
  positiveMarks?: number;
  negativeMarks?: number;
  score?: number;
  timeTaken?: number;
  date?: Moment;
  studentStudentRegId?: string;
  studentId?: number;
  testPaperIdId?: number;
}

export const defaultValue: Readonly<ITestresultMySuffix> = {};
