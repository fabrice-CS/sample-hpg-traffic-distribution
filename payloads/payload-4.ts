export default {
  url: "https://hpgm-dashboard-production.us-east-1.csq.io/dashboard/v2/distribution",
  name: "Request 4 - QVC - 2 segments",

  payload: {
    projectId: 2122,
    from: "2022-12-17T11:00:00Z",
    to: "2023-01-16T10:15:31Z",
    deviceId: 1,
    segment: {
      nodeType: "OR",
      children: [
        {
          field: "goal",
          value: {
            action: "landingPage",
            page: {
              field: "page:query",
              operator: "contains",
              value: "mmc=GOOGLESHOWCASE",
              displayValue: "",
              nodeType: "filter",
            },
          },
          nodeType: "filter",
          operator: "equals",
        },
        {
          field: "goal",
          value: {
            action: "landingPage",
            page: {
              displayValue: "",
              field: "page:customVarValue3",
              nodeType: "filter",
              operator: "equals",
              value: "myaccount-order-status",
            },
          },
          nodeType: "filter",
          operator: "equals",
        },
      ],
    },
    dimension: "os",
  },
};
