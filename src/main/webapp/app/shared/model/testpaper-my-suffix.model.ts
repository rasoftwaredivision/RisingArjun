import { IEnterpriseMySuffix } from 'app/shared/model/enterprise-my-suffix.model';
import { ITestresultMySuffix } from 'app/shared/model/testresult-my-suffix.model';
import { ITopicMySuffix } from 'app/shared/model/topic-my-suffix.model';

export const enum Questionlevel {
  BEGINNERS = 'BEGINNERS',
  MODERATE = 'MODERATE',
  ADVANCE = 'ADVANCE'
}

export interface ITestpaperMySuffix {
  id?: number;
  maxMarks?: number;
  durationMins?: number;
  level?: Questionlevel;
  courseCourse?: string;
  courseId?: number;
  subjectSubjectTitle?: string;
  subjectId?: number;
  enterprises?: IEnterpriseMySuffix[];
  testresults?: ITestresultMySuffix[];
  topics?: ITopicMySuffix[];
}

export const defaultValue: Readonly<ITestpaperMySuffix> = {};
