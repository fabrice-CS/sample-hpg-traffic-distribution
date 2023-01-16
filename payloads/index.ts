import request1 from "./payload-1";
import request2 from "./payload-2";
import request3 from "./payload-3";
import request4 from "./payload-4";
import request5 from "./payload-5";
import request6 from "./payload-6";

const basePayloadType = {
  projectId: 17904,
  from: "2022-11-09T00:00:00Z",
  to: "2022-12-08T23:59:59Z",
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
};

export type DistributionRequest = Omit<typeof basePayloadType, "segment"> & {
  segment: any;
};

export type TestRequest = {
  name: string;
  payload: DistributionRequest;
  url: string;
};
export default [
  request1,
  request2,
  request3,
  request4,
  request5,
  request6,
] as TestRequest[];
