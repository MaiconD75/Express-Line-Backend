import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import Deliveryman from './Deliveryman';
import Origin from './Origin';
import Recipient from './Recipient';

import User from './User';

@Entity('deliveries')
class Delivery {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  user_id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column()
  deliveryman_id: string;

  @ManyToOne(() => Deliveryman)
  @JoinColumn({ name: 'deliveryman_id' })
  deliveryman: Deliveryman;

  @Column()
  origin_id: string;

  @ManyToOne(() => Origin)
  @JoinColumn({ name: 'origin_id' })
  origin: Origin;

  @Column()
  recipient_id: string;

  @ManyToOne(() => Recipient)
  @JoinColumn({ name: 'recipient_id' })
  recipient: Recipient;

  @Column()
  product: string;

  @Column()
  signature: string;

  @Column()
  canceled_at: Date;

  @Column()
  start_date: Date;

  @Column()
  end_date: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Delivery;
