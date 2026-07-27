const DB_NAME = "quran_offline";
const DB_VERSION = 2;
const SURAH_STORE = "surahs";
const AUDIO_STORE = "audio";
const ROMAN_URDU_STORE = "roman_urdu";

function openDB() {
  return new Promise((resolve, reject) => {
    if (!("indexedDB" in window)) {
      reject(new Error("IndexedDB not available"));
      return;
    }
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);
    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains(SURAH_STORE)) {
        db.createObjectStore(SURAH_STORE);
      }
      if (!db.objectStoreNames.contains(AUDIO_STORE)) {
        db.createObjectStore(AUDIO_STORE);
      }
      if (!db.objectStoreNames.contains(ROMAN_URDU_STORE)) {
        db.createObjectStore(ROMAN_URDU_STORE);
      }
    };
  });
}

export async function saveSurah(surahNumber, data) {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(SURAH_STORE, "readwrite");
    tx.objectStore(SURAH_STORE).put(data, surahNumber);
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}

export async function getSurah(surahNumber) {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(SURAH_STORE, "readonly");
    const request = tx.objectStore(SURAH_STORE).get(surahNumber);
    request.onsuccess = () => resolve(request.result || null);
    request.onerror = () => reject(request.error);
  });
}

export async function deleteSurah(surahNumber) {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(SURAH_STORE, "readwrite");
    tx.objectStore(SURAH_STORE).delete(surahNumber);
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}

export async function saveAudio(key, blob) {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(AUDIO_STORE, "readwrite");
    tx.objectStore(AUDIO_STORE).put(blob, key);
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}

export async function getAudio(key) {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(AUDIO_STORE, "readonly");
    const request = tx.objectStore(AUDIO_STORE).get(key);
    request.onsuccess = () => resolve(request.result || null);
    request.onerror = () => reject(request.error);
  });
}

export async function deleteAudio(key) {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(AUDIO_STORE, "readwrite");
    tx.objectStore(AUDIO_STORE).delete(key);
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}

export async function getDownloadedSurahNumbers() {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(SURAH_STORE, "readonly");
    const request = tx.objectStore(SURAH_STORE).getAllKeys();
    request.onsuccess = () => resolve(request.result || []);
    request.onerror = () => reject(request.error);
  });
}

export async function saveRomanUrdu(surahNumber, data) {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(ROMAN_URDU_STORE, "readwrite");
    tx.objectStore(ROMAN_URDU_STORE).put(data, surahNumber);
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}

export async function getRomanUrdu(surahNumber) {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(ROMAN_URDU_STORE, "readonly");
    const request = tx.objectStore(ROMAN_URDU_STORE).get(surahNumber);
    request.onsuccess = () => resolve(request.result || null);
    request.onerror = () => reject(request.error);
  });
}