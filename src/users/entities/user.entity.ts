import { BaseEntity } from 'src/shared/models/entities';

export interface User extends BaseEntity {
  username: string;
  password: string;
}
