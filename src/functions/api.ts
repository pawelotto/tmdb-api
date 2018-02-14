import * as dotenv from 'dotenv'
dotenv.config()
import * as assert from 'assert'
import { URL } from 'url'
import { download } from './download'

export function api(apiKey: string) {
  const apiRoot: string = 'https://api.themoviedb.org/3/'
  let proxy: string
  const _api = this

  return {

    useProxy(proxyUrl: string) {
      proxy = proxyUrl
      return this
    },

    find(externalSource: TMDBExternalSources) {
      let url = apiUrl(apiRoot).applyExternalSource(externalSource)
      return {
        async byId(id: string) {
          try {
            const url = apiUrl(apiRoot)
              .applyMethod(TMDBApiMethods.find)
              .applyExternalId(id)
              .applyExternalSource(externalSource)
              .applyApiKey(apiKey)
              .get()
            const downloader = download(url, true)
            return proxy ? await downloader.proxy(proxy) : await downloader.noProxy()
          } catch (err) {
            console.error(err)
          }
        }
      }
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

export enum TMDBExternalSources {
  imdb = 'imdb_id',
  freebase = 'freebase_id',
  tvdb = 'tvdb_id',
  tvrage = 'tvrage_id'

}

export enum TMDBApiMethods {
  find = 'find'
}