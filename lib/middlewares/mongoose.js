import mongoose from 'mongoose';

const MONGODB_URI =
  process.env.NODE_ENV == 'development'
    ? process.env.MONGODB_URL_LOCAL
    : process.env.MONGODB_URL;

if (!MONGODB_URI) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env.local'
  );
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}
// there is a bug in this formula idk what its my 6th sense telling me :thinking:
async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }
  const yo = await cached.promise;
  if (!yo) {
    const opts = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      bufferCommands: false,
    };

    cached.promise = mongoose
      .connect(MONGODB_URI, opts)
      .then((mongoose) => {
        return mongoose;
      })
      .catch((e) => {
        console.log(e.message);
      });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

export default dbConnect;
