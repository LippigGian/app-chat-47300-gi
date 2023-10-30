import {fileURLToPath} from "url";
import {dirname} from "path";

//file URL to path nos permite obtener el path de donde estoy trabajando (escribir en consola pwd)

//dirname nos convierte el fileurlToPath en formato de ruta legible (nos crea el path absoluto)

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default __dirname