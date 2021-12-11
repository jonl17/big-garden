import Prismic from '@prismicio/client'
import { apiEndpoint, accessToken } from '../config'

export const client = Prismic.client(apiEndpoint, {
  accessToken,
})

export const mapEvents = async () =>
  client.query(
    Prismic.Predicates.at('document.type', 'map_event')
  )
