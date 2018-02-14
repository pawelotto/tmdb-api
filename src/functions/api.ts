import * as dotenv from 'dotenv'
dotenv.config()
import * as assert from 'assert'
import { URL } from 'url'
import { download } from './download'

export function api(apiKey?: string, proxyUrl?: string) {
  const apiRoot = process.env.NODE_MOVIENGINE_TMDB_API_ROOT
  apiKey = apiKey || process.env.NODE_MOVIENGINE_TMDB_API_KEY
  assert.ok(apiRoot && apiKey, "NODE_MOVIENGINE_TMDB_API_ROOT or NODE_MOVIENGINE_TMDB_API_KEY not defined in your env")
  proxyUrl = proxyUrl || process.env.NODE_MOVIENGINE_TMDB_API_PROXY
  assert.ok(proxyUrl, "Proxy must be defined in either env or as function argument, check NODE_MOVIENGINE_TMDB_API_PROXY")


  return {
    async findByImdbId(imdbId: string) {
      try {
        const url = apiUrl(apiRoot)
          .applyMethod(TMDBApiMethods.find)
          .applyExternalId(imdbId)
          .applyApiKey(apiKey)
          .applyExternalSource(TMDBExternalSources.imdb)
          .get()

        // console.log(url)
        const res = await download(url).proxy(proxyUrl)
        console.log(res)
      } catch (err) {
        console.error(err)
      }
    }
  }

  function apiUrl(rootUrl: string) {
    let uri = new URL(rootUrl)
    return {
      applyMethod(method: TMDBApiMethods) {
        const _this = this
        uri.pathname += method
        return {
          applyExternalId(id: string) {
            uri.pathname += '/' + id
            return _this
          }
        }
      },

      applyExternalSource(externalSource: TMDBExternalSources) {
        uri.searchParams.append('external_source', externalSource)
        return this
      },

      applyApiKey(apiKey: string) {
        uri.searchParams.append('api_key', apiKey)
        return this
      },

      get() {
        return uri.toString()
      }
    }
  }
}

enum TMDBExternalSources {
  imdb = 'imdb_id'
}

enum TMDBApiMethods {
  find = 'find'
}