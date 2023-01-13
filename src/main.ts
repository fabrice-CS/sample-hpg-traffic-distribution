import got from "got";
import { performance } from "perf_hooks";
import util from "node:util";

import requests, { DistributionRequest, TestRequest } from "../payloads";
import { mkdir, writeFile } from "fs/promises";
import { resolve } from "path";

const devicesMap = new Map<number, string>([
  [1, "Desktop"],
  [2, "Mobile"],
  [3, "Tablet"],
]);

const allDevices: [number, string] = [-1, "All"];

async function writeToFile(filename: string, lines: string[]) {
  const dir = resolve(__dirname, "../out");
  await mkdir(resolve(dir), { recursive: true });
  await writeFile(resolve(dir, filename), lines.join("\n"));
}

async function executeTestRequest(request: TestRequest) {
  console.log("begin", request.name);
  const basePayload: DistributionRequest = request.payload;

  const [separateDevicesResponse, allDeviceResponse] = await Promise.all([
    Promise.all(
      Array.from(devicesMap.entries()).map(async ([deviceId, deviceLabel]) => {
        return getTotalCountDistributionForDevice(
          [deviceId, deviceLabel],
          basePayload,
          request.url
        );
      })
    ),

    getTotalCountDistributionForDevice(allDevices, basePayload, request.url),
  ]);

  const totFromSeparateDevices = separateDevicesResponse
    .map((r) => r.totalForDevice)
    .reduce((acc, val) => acc + val);

  const totFromAllDevice = allDeviceResponse.totalForDevice;

  separateDevicesResponse.forEach((responseObj) => {
    console.log(
      util.inspect(responseObj, false, null, true /* enable colors */)
    );
  });

  console.log(
    util.inspect(allDeviceResponse, false, null, true /* enable colors */)
  );
  console.log({
    totFromSeparateDevices,
    totFromAllDevice,
    relativeChange: relativeChange(totFromSeparateDevices, totFromAllDevice),
  });

  const results = `total from separate devices: ${totFromSeparateDevices},
total from all device: ${totFromAllDevice},
relative Change: ${relativeChange(totFromSeparateDevices, totFromAllDevice)}`;

  const lines = [
    request.name,
    "",
    results,
    "",
    ...separateDevicesResponse.map((responseObj) =>
      util.inspect(responseObj, false, null, false)
    ),
    util.inspect(allDeviceResponse, false, null, false),
    "",
    "payload",
    util.inspect(request.payload, false, null, false),
  ];

  await writeToFile(`${request.name}-out.txt`, lines);

  console.log("end", request.name, "\n\n");
}

async function main() {
  for (let request of requests) {
    await executeTestRequest(request);
  }
}

async function getTotalCountDistributionForDevice(
  [deviceId, deviceLabel]: [number, string],
  basePayload: DistributionRequest,
  url: string = "http://hpgm-dashboard-production.northeurope.csq.io/dashboard/v2/distribution"
) {
  const payload: DistributionRequest = {
    ...basePayload,
    deviceId: deviceId,
  } as const;

  console.log("search for label", deviceLabel);
  const t0 = performance.now();
  const response = await getResponse<HPGResponse>(url, payload);
  const duration = performance.now() - t0;
  console.log("found for label", deviceLabel, "in", duration * 1e-3, "s");
  const responseObj = { [deviceLabel]: response };

  const distributions = Object.entries(response).filter(
    ([key, _]) => key !== "total"
  );

  const totalForDevice = distributions.reduce(
    (acc, distribution) => acc + distribution[1][0].value,
    0
  );

  return { totalForDevice, responseObj, duration };
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

main();
