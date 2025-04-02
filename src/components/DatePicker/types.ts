export const daysOfWeek = [1, 2, 3, 4, 5, 6, 7] as const

export type DayOfWeek = (typeof daysOfWeek)[number]
