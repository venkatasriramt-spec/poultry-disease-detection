
import { useState, useEffect, useCallback } from 'react';

const API_KEY_STORAGE_KEY = 'gemini_api_key';
const API_KEY_EVENT = 'gemini_api_key_changed';

export function getApiKey() {
  return localStorage.getItem(API_KEY_STORAGE_KEY) || '';
}

export function setApiKey(key) {
  if (key && key.trim()) {
    localStorage.setItem(API_KEY_STORAGE_KEY, key.trim());
    window.dispatchEvent(new Event(API_KEY_EVENT));
    return true;
  }
  return false;
}

export function clearApiKey() {
  localStorage.removeItem(API_KEY_STORAGE_KEY);
  window.dispatchEvent(new Event(API_KEY_EVENT));
}

export function maskApiKey(key) {
  if (!key) return '';
  return '•'.repeat(Math.min(key.length, 30));
}

export function useApiKey() {
  const [apiKey, setApiKeyState] = useState(getApiKey());
  const [isVisible, setIsVisible] = useState(false);

  const syncState = useCallback(() => {
    setApiKeyState(getApiKey());
  }, []);

  useEffect(() => {
    window.addEventListener(API_KEY_EVENT, syncState);
    window.addEventListener('storage', syncState);
    
    return () => {
      window.removeEventListener(API_KEY_EVENT, syncState);
      window.removeEventListener('storage', syncState);
    };
  }, [syncState]);

  const toggleVisibility = () => setIsVisible(prev => !prev);
  const saveKey = (key) => setApiKey(key);
  const clearKey = () => clearApiKey();

  return {
    apiKey,
    maskedKey: maskApiKey(apiKey),
    isVisible,
    toggleVisibility,
    saveKey,
    clearKey,
    isConfigured: !!apiKey,
    getApiKey,
  };
}
