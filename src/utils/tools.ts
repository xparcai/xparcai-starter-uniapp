export function getImageUrl(path: string): string {
  path = `${import.meta.env.VITE_APP_PUBLIC}static${path}`
  return new URL(path, import.meta.url).href
}

export function obj2str(obj: Recordable): string {
  const strArr: string[] = []
  for (const key in obj)
    strArr.push(`${key}=${obj[key]}`)
  return strArr.join('&')
}

export function str2obj(str: string): Recordable {
  const obj: Recordable = {}
  const objStr = /.+\?(.+)$/.exec(str)![1]
  const objStrArr = objStr.split('&')
  objStrArr.forEach((os) => {
    if (/=/.test(os)) {
      let [key, val] = os.split('=') as [key: string, val: any]
      val = /^\d+$/.test(val) ? Number.parseFloat(val) : val
      if (obj.hasOwn(key))
        obj[key] = [].concat(obj[key], val)
      else
        obj[key] = val
    }
    else {
      obj[os] = true
    }
  })
  return obj
}
