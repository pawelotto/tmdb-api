import * as request from 'request-promise'

export function download(url: string, json?: boolean){
  let opts = {
    timeout: 10000,
    method: 'GET',
    url: url,
    json: json
  }
  return { 
    
    async proxy(proxyString: string){
      try {
        opts["proxy"] = proxyString
        return request(opts)
      } catch (err) {
        console.error(err)
      }
    },

    async noProxy(){
      try {
        return await request(opts)
      } catch (err) {
        console.error(err)
      }
    }
  }
}