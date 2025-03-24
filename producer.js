const kafka = require("./client");

readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

async function init() {
  const producer = kafka.producer();
  console.log("Connecting...");
  await producer.connect();
  console.log("Connected");

  rl.setPrompt(">");
  rl.prompt();

  rl.on("line", async (line) => {
    const [riderName, location] = line.split(" ");

    await producer.send({
      topic: "rider-updates",
      messages: [
        {
          partition: location.toLowerCase() === "north" ? 0 : 1,
          kay: "location-update",
          value: JSON.stringify({
            name: riderName,
            location: location,
          }),
        },
      ],
    });
      
  }).on("close", async () => {
    console.log("Disconnecting...");
    await producer.disconnect();
  })

 

}
init().catch(console.error);
