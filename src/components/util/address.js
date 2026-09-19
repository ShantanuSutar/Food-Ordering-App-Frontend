export const canonicalAddress = (address = {}) => ({
  ...(address.id != null && { id: address.id }),
  fullName: address.fullName?.trim() || '',
  streetAddress: address.streetAddress?.trim() || '',
  city: address.city?.trim() || '',
  state: address.state?.trim() || '',
  postalCode: address.postalCode?.trim() || '',
  country: address.country?.trim() || '',
})

export const isAddressComplete = (address) => {
  const normalized = canonicalAddress(address)
  return [
    normalized.fullName,
    normalized.streetAddress,
    normalized.city,
    normalized.state,
    normalized.postalCode,
    normalized.country,
  ].every(Boolean)
}

export const addressKey = (address) => {
  const normalized = canonicalAddress(address)
  return [
    normalized.fullName,
    normalized.streetAddress,
    normalized.city,
    normalized.state,
    normalized.postalCode,
    normalized.country,
  ].map((value) => value.toLocaleLowerCase()).join('|')
}

export const formatAddress = (address) => {
  const normalized = canonicalAddress(address)
  return [
    normalized.streetAddress,
    normalized.city,
    normalized.state,
    normalized.postalCode,
    normalized.country,
  ].filter(Boolean).join(', ')
}
