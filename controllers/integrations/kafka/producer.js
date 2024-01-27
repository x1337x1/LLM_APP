const path = require("path");
const { KAFKA_TOPIC } = require("../../../constants/topics")
require("dotenv").config();

class KafkaProducer {

    constructor(kafkaInstance) {
        try {
            this.producer = kafkaInstance.producer()
            this.start();
        } catch (error) {
            console.error("Failed to init kafka producer")
        }
    }
    async start() {
        await this.producer.connect()
    }

    async shutdown() {
        await this.producer.disconnect()
    }
    async convertToBatchAndSend(messages, topicName) {
        const kafkaBatchMessage = messages.map((message) => {
            return {
                value: JSON.stringify(message)
            }
        })
        const topicMessages = {
            topic: topicName,
            messages: kafkaBatchMessage,
            acks: -1,
        }
        const batch = {
            topicMessages: [topicMessages]
        }
        await this.producer.sendBatch(batch)
    }

    async sendQuery(messages) {
        try {
            await this.convertToBatchAndSend(messages, KAFKA_TOPIC.PRODUCER.PYTHON_PROCCESSING)
            console.log('SENDING QUERY TO TOPIC >>> python_broker <<<<')
        } catch (error) {
            console.error("Error sending admin query to Kafka ", error)
        }
    }

}
module.exports = KafkaProducer;