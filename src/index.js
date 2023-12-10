import 'dotenv/config'
import app from './app.js';
import chalk from 'chalk';
const PORT = 8080;

// Inicia la aplicación
//**** UP SERVER  */
app.listen(PORT, () => {
  console.log(chalk.bgYellowBright.black.bold(`SERVER UP PORT: ${PORT}`));
});

