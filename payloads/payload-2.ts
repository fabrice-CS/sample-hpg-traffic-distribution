export default {
  url: "https://hpgm-dashboard-production.eu-west-1.csq.io/dashboard/v2/distribution",
  name: "request 2",
  payload: {
    projectId: 5207,
    from: "2022-10-31T23:00:00Z",
    to: "2022-11-30T22:59:59Z",
    deviceId: -1,
    segment: {
      nodeType: "SEQ",
      children: [
        {
          field: "goal",
          value: {
            action: "pageview",
            page: {
              displayValue: "",
              field: "page:customVarValue6",
              nodeType: "filter",
              operator: "equals",
              value: "goldcar_additional_products",
            },
          },
          nodeType: "filter",
          operator: "equals",
        },
        {
          field: "goal",
          value: {
            action: "pageview",
            page: {
              displayValue: "",
              field: "page:customVarValue6",
              nodeType: "filter",
              operator: "equals",
              value: "goldcar_confirmation_page",
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
