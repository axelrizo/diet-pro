
export const formatToConsultApi = (date) => {
  return date.toISOString().slice(0, 10)
}

export const formatFriendlyToShow = (date) => {
  const dateConfig = { month: 'short', day: 'numeric' }
  return date.toLocaleDateString('en-US', dateConfig)
}

export const subtractDaysFromDate = (date, days) => {
  const newDate = new Date(date)
  newDate.setDate(newDate.getDate() - days)
  return newDate
}
