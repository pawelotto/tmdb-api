# tmdb-api #
Yet another tmdb (themoviedb.org) API v3 wrapper written in functional fashion.

## Installation ##
__npm i tmdb-api__ - that's it, really

## How to use ##
* In order to use the tmdb AOU you need to register with themoviedb.org and apply for an API key. Instructions here: https://developers.themoviedb.org/3/getting-started/introduction
* Your API key must be provided in requests you make, please see examples below.
* You can use a http proxy with a chained method __withProxy(<http://foobarproxy:8118>)__
* Currently only the method __find()__ is available, but I'm still working on implementing the API in full. Please be patient.

## Examples ##
A TypeScript example: 


import { api, TMDBExternalSources } from './functions/api'
import * as assert from 'assert'


main()
async function main() {
  try {
    const apiKey = process.env.NODE_TMDB_API_KEY
    assert.ok(apiKey, "NODE_TMDB_API_KEY not defined in your env! Giving up.")
    const proxy = process.env.NODE_TMDB_API_PROXY

    const id = "nm0000001"
    const res = await api(apiKey)
      .useProxy(proxy)
      .find(TMDBExternalSources.imdb)
      .byId(id)

    console.log(JSON.stringify(res, null, 2))
  } catch (err) {
    console.error(err)
  }
}