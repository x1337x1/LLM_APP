const path = require("path");
require("dotenv").config();
const { Kafka, logLevel } = require('kafkajs')
const KafkaConsumer = require("./consumer");
const KafkaProducer = require("./producer");

class KafkaInstance {
    #consumer = null;
    #producer = null;
    constructor() {
        try {
            const kafkaInstance = new Kafka({
                clientId: 'atom-server',
                brokers: process.env.KAFKA_URL.split(','),

            });
            this.#consumer = new KafkaConsumer(kafkaInstance);
            this.#producer = new KafkaProducer(kafkaInstance);
        } catch (error) {
            console.log("Failed to connect to Kafka", error);
        }
    }
    get producer() {
        return this.#producer;
    }
    get consumer() {
        return this.#consumer;
    }
}

module.exports = new KafkaInstance();