
export function validateDate(date: string): boolean | string {
    if (new Date(date) <= new Date()) return true;
    return "Workout must have happened in the past"
}

export function validateNumber(num: string): boolean | string {
    const match = num.match(/[0-9]+(\.[0-9])?/)
    return !!match || "Must be a valid number"
}