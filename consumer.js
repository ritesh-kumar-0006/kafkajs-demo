const kafka = require("./client");
const group = process.argv[2];
async function init() {
  const consumer = kafka.consumer({ groupId: group });
  console.log("Connecting...");
  await consumer.connect();
  console.log("Connected");

  await consumer.subscribe({ topic: "rider-updates", fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log(
        `${group}:[${topic}]: PART:${partition}:${message.value.toString()}`
      );
    },
  });
}

init().catch(console.error);
