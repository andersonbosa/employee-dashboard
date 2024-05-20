import axios from 'axios'
import { EnvConfig } from '../configs/env.config'


const httpClient = {
  v1: axios.create({
    baseURL: EnvConfig.API_BASE_URL,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer // TODO extract authorization token from cookie`
    },
  })
}

export {
  httpClient
}
