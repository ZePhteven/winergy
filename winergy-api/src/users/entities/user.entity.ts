import { BaseEntity } from '../../shared/models/entities';

export interface User extends BaseEntity {
  username: string;
  password: string;
}
