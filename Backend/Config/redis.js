// config/redis.js
import { createClient } from "redis";

let client;

const redisconnect = async () => {
  client = createClient({
    username: "default",
    password: process.env.REDIS_PASSWORD,
    socket: {
      host: process.env.REDIS_HOST,  
      port: process.env.REDIS_PORT,
    },
  });

  client.on("error", (err) => console.log("❌ Redis Client Error:", err));

  await client.connect();
  console.log("✅ Connected to Redis");

  
};

export { redisconnect, client };