import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { getTypeOrmConfig } from './configs/typeorm.config'
import { UserModule } from './user/user.module'
import { AuthModule } from './auth/auth.module'
import { EventsModule } from './events/events.module'
import { TasksModule } from './tasks/tasks.module'
import { RemindersModule } from './reminders/reminders.module'
import { ServeStaticModule } from '@nestjs/serve-static'
import { path } from 'app-root-path'

@Module({
	imports: [
		ConfigModule.forRoot(),
		TypeOrmModule.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: getTypeOrmConfig,
		}),
		ServeStaticModule.forRoot({
			rootPath: `${path}/upload`,
			serveRoot: '/upload',
		}),
		UserModule,
		AuthModule,
		EventsModule,
		TasksModule,
		RemindersModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {
}
