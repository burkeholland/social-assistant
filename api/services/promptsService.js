const cosmos = require('@azure/cosmos')

const { CosmosClient } = cosmos
const client = new CosmosClient(process.env.COSMOSDB_CONNECTION_STRING)
const database = client.database('SocialAssistant')
const container = database.container('Prompts')

const prompsService = {
  async getPrompts() {
    const { resources } = await container.items.readAll().fetchAll()
    return resources
  },
  async getPrompt(id) {
    const { resource } = await container.item(id, id).read()
    return resource
  },
  async getPromptByTitle(title) {
    const { resources } = await container.items
      .query(`SELECT * from c WHERE c.title = "${title}"`)
      .fetchAll()
    return resources
  },
  async createPrompt(title, category, text, userId) {
    // do an upset to the db - partition key is 'category'
    const { resource } = await container.items.create({
      category,
      title,
      text,
      userId
    })

    return resource
  },
  async deletePrompt(id) {
    await container.item(id, undefined).delete()
    return id
  }
}

module.exports = prompsService
