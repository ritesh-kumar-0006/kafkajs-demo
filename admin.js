
const kafka = require('./client.js');


async function init() {
    const admin = kafka.admin();
    console.log('Connecting...');
    await admin.connect();
    console.log('Connected');

    // Create a new topic
    await admin.createTopics({
        topics: [{
            topic: 'rider-updates',
            numPartitions: 2
        }]

    });
    console.log('Created successfully');
    console.log('Disconnecting...');
    await admin.disconnect();

}

init().catch(console.error);