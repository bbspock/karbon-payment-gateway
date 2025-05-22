import {
  Table,
  Column,
  Model,
  PrimaryKey,
  DataType,
  CreatedAt,
  UpdatedAt,
} from 'sequelize-typescript';

export enum TransactionStatus {
  PENDING = 'PENDING',
  PROCESSING = 'PROCESSING',
  SUCCESS = 'SUCCESS',
  FAILED = 'FAILED',
  REFUNDED = 'REFUNDED',
}

@Table({ tableName: 'transactions', timestamps: true })
export class Transaction extends Model {
  @PrimaryKey
  @Column({ type: DataType.UUID })
  id!: string;

  @Column({ type: DataType.UUID })
  merchant_id!: string;

  @Column({ type: DataType.UUID })
  customer_id!: string;

  @Column({ type: DataType.DECIMAL(10, 2) })
  amount!: number;

  @Column(DataType.STRING)
  currency!: string;

  @Column(DataType.ENUM(...Object.values(TransactionStatus)))
  status!: TransactionStatus;

  @Column(DataType.STRING)
  third_party_provider_transaction_id?: string;

  @Column(DataType.STRING)
  error_code?: string;

  @Column(DataType.TEXT)
  error_message?: string;

  @CreatedAt
  @Column({ field: 'created_at' })
  created_at!: Date;

  @UpdatedAt
  @Column({ field: 'updated_at' })
  updated_at!: Date;
}

