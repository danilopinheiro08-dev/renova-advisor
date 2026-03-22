import localforage from "localforage";
import CryptoJS from "crypto-js";

// Initialize localforage store
localforage.config({
    name: "RenovaAdvisor",
    storeName: "secure_portfolio",
});

const getEncryptionKey = (): string => {
    // In a real app, this should be derived from the user's PIN using PBKDF2 or similar
    // For this prototype, we'll store a mock key in memory or session storage
    // to avoid plain text storage, assuming the PIN unlocks it.
    const storedKey = sessionStorage.getItem("app_derived_key");
    return storedKey || "fallback-temporary-key";
};

export const SecureStorage = {
    async setItem(key: string, value: any): Promise<void> {
        const encKey = getEncryptionKey();
        const stringified = JSON.stringify(value);
        const encrypted = CryptoJS.AES.encrypt(stringified, encKey).toString();
        await localforage.setItem(key, encrypted);
    },

    async getItem<T>(key: string): Promise<T | null> {
        const encKey = getEncryptionKey();
        const encrypted = await localforage.getItem<string>(key);
        if (!encrypted) return null;

        try {
            const decryptedBytes = CryptoJS.AES.decrypt(encrypted, encKey);
            const decryptedString = decryptedBytes.toString(CryptoJS.enc.Utf8);
            return JSON.parse(decryptedString) as T;
        } catch (e) {
            console.error("Failed to decrypt data", e);
            return null;
        }
    },

    async removeItem(key: string): Promise<void> {
        await localforage.removeItem(key);
    },

    async clear(): Promise<void> {
        await localforage.clear();
    }
};
