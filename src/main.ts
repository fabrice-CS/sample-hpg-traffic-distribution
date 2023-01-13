import got from "got";

const devicesMap = new Map<number, string>([
  [1, "Desktop"],
  [2, "Mobile"],
  [3, "Tablet"],
]);

const allDevices: [number, string] = [-1, "All"];

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

type Request = Omit<typeof basePayloadType, "segment"> & { segment: any };

async function main() {
  const basePayload: Request = {
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

  const basePayload2: Request = {
    segment: {},
    from: "",
    to: "",
    projectId: 0,
    deviceId: 1,
    dimension: "os",
  };

  const deviceTotals = await Promise.all(
    Array.from(devicesMap.entries()).map(async ([deviceId, deviceLabel]) => {
      const payload: Request = { ...basePayload, deviceId: deviceId } as const;

      const d = await getResponse<HPGResponse>(
        "http://hpgm-dashboard-production.northeurope.csq.io/dashboard/v2/distribution",
        payload
      );

      console.log(deviceLabel, d);

      const distributions = Object.entries(d).filter(
        ([key, value]) => key !== "total"
      );

      distributions.forEach(([_, value]) => console.log(value));

      const totalForDevice = distributions.reduce((acc, distribution) => {
        return acc + distribution[1][0].value;
      }, 0);

      return totalForDevice;
    })
  );

  const totalFromIndividualDevice = deviceTotals.reduce(
    (acc, val) => acc + val
  );

  const allDevicesPayload = {
    ...basePayload,
    deviceId: allDevices[0],
  } as const;

  const d2 = await getResponse<HPGResponse>(
    "http://hpgm-dashboard-production.northeurope.csq.io/dashboard/v2/distribution",
    allDevicesPayload
  );

  console.log(allDevices[1], d2);

  const distributions = Object.entries(d2).filter(([key, value]) => {
    return key !== "total";
  });

  distributions.forEach(([_, value]) => console.log(value));

  const totalForAllDevice = distributions.reduce((acc, distribution) => {
    return acc + distribution[1][0].value;
  }, 0);

  console.log({ totalFromIndividualDevice });

  console.log({ totalForAllDevice });

  console.log({
    relativeChange: relativeChange(
      totalFromIndividualDevice,
      totalForAllDevice
    ),
  });
  //   console.log(d2);

  //   Object.entries(d2)
  //     .filter(([key, value]) => {
  //       return key !== "total";
  //     })
  //     .forEach(([_, value]) => console.log(value));
}

function relativeChange(actual: number, reference: number) {
  if (reference === 0) return 0;
  return Math.abs(actual - reference) / reference;
}

function getResponse<T>(url: string, payload: Record<string, any>): Promise<T> {
  return got
    .post(url, {
      json: payload,
    })
    .json<T>();
}

type HPGResponse = Record<
  string,
  [{ name: string; value: number; percent: number }]
>;

const requestPayload = {
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
/* 





curl -X POST --location "http://hpgm-dashboard-production.northeurope.csq.io/dashboard/v2/distribution" \
    -H "Content-Type: application/json" \
    -d "{\"projectId\":17904,\"from\":\"2022-11-09T00:00:00Z\",\"to\":\"2022-12-08T23:59:59Z\",\"deviceId\":3,\"segment\":{\"nodeType\":\"SEQ\",\"children\":[{\"field\":\"goal\",\"value\":{\"action\":\"pageview\",\"page\":{\"nodeType\":\"AND\",\"children\":[{\"field\":\"page:host\",\"operator\":\"equals\",\"value\":\"www.johnlewis.com\",\"nodeType\":\"filter\"},{\"field\":\"page:path\",\"operator\":\"equals\",\"value\":\"/browse/women/womens-dresses/_/N-flw\",\"nodeType\":\"filter\"}]}},\"nodeType\":\"filter\",\"operator\":\"equals\"},{\"field\":\"goal\",\"value\":{\"action\":\"click\",\"page\":{\"nodeType\":\"AND\",\"children\":[{\"field\":\"page:host\",\"operator\":\"equals\",\"value\":\"www.johnlewis.com\",\"nodeType\":\"filter\"},{\"field\":\"page:path\",\"operator\":\"equals\",\"value\":\"/browse/women/womens-dresses/_/N-flw\",\"nodeType\":\"filter\"}]},\"targets\":[\"div#content>div:eq(0)>nav:eq(0)>details:eq(1)\",\"h3#accordion-summary-occasion\",\"span#day\",\"span#summer\",\"span#evening\",\"span#party\",\"span#wedding-guest\",\"span#work\",\"span#race-day\",\"span#winter\",\"span#prom\",\"span#bridesmaid\",\"span#bridal\"]},\"nodeType\":\"filter\",\"operator\":\"equals\"}]},\"dimension\":\"os\"}"

    for     

*/

main();
