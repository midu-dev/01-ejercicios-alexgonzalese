const pc = require("picocolors");
const { join, resolve, path } = require("node:path");
const fs = require("node:fs");
const fsp = require("node:fs/promises");

// Ejercicio 2

//crear una funcion para escribir un archivo

async function writeFile(filePath, data, callback) {
  //separo la ruta del archivo
  const newRoute = filePath.split("/").slice(0, -1).toString();
  const fileName = filePath.split("/").slice(-1).toString();

  const directory = join(__dirname, filePath);
  const file = join(directory.toString(), fileName);
  //creo el directorio
  try {
    await fsp.mkdir(filePath, { recursive: true });
  } catch (err) {
    console.log("\x1b[41m%s\x1b[0m", "index.js line:14 mkdir", { err });
  }

  try {
    await fsp.writeFile(filePath, data);
  } catch (err) {
    console.log("\x1b[41m%s\x1b[0m", "index.js line:20 writeFile", { err });
  }
  callback();
}

// Ejercicio 3
async function readFileAndCount(word, callback) {
  const filePath = process.argv[2] || "";

  const patchIsValid = filePath && filePath.length > 0;
  if (!patchIsValid) return await callback(
    new Error("No se ha especificado el path del archivo"),
    0
  );

  const wordIsValid = word && word.length > 0;
  if (!wordIsValid) return await callback(
    new Error("No se ha especificado la palabra a buscar"),
    0
  );

  console.log("\x1b[44m%s\x1b[0m", "index.js line:46 llego");

  const fileExists = await fs.existsSync(filePath);
  if (!fileExists) return await callback(null, 0);

  try {
    const string = await fsp.readFile(filePath, "utf-8");
    const count = string.split(word).length - 1;
    return callback(null, count);
  } catch (error) {
    return callback(error, 0);
  }
}

module.exports = {
  writeFile,
  readFileAndCount,
};
