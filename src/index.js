import { envs } from "./config/envs.js";

import app from "./server.js";

const PORT = envs.PORT || 4000;
//npm run dev para iniciar el servidor en modo desarrollo
app.listen(PORT, () => {
  console.log(`servidor corriendo en el puerto: ${PORT}`);
});
