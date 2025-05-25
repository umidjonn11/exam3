import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './user/user.module';
import { VoteModule } from './vote/vote.module';
import { PollModule } from './poll/poll.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user/entities/user.entity';
import { Poll } from './poll/entities/poll.entity';
import { Vote } from './vote/entities/vote.entity';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';


@Module({
  imports: [UsersModule, PollModule, VoteModule, PollModule,TypeOrmModule.forRoot({
    host: 'localhost',
    username: 'postgres',
    port: 5432,
    database: 'exam3',
    password: 'umidjon06',
    type: 'postgres',
    synchronize: true,
    entities: [UserEntity,Poll,Vote],
    autoLoadEntities: true,
  }),
  TypeOrmModule.forFeature([UserEntity,Vote, Poll]),
  GraphQLModule.forRoot<ApolloDriverConfig>({
    driver: ApolloDriver,
    playground: true,
    graphiql: true,
    autoSchemaFile: './src/schema.gql',
    context: ({ req }) => ({ req }),
  }),
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
