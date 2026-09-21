export const safeAuthReturnPath = (value) => {
  if (typeof value !== 'string' || !value.startsWith('/') || value.startsWith('//')) return '/'
  if (value.startsWith('/account/')) return '/'
  return value
}

export const currentReturnPath = (location) => safeAuthReturnPath(
  `${location.pathname}${location.search || ''}${location.hash || ''}`,
)
