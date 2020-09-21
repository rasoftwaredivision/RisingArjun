import { combineReducers } from 'redux';
import { loadingBarReducer as loadingBar } from 'react-redux-loading-bar';

import locale, { LocaleState } from './locale';
import authentication, { AuthenticationState } from './authentication';
import applicationProfile, { ApplicationProfileState } from './application-profile';

import administration, { AdministrationState } from 'app/modules/administration/administration.reducer';
import userManagement, { UserManagementState } from 'app/modules/administration/user-management/user-management.reducer';
import register, { RegisterState } from 'app/modules/account/register/register.reducer';
import activate, { ActivateState } from 'app/modules/account/activate/activate.reducer';
import password, { PasswordState } from 'app/modules/account/password/password.reducer';
import settings, { SettingsState } from 'app/modules/account/settings/settings.reducer';
import passwordReset, { PasswordResetState } from 'app/modules/account/password-reset/password-reset.reducer';
// prettier-ignore
import userdetail, {
  UserdetailMySuffixState
} from 'app/entities/userdetail-my-suffix/userdetail-my-suffix.reducer';
// prettier-ignore
import userpreference, {
  UserpreferenceMySuffixState
} from 'app/entities/userpreference-my-suffix/userpreference-my-suffix.reducer';
// prettier-ignore
import course, {
  CourseMySuffixState
} from 'app/entities/course-my-suffix/course-my-suffix.reducer';
// prettier-ignore
import student, {
  StudentMySuffixState
} from 'app/entities/student-my-suffix/student-my-suffix.reducer';
// prettier-ignore
import subject, {
  SubjectMySuffixState
} from 'app/entities/subject-my-suffix/subject-my-suffix.reducer';
// prettier-ignore
import academicsession, {
  AcademicsessionMySuffixState
} from 'app/entities/academicsession-my-suffix/academicsession-my-suffix.reducer';
// prettier-ignore
import studentsubject, {
  StudentsubjectMySuffixState
} from 'app/entities/studentsubject-my-suffix/studentsubject-my-suffix.reducer';
// prettier-ignore
import subjectbasefee, {
  SubjectbasefeeMySuffixState
} from 'app/entities/subjectbasefee-my-suffix/subjectbasefee-my-suffix.reducer';
// prettier-ignore
import discount, {
  DiscountMySuffixState
} from 'app/entities/discount-my-suffix/discount-my-suffix.reducer';
// prettier-ignore
import scholarship, {
  ScholarshipMySuffixState
} from 'app/entities/scholarship-my-suffix/scholarship-my-suffix.reducer';
// prettier-ignore
import studentfee, {
  StudentfeeMySuffixState
} from 'app/entities/studentfee-my-suffix/studentfee-my-suffix.reducer';
// prettier-ignore
import employee, {
  EmployeeMySuffixState
} from 'app/entities/employee-my-suffix/employee-my-suffix.reducer';
// prettier-ignore
import center, {
  CenterMySuffixState
} from 'app/entities/center-my-suffix/center-my-suffix.reducer';
// prettier-ignore
import centerhead, {
  CenterheadMySuffixState
} from 'app/entities/centerhead-my-suffix/centerhead-my-suffix.reducer';
// prettier-ignore
import teacher, {
  TeacherMySuffixState
} from 'app/entities/teacher-my-suffix/teacher-my-suffix.reducer';
// prettier-ignore
import teachershare, {
  TeachershareMySuffixState
} from 'app/entities/teachershare-my-suffix/teachershare-my-suffix.reducer';
// prettier-ignore
import salarypayment, {
  SalarypaymentMySuffixState
} from 'app/entities/salarypayment-my-suffix/salarypayment-my-suffix.reducer';
// prettier-ignore
import expense, {
  ExpenseMySuffixState
} from 'app/entities/expense-my-suffix/expense-my-suffix.reducer';
// prettier-ignore
import chapter, {
  ChapterMySuffixState
} from 'app/entities/chapter-my-suffix/chapter-my-suffix.reducer';
// prettier-ignore
import fundamentaldetail, {
  FundamentaldetailMySuffixState
} from 'app/entities/fundamentaldetail-my-suffix/fundamentaldetail-my-suffix.reducer';
// prettier-ignore
import question, {
  QuestionMySuffixState
} from 'app/entities/question-my-suffix/question-my-suffix.reducer';
// prettier-ignore
import studentscore, {
  StudentscoreMySuffixState
} from 'app/entities/studentscore-my-suffix/studentscore-my-suffix.reducer';
// prettier-ignore
import enterprise, {
  EnterpriseMySuffixState
} from 'app/entities/enterprise-my-suffix/enterprise-my-suffix.reducer';
// prettier-ignore
import enterprisesettings, {
  EnterprisesettingsMySuffixState
} from 'app/entities/enterprisesettings-my-suffix/enterprisesettings-my-suffix.reducer';
// prettier-ignore
/* jhipster-needle-add-reducer-import - JHipster will add reducer here */

export interface IRootState {
  readonly authentication: AuthenticationState;
  readonly locale: LocaleState;
  readonly applicationProfile: ApplicationProfileState;
  readonly administration: AdministrationState;
  readonly userManagement: UserManagementState;
  readonly register: RegisterState;
  readonly activate: ActivateState;
  readonly passwordReset: PasswordResetState;
  readonly password: PasswordState;
  readonly settings: SettingsState;
  readonly userdetail: UserdetailMySuffixState;
  readonly userpreference: UserpreferenceMySuffixState;
  readonly course: CourseMySuffixState;
  readonly student: StudentMySuffixState;
  readonly subject: SubjectMySuffixState;
  readonly academicsession: AcademicsessionMySuffixState;
  readonly studentsubject: StudentsubjectMySuffixState;
  readonly subjectbasefee: SubjectbasefeeMySuffixState;
  readonly discount: DiscountMySuffixState;
  readonly scholarship: ScholarshipMySuffixState;
  readonly studentfee: StudentfeeMySuffixState;
  readonly employee: EmployeeMySuffixState;
  readonly center: CenterMySuffixState;
  readonly centerhead: CenterheadMySuffixState;
  readonly teacher: TeacherMySuffixState;
  readonly teachershare: TeachershareMySuffixState;
  readonly salarypayment: SalarypaymentMySuffixState;
  readonly expense: ExpenseMySuffixState;
  readonly chapter: ChapterMySuffixState;
  readonly fundamentaldetail: FundamentaldetailMySuffixState;
  readonly question: QuestionMySuffixState;
  readonly studentscore: StudentscoreMySuffixState;
  readonly enterprise: EnterpriseMySuffixState;
  readonly enterprisesettings: EnterprisesettingsMySuffixState;
  /* jhipster-needle-add-reducer-type - JHipster will add reducer type here */
  readonly loadingBar: any;
}

const rootReducer = combineReducers<IRootState>({
  authentication,
  locale,
  applicationProfile,
  administration,
  userManagement,
  register,
  activate,
  passwordReset,
  password,
  settings,
  userdetail,
  userpreference,
  course,
  student,
  subject,
  academicsession,
  studentsubject,
  subjectbasefee,
  discount,
  scholarship,
  studentfee,
  employee,
  center,
  centerhead,
  teacher,
  teachershare,
  salarypayment,
  expense,
  chapter,
  fundamentaldetail,
  question,
  studentscore,
  enterprise,
  enterprisesettings,
  /* jhipster-needle-add-reducer-combine - JHipster will add reducer here */
  loadingBar
});

export default rootReducer;
