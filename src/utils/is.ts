export function isProd() {
  return import.meta.env.MODE === 'production'
}

export function isDev() {
  return import.meta.env.MODE === 'development'
}
