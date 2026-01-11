import { Injectable } from '@angular/core';

const STORAGE_PREFIX = 'zabracadabra_';

export const STORAGE_KEYS = {
  USERNAME: `${STORAGE_PREFIX}username`,
  INTRO_SEEN: `${STORAGE_PREFIX}intro_seen`,
} as const;

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  get<T>(key: string): T | null {
    const value = localStorage.getItem(key);
    if (!value) return null;

    try {
      return JSON.parse(value) as T;
    } catch {
      return value as T;
    }
  }

  set<T>(key: string, value: T): void {
    const serialized = typeof value === 'string' ? value : JSON.stringify(value);
    localStorage.setItem(key, serialized);
  }

  remove(key: string): void {
    localStorage.removeItem(key);
  }

  has(key: string): boolean {
    return localStorage.getItem(key) !== null;
  }

  // Convenience methods for username
  getUsername(): string | null {
    return this.get<string>(STORAGE_KEYS.USERNAME);
  }

  setUsername(name: string): void {
    this.set(STORAGE_KEYS.USERNAME, name);
  }

  hasUsername(): boolean {
    return this.has(STORAGE_KEYS.USERNAME);
  }

  // Convenience methods for intro modal
  hasSeenIntro(): boolean {
    return this.has(STORAGE_KEYS.INTRO_SEEN);
  }

  setIntroSeen(): void {
    this.set(STORAGE_KEYS.INTRO_SEEN, true);
  }
}
