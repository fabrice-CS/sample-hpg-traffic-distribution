export default {
  url: "https://hpgm-dashboard-production.northeurope.csq.io/dashboard/v2/distribution",
  name: "Request 5 - John Lewis - problematic segment 1",

  payload: {
    projectId: 17904,
    from: "2022-11-08T11:00:00Z",
    to: "2022-12-09T10:59:59Z",
    deviceId: 3,
    segment: {
      nodeType: "SEQ",
      children: [
        {
          field: "goal",
          value: {
            action: "pageview",
            page: {
              nodeType: "AND",
              children: [
                {
                  field: "page:host",
                  operator: "equals",
                  value: "www.johnlewis.com",
                  nodeType: "filter",
                },
                {
                  field: "page:path",
                  operator: "equals",
                  value: "/browse/women/womens-dresses/_/N-flw",
                  nodeType: "filter",
                },
              ],
            },
          },
          nodeType: "filter",
          operator: "equals",
        },
        {
          field: "goal",
          value: {
            action: "click",
            page: {
              nodeType: "AND",
              children: [
                {
                  field: "page:host",
                  operator: "equals",
                  value: "www.johnlewis.com",
                  nodeType: "filter",
                },
                {
                  field: "page:path",
                  operator: "equals",
                  value: "/browse/women/womens-dresses/_/N-flw",
                  nodeType: "filter",
                },
              ],
            },
            targets: [
              "div#content>div:eq(0)>nav:eq(0)>details:eq(1)",
              "h3#accordion-summary-occasion",
              "span#day",
              "span#summer",
              "span#evening",
              "span#party",
              "span#wedding-guest",
              "span#work",
              "span#race-day",
              "span#winter",
              "span#prom",
              "span#bridesmaid",
              "span#bridal",
            ],
          },
          nodeType: "filter",
          operator: "equals",
        },
      ],
    },
    dimension: "os",
  },
};
