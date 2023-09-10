class LocalStorage {
  get(key: string): string {
    return localStorage.getItem(key) || '';
  }

  has(key: string): boolean {
    return localStorage.getItem(key) !== null;
  }

  set(key: string, value: string) {
    localStorage.setItem(key, value);
  }

  remove(key: string) {
    localStorage.removeItem(key);
  }
}

export default LocalStorage;
