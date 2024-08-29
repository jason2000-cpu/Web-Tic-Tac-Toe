const mongoose = require('mongoose')

const MONGODB_URI = 'mongodb+srv://JasonAdmin:Jack2000@cluster0.cyzgpn2.mongodb.net//tictactoe?retryWrites=true&w=majority&appName=Cluster0';
// const MONGODB_URI = 'mongodb://127.0.0.1:27017/tictactoe'

if (!MONGODB_URI) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env.local'
  );
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose;
    });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

// export default dbConnect;

module.exports = dbConnect

