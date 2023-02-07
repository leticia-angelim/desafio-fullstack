import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Exclude } from "class-transformer";
import { Contact } from "./contact.entity";

@Entity("clients")
export class Client {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 150 })
  name: string;

  @Column({ length: 127, unique: true })
  email: string;

  @Column({ length: 120 })
  @Exclude()
  password: string;

  @Column({ length: 15 })
  phone: string;

  @CreateDateColumn()
  date_joined: Date;

  @Column({ default: true })
  isActive: boolean;

  @OneToMany(() => Contact, (contact) => contact.client, { cascade: true })
  contacts: Contact[];
}
