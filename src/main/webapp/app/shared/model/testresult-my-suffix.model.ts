import { Moment } from 'moment';
import { IAnswersheetMySuffix } from 'app/shared/model/answersheet-my-suffix.model';
import { ITestpaperMySuffix } from 'app/shared/model/testpaper-my-suffix.model';

export interface ITestresultMySuffix {
  id?: number;
  positiveMarks?: number;
  negativeMarks?: number;
  score?: number;
  timeTaken?: number;
  date?: Moment;
  studentStudentRegId?: string;
  studentId?: number;
  answersheets?: IAnswersheetMySuffix[];
  testpapers?: ITestpaperMySuffix[];
}

export const defaultValue: Readonly<ITestresultMySuffix> = {};
