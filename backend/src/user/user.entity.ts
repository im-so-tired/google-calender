import { Column, Entity, JoinColumn, OneToMany } from 'typeorm'
import { EventsEntity } from '../events/events.entity'
import { Base } from '../utils/base'
import { RemindersEntity } from '../reminders/reminders.entity'
import { TasksEntity } from '../tasks/tasks.entity'

@Entity('user')
export class UserEntity extends Base {
	@Column({ unique: true })
	email: string
	@Column({ select: false })
	password: string
	@Column({ default: '' })
	name: string
	@Column({ default: '', name: 'avatar_path' })
	avatarPath: string
	@OneToMany(() => EventsEntity, event => event.author)
	@JoinColumn({ name: 'events_id' })
	events: EventsEntity[]
	@OneToMany(() => RemindersEntity, reminder => reminder.author)
	@JoinColumn({ name: 'reminders_id' })
	reminders: RemindersEntity[]
	@OneToMany(() => TasksEntity, task => task.author)
	@JoinColumn({ name: 'tasks_id' })
	tasks: TasksEntity[]
}
