import { download } from './functions/download'
import { api, TMDBExternalSources } from './functions/api'
import * as assert from 'assert'


main()
async function main() {
  try {
    const apiKey = process.env.NODE_TMDB_API_KEY
    assert.ok(apiKey, "NODE_TMDB_API_KEY not defined in your env! Giving up.")
    const proxy = process.env.NODE_TMDB_API_PROXY

    const id = "nm0000003"
    const res = await api(apiKey).useProxy(proxy).find(TMDBExternalSources.imdb).byId(id)
    console.log(JSON.stringify(res, null, 2))
  } catch (err) {
    console.error(err)
  }
}