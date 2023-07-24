import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { User } from 'src/modules/user/entities/user.entity';

@Table({
  tableName: 'posts',
})
export class Post extends Model {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  userId: number;

  @BelongsTo(() => User)
  user: User;

  @Column({
    type: DataType.STRING(250),
    allowNull: false,
  })
  content: string;

  @Column({
    type: DataType.DATE,
  })
  deletedAt: Date;
  
  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
  })
  deleteBy: number;
}
