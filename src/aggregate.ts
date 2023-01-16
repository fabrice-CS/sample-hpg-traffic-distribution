import { mkdir, readdir, open, constants, readFile } from "fs/promises";
import { resolve } from "path";

const dirToRead = resolve(__dirname, "../out");

const dirToWrite = resolve(__dirname, "../aggregated");

async function main() {
  await mkdir(resolve(dirToWrite), { recursive: true });

  const entries = await readdir(dirToRead, {
    withFileTypes: true,
  });

  const fileEntries = entries
    .filter((e) => e.isFile())
    .map((e) => resolve(dirToRead, e.name));

  const file = await open(
    resolve(dirToWrite, "aggregation.txt"),
    constants.O_CREAT | constants.O_WRONLY | constants.O_TRUNC
  );

  for (let i = 0; i < fileEntries.length; i++) {
    const content = await readFile(fileEntries[i], { encoding: "utf-8" });
    console.log("write file", fileEntries[i]);

    await file.writeFile(content);

    if (i < fileEntries.length - 1) {
      await file.writeFile("\n\n" + ("#".repeat(75) + "\n").repeat(3) + "\n\n");
    }
  }
}

main();
