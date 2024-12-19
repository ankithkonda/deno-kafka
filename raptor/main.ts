import { Kafka } from 'kafkajs'
import moment from 'moment';

const kafka = new Kafka({
  clientId: 'extiction-alerts',
  brokers: ['kafka:9092'],
})

const producer = kafka.producer()

const run = async () => {
  await producer.connect()
  setInterval(sendMessage, 1000)
  
  const impactTime = moment().add(10, 'minutes');

  async function sendMessage() {
    const diffSeconds = impactTime.diff(moment(), 'seconds');
    await producer.send({
      topic: 'astroid-alerts',
      messages: [
        { value: `Astroid alert! Impact in ${diffSeconds} seconds, RUN!!` },
      ],
    })
  }
}

run().catch(console.error)