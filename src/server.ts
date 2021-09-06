/* eslint-disable no-console */
import 'dotenv/config';
import app from './app';

app.listen(3333, () => {
  console.log('The ExpressLine is running in http://localhost:3333 ! 🚄');
});
