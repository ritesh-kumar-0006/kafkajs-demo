const kafka = require("./client");

async function init() {
  const producer = kafka.producer();
  console.log("Connecting...");
  await producer.connect();
  console.log("Connected");

  await producer.send({
    topic: "rider-updates",
    messages: [
      {
        kay: "name",
        value: "SOUTH",
        partitions: 0,
      },
    ],
  });
  console.log("Message sent successfully");
  console.log("Disconnecting...");
  await producer.disconnect();
}
init().catch(console.error);
