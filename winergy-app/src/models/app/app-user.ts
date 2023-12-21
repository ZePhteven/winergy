import { AppUserRole } from "./app-user-role.enum";

export interface AppUser {
  /**
   * User's email address
   */
  email?: string;

  /**
   * User's identifier
   */
  id?: string;

  /**
   * User's name
   */
  name?: string;

  /**
   * User's profile picture's URL
   */
  picture?: string;

  /**
   * User's roles
   */
  roles: AppUserRole[];
}
