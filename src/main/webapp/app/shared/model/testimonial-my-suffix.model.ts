import { Moment } from 'moment';

export interface ITestimonialMySuffix {
  id?: number;
  remarks?: string;
  date?: Moment;
  rating?: number;
  studentStudentRegId?: string;
  studentId?: number;
}

export const defaultValue: Readonly<ITestimonialMySuffix> = {};
