import { format } from 'date-fns'

export function getFormattedDate(dateString: string): string {
    return format(new Date(dateString), "yyyy-MM-dd HH:mm:ss")
}