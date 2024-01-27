require("dotenv").config();
const { KAFKA_TOPIC } = require('../../../constants/topics')
const replyQuery = KAFKA_TOPIC.CONSUMER.NODE_PROCESSING
class KafkaConsumer {
    constructor(kafkaInstance) {
        try {
            this.consumer = kafkaInstance.consumer({ groupId: 'node-server' })
            this.start();
            console.log("Consumer initialized succesfully");
        } catch (error) {
            console.error("Error initializing Kafka consumer ", error)
        }
    }
    async start() {
        const topics = [replyQuery];
        console.log("Subscribed to these topics ", topics);
        await this.consumer.connect();
        await this.consumer.subscribe({ topics: topics, fromBeginning: true });
        await this.consumer.run({
            eachMessage: async ({ topic, partition, message, heartbeat }) => {
                console.log("consumed", topic, JSON.parse(message.value))
                switch (topic) {
                    case replyQuery:
                        console.log(`CONSUMING FROM  QUERY TO TOPIC >>> ${replyQuery} <<<<`)
                        console.log(JSON.parse(message.value));
                        break;
                    default:
                        console.log(`Unrecognized topic`);
                }
                await heartbeat();
            }
        });
    }



}
module.exports = KafkaConsumer;