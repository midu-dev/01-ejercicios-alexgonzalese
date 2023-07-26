// Ejercicio 2

const fs = require('fs');
async function writeFile (filePath, data, callback) {
  
  const writeStream = fs.createWriteStream(filePath);

  
  
  writeStream.write(data, 'utf-8', (err) => {
    if (err) {
      console.error('Error al escribir el archivo:', err);
    } else {
      console.log('Archivo escrito exitosamente.');
      if (typeof callback === 'function') {
        callback();
      }
    }
    writeStream.end();
  });
}

// Ejercicio 3
async function readFileAndCount (word, callback) {
  if (!word) {
    return callback(new Error('No se hay palabra a buscar'));
  }


  if (process.argv.length < 3) {
    return callback(new Error('No se encuentra el path del archivo'));
  }

  const filePath = process.argv[2];


  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {

      if (err.code === 'ENOENT') {
        return callback(null, 0);
      } else {

        return callback(err);
      }
    }

    const occurrences = (data.match(new RegExp(`\\b${word}\\b`, 'gi')) || []).length;
    callback(null, occurrences);
  });



  readFileAndCount(word, (err, result) => {
    if (err) {
      console.error(err.message);
    } else {
      console.log(`La palabra "${word}" aparece ${result} veces en el archivo.`);
    }
  });

}

module.exports = {
  writeFile,
  readFileAndCount
}
