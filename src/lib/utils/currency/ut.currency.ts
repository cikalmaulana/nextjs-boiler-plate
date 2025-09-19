export function formatCurrency(
    value: number,
    currency: "IDR" | "USD" = "IDR",
    locale: "id-ID" | "en-US" = "id-ID"
): string {
    return new Intl.NumberFormat(locale, {
        style: "currency",
        currency,
        minimumFractionDigits: 0,
    }).format(value);
}
