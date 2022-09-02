import { Module } from '@nestjs/common';
import { ConfigModule } from "@nestjs/config";
import { PrismaModule } from "../prisma/prisma.module";
import { UsersModule } from "../users/users.module";
import { AuthModule } from "../auth/auth.module";
import { SessionModule } from "../session/session.module";
import { TodosModule } from "../todos/todos.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env'
    }),
    PrismaModule, UsersModule,
    AuthModule, SessionModule,
    TodosModule
  ]
})
export class AppModule {}
