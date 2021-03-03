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
import RecordPreview from "src/components/Dashboard/Views/Dashboard/RecordPreview.vue";

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
const RawRecords = () =>
  import("src/components/Dashboard/Views/Dashboard/RawRecords.vue");
const Percentage = () =>
  import("src/components/Dashboard/Views/Dashboard/Percentage.vue");
const Analytic = () =>
  import("src/components/Dashboard/Views/Dashboard/Analytic.vue");
const Logs = () => import("src/components/Dashboard/Views/Dashboard/Logs.vue");
import Calendar from "src/components/Dashboard/Views/Calendar/CalendarRoute.vue";
import { store } from "../store/store";

// SALES
const SalesOverview = () => import("src/components/Sales/SalesOverview.vue");
const SalesStats = () => import("src/components/Sales/SalesStats.vue");
const SalesMap = () => import("src/components/Sales/SalesMap.vue");

// ADMIN
const Distributor = () => import("src/components/Admin/AdminDistributor.vue");
const Reseller = () => import("src/components/Admin/AdminReseller.vue");
const Site = () => import("src/components/Admin/AdminSite.vue");
const Logger = () => import("src/components/Admin/AdminLogger.vue");
const Activation = () => import("src/components/Admin/AdminActivation.vue");
const AdminMill = () => import("src/components/Admin/AdminMill.vue");
const AdminUser = () => import("src/components/Admin/AdminUser.vue");

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
const NCRForm = () => import("src/components/Support/NCRForm.vue");
const NCRList = () => import("src/components/Support/NCRList.vue");
const NCRDetail = () => import("src/components/Support/NCRDetail.vue");
const NCREdit = () => import("src/components/Support/NCREdit.vue");

// HELP
const FAQ = () => import("src/components/Help/HelpFAQ.vue");
const Termofuse = () => import("src/components/Help/HelpTermOfUse.vue");
const License = () => import("src/components/Help/HelpLicense.vue");

const DashboardOverviewSite = () =>
  import("src/components/Dashboard/Views/Dashboard/OverviewSite.vue");

let loginPage = {
  path: "/login",
  name: "Login",
  component: Login
};

let recordPreview = {
  path: "/record/preview",
  name: "Record Preview",
  component: RecordPreview
};

let records = {
  path: "/records",
  component: DashboardLayout,
  redirect: "/records",
  children: [
    {
      path: "/records",
      name: "Records Listed Data",
      component: Records
    },
    {
      path: "/rawrecords",
      name: "Records Raw Data",
      component: RawRecords
    },
    {
      path: "/percentage",
      name: "Records Percentage",
      component: Percentage
    },
  ],
};

let admin = {
  path: "/admin",
  component: DashboardLayout,
  redirect: "/admin",
  children: [
    {
      path: "/admin/mill",
      name: "Admin Quality Standards",
      component: AdminMill
    },
    {
      path: "/admin/user",
      name: "Admin User",
      component: AdminUser
    },
  ],
};

let analytic = {
  path: "/compare",
  component: DashboardLayout,
  redirect: "/compare",
  children: [
    {
      path: "/compare",
      name: "Analytic",
      component: Analytic
    }
  ],
};

let logs = {
  path: "/logs",
  component: DashboardLayout,
  redirect: "/logs",
  children: [
    {
      path: "/logs",
      name: "Error Logs",
      component: Logs
    }
  ],
};

let defaultroutes = {
  path: "/",
  component: Login,
  redirect: "/login"
};

let notfound = {
  path: "*",
  component: NotFound
};

let sales = {
  path: "/sales",
  component: DashboardLayout,
  redirect: "/sales/overview",
  children: [
    {
      path: "overview",
      name: "Sales Overview",
      component: SalesOverview
    },
    {
      path: "stats",
      name: "Sales Stats",
      component: SalesStats
    },
    {
      path: "map",
      name: "Sales Map",
      component: SalesMap
    }
  ],
};

let admin0 = {
  path: "/admin",
  component: DashboardLayout,
  redirect: "/help",
  children: [
    {
      path: "distributor",
      name: "Admin Distributor",
      component: Distributor
    },
    {
      path: "reseller",
      name: "Admin Reseller",
      component: Reseller
    },
    {
      path: "site",
      name: "Admin Site",
      component: Site
    },
    {
      path: "logger",
      name: "Admin Logger",
      component: Logger
    },
    {
      path: "activation",
      name: "Admin Activation",
      component: Activation
    }
  ],
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
  ],
};

let dashboard = {
  path: "/dashboard",
  component: DashboardLayout,
  redirect: "/dashboard/overview",
  children: [
    {
      path: "overview",
      name: "Dashboard Overview",
      component: DashboardOverview
    },
    // {
    //   path: "site",
    //   name: "site",
    //   component: DashboardOverviewSite
    // },
    {
      path: "stats",
      name: "Dashboard Stats",
      component: DashboardStats
    },
    {
      path: "sites",
      name: "Dashboard Sites",
      component: DashboardSites
    }
  ],
};

let ncr = {
  path: "/ncr",
  component: DashboardLayout,
  redirect: "/ncr/form",
  children: [
    {
      path: "form",
      name: "NCR Form",
      component: NCRForm
    },
    {
      path: "list",
      name: "NCR List",
      component: NCRList
    },
    {
      path: "detail",
      name: "NCR Detail",
      component: NCRDetail
    },
    {
      path: "edit",
      name: "NCR Edit",
      component: NCREdit
    },
  ]
};

let help = {
  path: "/help",
  component: DashboardLayout,
  redirect: "/help/termofuse",
  children: [
    {
      path: "faq",
      name: "FAQ",
      component: FAQ
    },
    {
      path: "term-of-use",
      name: "Term of Use",
      component: Termofuse
    },
    {
      path: "license",
      name: "License",
      component: License
    },
    {
      path: "support",
      name: "Support Form",
      component: SupportList
    }
  ]
};

// const distributor =

const routes = [
  loginPage,
  sales,
  admin,
  billing,
  dashboard,
  analytic,
  ncr,
  help,
  defaultroutes,
  records,
  recordPreview,
  logs,
  notfound
];
export default routes;
