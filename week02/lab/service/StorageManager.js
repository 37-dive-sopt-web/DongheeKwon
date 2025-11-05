/**
 * 로컬스토리지 데이터 관리를 담당하는 클래스
 */
export class StorageManager {
  constructor(storageKey) {
    this.storageKey = storageKey;
  }

  load() {
    try {
      const data = localStorage.getItem(this.storageKey);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error("데이터 로드 실패:", error);
      return null;
    }
  }

  save(data) {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(data));
      return true;
    } catch (error) {
      console.error("데이터 저장 실패:", error);
      return false;
    }
  }
}
