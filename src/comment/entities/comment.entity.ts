import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Post } from 'src/post/entities/post.entity';
import { User } from 'src/user/entities/user.entity';

@Table({
  tableName: 'comments',
})
export class Comment extends Model {
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

  @ForeignKey(() => Post)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  postId: number;

  @BelongsTo(() => Post)
  post: Post;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  comment: string;

  @Column({
    type: DataType.DATEONLY,
    allowNull: false,
  })
  deleteBy: Date;
}
