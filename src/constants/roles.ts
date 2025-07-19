export const USER_ROLES = ["admin", "user", "editor"] as const;
export type UserRole = (typeof USER_ROLES)[number];
