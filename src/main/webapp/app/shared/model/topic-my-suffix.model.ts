import { ITestpaperMySuffix } from 'app/shared/model/testpaper-my-suffix.model';

export interface ITopicMySuffix {
  id?: number;
  topicId?: string;
  topicTitle?: string;
  courseCourse?: string;
  courseId?: number;
  subjectSubjectTitle?: string;
  subjectId?: number;
  testpapers?: ITestpaperMySuffix[];
}

export const defaultValue: Readonly<ITopicMySuffix> = {};
