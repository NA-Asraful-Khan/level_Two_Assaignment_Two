import app from './app';
import config from './app/config';
import mongoose from 'mongoose';

const PORT = config.port||8000

async function main() {
  try {
    await mongoose.connect(config.database_url as string);

    app.listen(config.port, () => {
      console.log(`Example app listening on port ${PORT}`);
    });
  } catch (err) {
    console.log(err);
  }
}

main();
