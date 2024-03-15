import React from "react";

//COMMON PAGE
const CourseLearningDetail = React.lazy(
  () =>
    import("src/pages/CourseLearning/CourseLearningDetail/CourseLearningDetail")
);

//MAIN PAGE
const MainPage = React.lazy(() => import("src/pages/MainPage/MainPage"));
const CourseDetail = React.lazy(
  () => import("src/pages/CoursePage/CourseDetail/CourseDetail")
);

const NotFound = React.lazy(
  () => import("src/pages/MainPage/ErrorPage/NotFound")
);
const UnauthorizedPage = React.lazy(
  () => import("src/pages/MainPage/ErrorPage/UnauthorizedPage")
);

//Blog
const Blog = React.lazy(() => import("src/pages/MainPage/BlogPage/Blog"));

//AUTH PAGE
const ForgotPassword = React.lazy(
  () => import("src/pages/AuthPage/ForgotPassword/ForgotPassword")
);
const Login = React.lazy(() => import("src/pages/AuthPage/Login/Login"));
const Register = React.lazy(
  () => import("src/pages/AuthPage/Register/Register")
);

//ADMIN PAGE
const AdminPage = React.lazy(() => import("src/pages/AdminPage/AdminPage"));
// const RevenueTeacherDetail = React.lazy(
//   () => import('src/pages/AdminPage/StatisticManage/RevenueTeacherStatistic/RevenueTeacherDetail')
// )

//TEACHER PAGE
const TeacherCourse = React.lazy(
  () => import("src/pages/TeacherPage/ManageCourses/TeacherCourse")
);
const TeacherCourseDetail = React.lazy(
  () => import("src/pages/TeacherPage/ManageCourses/TeacherCourseDetail")
);

//DASHBOARD PAGE
const DashboardLayout = React.lazy(
  () => import("src/layouts/Dashboard/DashboardLayout")
);
const UserList = React.lazy(
  () => import("src/pages/AdminPage/AccountsManage/AccountList")
);
const StudentList = React.lazy(
  () => import("src/pages/AdminPage/AccountsManage/StudentList")
);

const CategoryList = React.lazy(
  () => import("src/pages/AdminPage/CategoriesManage/CategoryList")
);
const CouponList = React.lazy(
  () => import("src/pages/AdminPage/CouponManage/CouponList")
);
const CourseList = React.lazy(
  () => import("src/pages/AdminPage/CoursesManage/CourseList")
);
const RevenueStatistic = React.lazy(
  () =>
    import(
      "src/pages/AdminPage/StatisticManage/RevenueStatistic/RevenueStatistic"
    )
);

const StatisticManage = React.lazy(
  () => import("src/pages/AdminPage/StatisticManage/StatisticViews")
);

const BoughtCourses = React.lazy(
  () => import("src/pages/CourseLearning/BoughtCourses/BoughtCourses")
);

const ProfilePage = React.lazy(
  () => import("src/pages/ProfilePage/ProfilePage")
);

const TeacherInfo = React.lazy(
  () => import("src/pages/TeacherPage/ManageProfile/TeacherInfo")
);

//QUIZ PAGE
const QuizPage = React.lazy(() => import("src/pages/QuizPage"));

const QuizDetail = React.lazy(() => import("src/pages/QuizDetail"));

//ALL PAGES COMPONENTS
const MAIN_PAGE = {
  MainPage: <MainPage />,
  CourseDetail: <CourseDetail />,
  Blog: <Blog />,
  UnauthorizedPage: <UnauthorizedPage />,
  NotFound: <NotFound />,
};

const AUTH_PAGE = {
  Login: <Login />,
  Register: <Register />,
  ForgotPassword: <ForgotPassword />,
};

const ADMIN_PAGE = {
  AdminPage: <AdminPage />,
  QuizPage: <QuizPage />,
  CourseLearningDetail: <CourseLearningDetail />,
  ADMIN_DASHBOARD: {
    ProfilePage: <ProfilePage />,
    UserList: <UserList />,
    StudentList: <StudentList />,
    CategoryList: <CategoryList />,
    CourseList: <CourseList />,
    CouponList: <CouponList />,
    StatisticManage: <StatisticManage />,
    RevenueStatistic: <RevenueStatistic />,
  },
};

const STUDENT_PAGE = {
  QuizPage: <QuizPage />,
  CourseLearningDetail: <CourseLearningDetail />,
  STUDENT_DASHBOARD: {
    ProfilePage: <ProfilePage />,
    BoughtCourses: <BoughtCourses />,
    QuizDetail: <QuizDetail />,
  },
};

const TEACHER_PAGE = {
  TeacherCourse: <TeacherCourse />,
  TeacherCourseDetail: <TeacherCourseDetail />,
  CourseLearningDetail: <CourseLearningDetail />,
  QuizPage: <QuizPage />,
  QuizDetail: <QuizDetail />,
  TEACHER_DASHBOARD: {
    ProfilePage: <ProfilePage />,
    StudentList: <StudentList />,
    TeacherInfo: <TeacherInfo />,
    ManagerCourse: <TeacherCourse />,
    CouponList: <CouponList />,
  },
};

const DASHBOARD_PAGE = {
  DashboardLayout: <DashboardLayout />,
  TEACHER_DASHBOARD: TEACHER_PAGE.TEACHER_DASHBOARD,
  ADMIN_DASHBOARD: ADMIN_PAGE.ADMIN_DASHBOARD,
  STUDENT_DASHBOARD: STUDENT_PAGE.STUDENT_DASHBOARD,
};

export {
  MAIN_PAGE,
  AUTH_PAGE,
  ADMIN_PAGE,
  STUDENT_PAGE,
  TEACHER_PAGE,
  DASHBOARD_PAGE,
};