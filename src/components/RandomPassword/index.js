import settings from "../../domainConfig";

export function generateRandomPassword(length) {

    let charset = settings?.domainName === "PINK99" 
    ? "0123456789" 
    : "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

    let password = "";
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        password += charset[randomIndex];
    }
    return password;
}

export function generateRandomPasswordCreate(length) {
    const charset = "0123456789";
    let password = "";
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        password += charset[randomIndex];
    }
    return password;
}

