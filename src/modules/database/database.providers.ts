import { ConfigService } from '@nestjs/config';
import { Sequelize } from 'sequelize-typescript';
import { Comment } from 'src/modules/comment/entities/comment.entity';
import { DATABASE_CONSTANT } from 'src/common/constant';
import { Post } from 'src/modules/post/entities/post.entity';
import { User } from 'src/modules/user/entities/user.entity';

export const databaseProvider = [
  {
    provide: DATABASE_CONSTANT.DATABASE_PROVIDE,
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) => {
      const sequelize = new Sequelize({
        ...configService.get('database'),
        define: {
          underscored: true,
          paranoid: true,
        },
      });
      sequelize.addModels([User, Post, Comment]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
