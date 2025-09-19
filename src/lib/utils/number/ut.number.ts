export function toPercentage(num: number, decimals = 0): string {
    return (num * 100).toFixed(decimals) + "%";
}

/** Format angka pakai pemisah ribuan */
export function formatWithSeparator(num: number, separator = "."): string {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, separator);
}