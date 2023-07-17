import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({
  tableName: 'users',
})
export class User extends Model {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.STRING(100),
    allowNull: false,
  })
  username: string;

  @Column({
    type: DataType.STRING(100),
    allowNull: false,
    validate: {
      isEmail: true,
    },
  })
  email: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;

  @Column({
    type: DataType.DATEONLY,
    allowNull: false,
  })
  birthday: Date;

  @Column({
    type: DataType.BIGINT,
    allowNull: false,
  })
  phoneNumber: number;

  @Column({
    type: DataType.DATEONLY,
    allowNull: false,
  })
  deleteBy: Date;
}
