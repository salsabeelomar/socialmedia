import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  BadGatewayException,
} from '@nestjs/common';

import { InjectConnection } from '@nestjs/sequelize';
import { Observable, catchError } from 'rxjs';

import { tap } from 'rxjs/operators';
import { Sequelize } from 'sequelize-typescript';
import { Inject } from '@nestjs/common';
import { Transaction } from 'sequelize';
import { DATABASE_CONSTANT } from '../constant';

@Injectable()
export class TransactionInterceptor<T> implements NestInterceptor {
  constructor(
    @Inject(DATABASE_CONSTANT.DATABASE_PROVIDE)
    private readonly sequelizeInstance: Sequelize,
  ) {}
  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const httpContext = context.switchToHttp();
    const req = httpContext.getRequest();

    const transaction: Transaction = await this.sequelizeInstance.transaction();
    req.transaction = transaction;

    return next.handle().pipe(
      tap(() => {
        transaction.commit();
      }),
      catchError((err) => {
        transaction.rollback();
        throw new BadGatewayException(err);
      }),
    );
  }
}
