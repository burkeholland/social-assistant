const cosmos = require('@azure/cosmos')

const { CosmosClient } = cosmos
const client = new CosmosClient(process.env.COSMOSDB_CONNECTION_STRING)
const database = client.database('SocialAssistant')
const container = database.container('Prompts')

const prompsService = {
  async getPrompts(userId) {

    // Get all prompts from the database where the userid matches the one passed in or there is no userId field at all
    const { resources } = await container.items
      .query(`SELECT * from c WHERE c.userId = "${userId}" OR NOT IS_DEFINED(c.userId) OR c.isPublic = true`)
      .fetchAll()

    return resources
  },
  async getPrompt(id) {
    const { resource } = await container.item(id, undefined).read()
    return resource
  },
  async getPromptByTitle(title) {
    const { resources } = await container.items
      .query(`SELECT * from c WHERE c.title = "${title}"`)
      .fetchAll()
    return resources
  },
  async createPrompt(title, category, text, isPublic, userId) {
    // do an upset to the db - partition key is 'category'
    const { resource } = await container.items.create({
      category,
      title,
      text,
      isPublic,
      userId
    })

    return resource
  },
  async updatePrompt(id, title, category, text, isPublic, userId) {
    const { resource: prompt } = await container.item(id, undefined).read()
    prompt.title = title
    prompt.category = category
    prompt.text = text
    prompt.isPublic = isPublic
    prompt.userId = userId

    const { resource } = await container.item(id).replace(prompt)

    return resource
  },
  async deletePrompt(id) {
    await container.item(id, undefined).delete()
    return id
  }
}

module.exports = prompsService
