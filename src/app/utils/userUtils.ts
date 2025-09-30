// Utility functions for user identification and management

/**
 * Generate a unique user ID
 */
export const generateUserId = (): string => {
  return `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Get or create a user ID from localStorage
 */
export const getUserId = (): string => {
  if (typeof window === "undefined") return "";

  let userId = localStorage.getItem("rateSnapUserId");

  if (!userId) {
    userId = generateUserId();
    localStorage.setItem("rateSnapUserId", userId);
  }

  return userId;
};

/**
 * Get user-specific localStorage key
 */
export const getUserStorageKey = (key: string): string => {
  const userId = getUserId();
  return `${userId}_${key}`;
};

/**
 * Clear user data (for logout or reset)
 */
export const clearUserData = (): void => {
  if (typeof window === "undefined") return;

  const userId = getUserId();
  const keys = Object.keys(localStorage);

  // Remove all keys associated with this user
  keys.forEach((key) => {
    if (key.startsWith(userId)) {
      localStorage.removeItem(key);
    }
  });
};