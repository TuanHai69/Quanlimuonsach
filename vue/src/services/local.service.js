class LocalStorageHelper {
    static getItem(key) {
        return localStorage.getItem(key);
    }

    static setItem(key, value) {
        localStorage.setItem(key, value);
    }

    static removeItem(key) {
        localStorage.removeItem(key);
    }

    static clear() {
        localStorage.clear();
    }
}

export default LocalStorageHelper;