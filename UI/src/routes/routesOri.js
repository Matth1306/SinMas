import DashboardLayout from "../components/Dashboard/Layout/DashboardLayout.vue";
// GeneralViews
import NotFound from "../components/GeneralViews/NotFoundPage.vue";
// Dashboard pages

// Pages
import User from "src/components/Dashboard/Views/Pages/UserProfile.vue";
import TimeLine from "src/components/Dashboard/Views/Pages/TimeLinePage.vue";
import Login from "src/components/Dashboard/Views/Pages/Login.vue";
import Register from "src/components/Dashboard/Views/Pages/Register.vue";
import Lock from "src/components/Dashboard/Views/Pages/Lock.vue";

// Components pages
import Buttons from "src/components/Dashboard/Views/Components/Buttons.vue";
import GridSystem from "src/components/Dashboard/Views/Components/GridSystem.vue";
import Panels from "src/components/Dashboard/Views/Components/Panels.vue";
import SweetAlert from "src/components/Dashboard/Views/Components/SweetAlert.vue";
import Notifications from "src/components/Dashboard/Views/Components/Notifications.vue";
import Icons from "src/components/Dashboard/Views/Components/Icons.vue";
import Typography from "src/components/Dashboard/Views/Components/Typography.vue";

const Records = () =>
  import("src/components/Dashboard/Views/Dashboard/Records.vue");
const Logs = () => import("src/components/Dashboard/Views/Dashboard/Logs.vue");
import Calendar from "src/components/Dashboard/Views/Calendar/CalendarRoute.vue";

// SALES
const SalesOverview = () => import("src/components/Sales/SalesOverview.vue");
const SalesStats = () => import("src/components/Sales/SalesStats.vue");
const SalesMap = () => import("src/components/Sales/SalesMap.vue");

// ADMIN
const Distributor = () => import("src/components/Admin/AdminDistributor.vue");
const Reseller = () => import("src/components/Admin/AdminReseller.vue");
const Site = () => import("src/components/Admin/AdminSite.vue");

// BILLING
//const Calendar = () => import("src/components/Admin/AdminDistributor.vue");
const List = () => import("src/components/Billing/BillingList.vue");
const Transaction = () =>
  import("src/components/Billing/BillingTransaction.vue");

// DASHBOARD
const DashboardOverview = () =>
  import("src/components/Dashboard/Views/Dashboard/Overview.vue");
const DashboardStats = () =>
  import("src/components/Dashboard/Views/Dashboard/Charts.vue");
const DashboardSites = () =>
  import("src/components/Dashboard/Views/Dashboard/Maps.vue");

// SUPPORT
const SupportList = () => import("src/components/Support/SupportList.vue");

// HELP
const Termofuse = () => import("src/components/Help/HelpTermOfUse.vue");
const License = () => import("src/components/Help/HelpLicense.vue");

let loginPage = {
  path: "/login",
  name: "Login",
  component: Login
};

let defaultroutes = {
  path: "/",
  component: Login,
  redirect: "/login"
};

let sales = {
  path: "/sales",
  component: DashboardLayout,
  redirect: "/sales/overview",
  children: [
    {
      path: "overview",
      name: "SalesOverview",
      component: SalesOverview
    },
    {
      path: "stats",
      name: "SalesStats",
      component: SalesStats
    },
    {
      path: "map",
      name: "SalesMap",
      component: SalesMap
    }
  ]
};

let admin = {
  path: "/admin",
  component: DashboardLayout,
  redirect: "/help",
  children: [
    {
      path: "distributor",
      name: "Distributor",
      component: Distributor
    },
    {
      path: "reseller",
      name: "Reseller",
      component: Reseller
    },
    {
      path: "site",
      name: "Site",
      component: Site
    }
  ]
};

let billing = {
  path: "/billing",
  component: DashboardLayout,
  redirect: "/billing/list",
  children: [
    {
      path: "calendar",
      name: "Calendar",
      component: Calendar
    },
    {
      path: "list",
      name: "List",
      component: List
    },
    {
      path: "transaction",
      name: "Transaction",
      component: Transaction
    }
  ]
};

let dashboard = {
  path: "/dashboard",
  component: DashboardLayout,
  redirect: "/dashboard/overview",
  children: [
    {
      path: "overview",
      name: "Overview",
      component: DashboardOverview
    },
    {
      path: "stats",
      name: "DashboardStats",
      component: DashboardStats
    },
    {
      path: "sites",
      name: "DashboardSites",
      component: DashboardSites
    }
  ]
};

let support = {
  path: "/support",
  component: DashboardLayout,
  redirect: "/support/list",
  children: [
    {
      path: "list",
      name: "SupportList",
      component: SupportList
    }
  ]
};

let help = {
  path: "/help",
  component: DashboardLayout,
  redirect: "/help/termofuse",
  children: [
    {
      path: "term-of-use",
      name: "Termofuse",
      component: Termofuse
    },
    {
      path: "license",
      name: "License",
      component: License
    }
  ]
};

const routes = [
  loginPage,
  sales,
  admin,
  billing,
  dashboard,
  support,
  help,
  defaultroutes,
  {
    path: "/records",
    name: "Records",
    component: Records
  },
  {
    path: "/logs",
    name: "Logs",
    component: Logs
  },
  { path: "*", component: NotFound }
];

export default routes;
