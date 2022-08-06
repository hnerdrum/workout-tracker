
export function validateDate(date: string): boolean | string {
    if (new Date(date) <= new Date()) return true;
    return "Workout must have happened in the past"
}