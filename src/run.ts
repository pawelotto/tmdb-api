import { download } from './functions/download'
import { api } from './functions/api'

main()
async function main(){
  try {
    await api().findByImdbId('nm0000001')
  } catch (err) {
    console.error(err)
  }
  // const res = await download('https://fitnesi.pl/').proxy('tensor:8118')
  // const res = await download('https://iplogger.org/myip/').proxy('http://tensor:8118')
  // console.log(res)
}