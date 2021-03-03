export default [
  {
    name: "ADMIN",
    icon: "nc-icon nc-single-02",
    children: [
      {
        name: "Distributor",
        icon: "nc-icon nc-single-copy-04",
        path: "/admin/distributor"
      },
      {
        name: "Reseller",
        icon: "nc-icon nc-single-copy-04",
        path: "/admin/reseller"
      },
      {
        name: "Site",
        icon: "nc-icon nc-single-copy-04",
        path: "/admin/site"
      }
    ]
  },
  {
    name: "BILLING",
    icon: "nc-icon nc-money-coins",
    children: [
      {
        name: "Calendar",
        icon: "nc-icon nc-calendar-60",
        path: "/billing/calendar"
      },
      {
        name: "List",
        icon: "nc-icon nc-single-copy-04",
        path: "/billing/list"
      },
      {
        name: "Transaction",
        icon: "nc-icon nc-credit-card",
        path: "/billing/transaction"
      }
    ]
  },
  {
    name: "SITES",
    icon: "nc-icon nc-credit-card",
    children: [
      {
        name: "Overview",
        icon: "nc-icon nc-tile-56",
        path: "/dashboard/overview"
      },
      {
        name: "Stats",
        icon: "nc-icon nc-chart-bar-32",
        path: "/dashboard/stats"
      },
      {
        name: "Map",
        icon: "nc-icon nc-world-2",
        path: "/dashboard/sites"
      }
    ]
  },
  {
    name: "Records",
    icon: "nc-icon nc-single-copy-04",
    path: "/records"
  },
  {
    name: "Logs",
    icon: "nc-icon nc-single-copy-04",
    path: "/logs"
  },
  {
    name: "SUPPORT",
    icon: "nc-icon nc-alert-circle-i",
    children: [
      {
        name: "List",
        icon: "nc-icon nc-single-copy-04",
        path: "/support/list"
      }
    ]
  },
  {
    name: "HELP",
    icon: "nc-icon nc-single-copy-04",
    children: [
      {
        name: "Term of Use",
        icon: "nc-icon nc-paper",
        path: "/help/term-of-use"
      },
      {
        name: "License",
        icon: "nc-icon nc-paper",
        path: "/help/license"
      }
    ]
  }
];
