import { Sequelize } from 'sequelize-typescript';
import { Comment } from 'src/comment/entities/comment.entity';
import { Post } from 'src/post/entities/post.entity';
import { User } from 'src/user/entities/user.entity';

export const databaseProvider = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: 'Salsabeel123!',
        database: 'SocialMedia',
        define: {
          underscored: true,
          deletedAt: true,
          paranoid: true,
        },
      });
      sequelize.addModels([User, Post, Comment]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
