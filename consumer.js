const kafka = require("./client");

async function init() {
  const consumer = kafka.consumer({ groupId: "user1" });
  console.log("Connecting...");
  await consumer.connect();
  console.log("Connected");

  await consumer.subscribe({ topic: "rider-updates", fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log(`[${topic}]: PART:${partition}:${message.value.toString()}`);
    },
  });
}

init().catch(console.error);