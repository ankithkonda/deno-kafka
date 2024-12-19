import { Kafka } from 'kafkajs'

const kafka = new Kafka({
  clientId: 'extiction-alerts',
  brokers: ['kafka:9092'],
})
// funny group name

const consumer = kafka.consumer({ groupId: 'about-to-be-extinct' })

const run = async () => {
  // Consuming
  await consumer.connect()
  await consumer.subscribe({ topic: 'astroid-alerts', fromBeginning: true })

  await consumer.run({
    // deno-lint-ignore require-await
    eachMessage: async ({ topic, partition, message }) => {
      console.log({
        topic,
        partition,
        offset: message.offset,
        value: message.value.toString(),
      })
    },
  })
}

run().catch(console.error)