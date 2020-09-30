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
  enterpriseEnterprisename?: string;
  enterpriseId?: number;
  courseCourse?: string;
  courseId?: number;
  subjectSubjectTitle?: string;
  subjectId?: number;
  topics?: ITopicMySuffix[];
}

export const defaultValue: Readonly<ITestpaperMySuffix> = {};
