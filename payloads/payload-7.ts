export default {
  url: "https://hpgm-dashboard-production.eu-west-1.csq.io/dashboard/v2/distribution",
  name: "Request 7 - Sky UK - OR goals",

  payload: {
    projectId: 3692,
    from: "2023-01-10T11:00:00Z",
    to: "2023-01-16T13:20:51Z",
    deviceId: 1,
    segment: {
      nodeType: "OR",
      children: [
        {
          nodeType: "filter",
          field: "goal",
          operator: "equals",
          value: {
            action: "click",
            page: {
              displayValue: "",
              field: "page:path",
              nodeType: "filter",
              operator: "equals",
              value: "/glass/buy/checkout/credit-denied",
            },
            targets: ["button#pay-in-full>span:eq(1)"],
          },
        },
        {
          nodeType: "filter",
          field: "goal",
          operator: "equals",
          value: {
            action: "pageview",
            page: {
              children: [
                {
                  field: "page:query",
                  value: "cs_qualtrics",
                  nodeType: "filter",
                  operator: "not_contains",
                  displayValue: "",
                },
                {
                  field: "page:path",
                  value: "/shop/choose/checkout/confirmation",
                  nodeType: "filter",
                  operator: "equals",
                  displayValue: "",
                },
              ],
              nodeType: "AND",
            },
          },
        },
        {
          nodeType: "filter",
          field: "goal",
          operator: "not_equals",
          value: {
            action: "pageview",
            page: {
              nodeType: "OR",
              children: [
                {
                  nodeType: "filter",
                  operator: "equals",
                  field: "page:path",
                  value: "/shop/mobile/mobile-checkout/confirmation",
                  displayValue: "",
                },
                {
                  displayValue: "",
                  field: "page:path",
                  nodeType: "filter",
                  operator: "starts_with",
                  value: "/shop/choose/checkout/confirmation",
                },
              ],
            },
          },
        },
      ],
    },
    dimension: "os",
  },
};
