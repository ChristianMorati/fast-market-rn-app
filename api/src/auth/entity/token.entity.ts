import BaseEntity from "src/base_entity/base.entity";
import { Column, Entity } from "typeorm";

@Entity()
export class Token extends BaseEntity {
  @Column()
  user_id: number;

  @Column('text')
  refresh_token: string;
}
