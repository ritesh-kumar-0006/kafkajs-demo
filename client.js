const { Kafka } = require('kafkajs'); // Correct import from kafkajs package

const kafka = new Kafka({
    clientId: 'my-app',
    brokers: ['localhost:9092'] // Kafka broker address
});

module.exports = kafka;
