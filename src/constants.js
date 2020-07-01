//API地址
var api = {
  "development": {
    "API_BASE": "/api/",
    "IMG_BASE": "/media/",
  },
  "production": {
    // "API_BASE": "http://116.62.197.100:1337/"
    "API_BASE": "/api/",
    "IMG_BASE": "/media/",
  }
}
console.log(process.env.NODE_ENV, "process.env.NODE_ENV")
export const { API_BASE,IMG_BASE } = api[process.env.NODE_ENV];