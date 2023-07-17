
/**
 * Dumps given Date object to srever required format.
 * @param datetime Datetime to dump to string
 * @returns given datetime in string format
 */
export const dumpDate = (datetime: Date): string => {
  const year = datetime.getFullYear().toString()
  const month = (datetime.getMonth() + 1).toString().padStart(2, '0')
  const day = datetime.getDate().toString().padStart(2, '0')
  const hours = datetime.getHours().toString().padStart(2, '0')
  const minutes = datetime.getMinutes().toString().padStart(2, '0')
  const seconds = datetime.getSeconds().toString().padStart(2, '0')
  const miliseconds = datetime.getMilliseconds().toString()
  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${miliseconds}`
}

export const longText = (text: string, limit: number): string => {
  return text.length > limit ? text.substr(0, limit) + '...' : text
}

export const cutQuotationMarks = (value: string): string => {
  if (value.length > 1) {
    return value.slice(1, value.length - 1)
  }
  return value
}
