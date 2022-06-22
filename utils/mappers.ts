export function convertDateToSimpleString(dbDate: Date): string {
  const month = dbDate.getMonth() + 1
  const day = dbDate.getUTCDate()
  const year = dbDate.getUTCFullYear()

  return (
    (month.toString().length == 1 ? '0' + month.toString() : month.toString()) +
    '-' +
    (day.toString().length == 1 ? '0' + day.toString() : day .toString()) +
    '-' +
    year.toString()
  )
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
