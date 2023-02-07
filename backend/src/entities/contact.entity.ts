import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Client } from "./client.entity";

@Entity("contacts")
export class Contact {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 150 })
  name: string;

  @Column({ length: 127 })
  email: string;

  @Column({ length: 15, unique: true })
  phone: string;

  @CreateDateColumn()
  date_joined: Date;

  @ManyToOne(() => Client, { onDelete: "CASCADE" })
  client: Client;
}
