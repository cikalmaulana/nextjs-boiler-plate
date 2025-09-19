// utils/validation.ts

/** Email validation */
export function isEmailValid(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/** Indo phone number validation (mulai dari 08 atau +62) */
export function isPhoneNumberValid(phone: string): boolean {
    return /^(?:\+62|62|0)8[1-9][0-9]{6,11}$/.test(phone);
}

/** Password validation: min 8 char, ada huruf besar, kecil, angka, simbol */
export function isPasswordValid(password: string): boolean {
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);
}

/** Hanya angka */
export function isNumeric(str: string): boolean {
    return /^[0-9]+$/.test(str);
}

/** Hanya huruf */
export function isAlpha(str: string): boolean {
    return /^[A-Za-z]+$/.test(str);
}

/** Alphanumeric */
export function isAlphanumeric(str: string): boolean {
    return /^[A-Za-z0-9]+$/.test(str);
}

/** Valid URL */
export function isUrlValid(url: string): boolean {
    try {
        new URL(url);
        return true;
    } catch {
        return false;
    }
}

/** Valid username (huruf, angka, underscore, min 3 char) */
export function isUsernameValid(username: string): boolean {
    return /^[a-zA-Z0-9_]{3,}$/.test(username);
}

/** Valid hex color (#fff atau #ffffff) */
export function isHexColor(str: string): boolean {
    return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(str);
}

/** Valid credit card (16 digit, basic check) */
export function isCreditCardValid(card: string): boolean {
    return /^(?:\d[ -]*?){13,16}$/.test(card.replace(/\s|-/g, ""));
}

/** Valid postal code (Indonesia 5 digit) */
export function isPostalCodeValid(code: string): boolean {
    return /^[0-9]{5}$/.test(code);
}

/** Valid NIK (16 digit) */
export function isNIKValid(nik: string): boolean {
    return /^[0-9]{16}$/.test(nik);
}
