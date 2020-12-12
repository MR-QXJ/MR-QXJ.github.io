import axios from 'axios'

export function request(config) {
  const inter = axios.create({
    baseURL: '/api'
  })
  
  inter.interceptors.request.use(config => {
    const data = config.data
    if (config.method === 'post' && data) {
      const ret = []
      Object.keys(data).forEach(ele => ret.push(`${ele}=${data[ele]}`));
      config.data = ret.join('&')
    }
  
    return config
  })
  inter.interceptors.response.use(res => {
    return res.data
  })

  return inter(config)
}