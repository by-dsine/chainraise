// date functions
// there are probably better ways to do this crap but alas I have not heard of them
export function convertDateToSimpleString(dbDate: any): string {
  const month = dbDate.getMonth() + 1 // 0-indexed
  const day = dbDate.getUTCDate()
  const year = dbDate.getUTCFullYear()

  return (
    (month.toString().length == 1 ? '0' + month.toString() : month.toString()) +
    '-' +
    (day.toString().length == 1 ? '0' + day.toString() : day.toString()) +
    '-' +
    year.toString()
  )
}

export function mapDatabaseTimestampToDateFormat(date: any): string {
  if (!date) {
    return ''
  }

  const year = date.substring(0, 4)
  const month = date.substring(5, 7)
  const day = date.substring(8, 10)

  console.log(
    year.toString() +
      '-' +
      (month.toString().length == 1
        ? '0' + month.toString()
        : month.toString()) +
      '-' +
      (day.toString().length == 1 ? '0' + day.toString() : day.toString())
  )

  return (
    year.toString() +
    '-' +
    (month.toString().length == 1 ? '0' + month.toString() : month.toString()) +
    '-' +
    (day.toString().length == 1 ? '0' + day.toString() : day.toString())
  )
}
export function convertInputDateToNCFormat(date: string): string {
  const year = date.substring(0, 4)
  const month = date.substring(5, 7)
  const day = date.substring(8)

  return (
    (month.toString().length == 1 ? '0' + month.toString() : month.toString()) +
    '-' +
    (day.toString().length == 1 ? '0' + day.toString() : day.toString()) +
    '-' +
    year.toString()
  )
}

export function convertInputDateToDateTime(date: string): Date {
  const year = parseInt(date.substring(0, 4))
  const _OneIndexedMonth = date.substring(5, 7)
  const month = parseInt(_OneIndexedMonth) - 1
  const day = parseInt(date.substring(8))

  return new Date(year, month, day)
}

// returns string representation of number with decimals
export function formatAmountForNC(amount: number): string {
  return amount.toFixed(2)
}

export function addCentsForDatabase(amount: number): number {
  return amount * 100
}
// domain tables

export function mapStatusId(statusId: number): string {
  switch (statusId) {
    case 1:
      return 'Created'
    case 2:
      return 'Ready to Launch'
    case 3:
      return 'Active'
    default:
      return 'Invalid status'
  }
}

export function mapResourceType(statusId: number): string {
  switch (statusId) {
    case 1:
      return 'img'
    case 2:
      return 'video'
    default:
      return 'Invalid status'
  }
}
