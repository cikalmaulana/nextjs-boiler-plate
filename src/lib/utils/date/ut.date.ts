// utils/date.ts

/** Format tanggal pakai Intl bawaan */
export function formatDate(
    date: Date | string,
    options: { 
        style?: "full" | "short" | "numeric"; 
        locale?: string 
    } = { style: "full", locale: "id-ID" }
): string {
    const d = new Date(date);
    const { style = "full", locale = "id-ID" } = options;

    switch (style) {
        case "full": // 11 Agustus 2025 / 11 August 2025
        return new Intl.DateTimeFormat(locale, {
            day: "2-digit",
            month: "long",
            year: "numeric",
        }).format(d);

        case "short": // 11 Agu 2025 / 11 Aug 2025
        return new Intl.DateTimeFormat(locale, {
            day: "2-digit",
            month: "short",
            year: "numeric",
        }).format(d);

        case "numeric": // 11/08/2025
        default:
        return new Intl.DateTimeFormat(locale, {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        }).format(d);
    }
}

/** Format waktu pakai Intl bawaan */
export function formatTime(
    date: Date | string,
    options: { withSeconds?: boolean; hour12?: boolean; locale?: string } = {}
): string {
    const d = new Date(date);
    const { withSeconds = false, hour12 = false, locale = "id-ID" } = options;

    return new Intl.DateTimeFormat(locale, {
        hour: "2-digit",
        minute: "2-digit",
        second: withSeconds ? "2-digit" : undefined,
        hour12,
    }).format(d);
}

/** Gabungan tanggal + waktu */
export function formatDateTime(
    date: Date | string,
    options: {
        dateStyle?: "full" | "short" | "numeric";
        withSeconds?: boolean;
        hour12?: boolean;
        locale?: string;
    } = {}
): string {
    return `${formatDate(date, { style: options.dateStyle, locale: options.locale })} ${formatTime(date, options)}`;
}

export function getTimezoneOffsetString(date: Date = new Date()): string {
    const offset = -date.getTimezoneOffset(); // dalam menit
    const sign = offset >= 0 ? "+" : "-";
    const hours = Math.floor(Math.abs(offset) / 60)
        .toString()
        .padStart(2, "0");
    const minutes = (Math.abs(offset) % 60).toString().padStart(2, "0");
    return `${sign}${hours}:${minutes}`;
}