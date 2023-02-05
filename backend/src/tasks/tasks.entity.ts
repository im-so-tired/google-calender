import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm'
import { UserEntity } from '../user/user.entity'
import * as moment from 'moment'
import { repeatType } from '../utils/types/repeat'
import { Base } from '../utils/base'

@Entity('tasks')
export class TasksEntity extends Base {
	@ManyToOne(() => UserEntity, author => author.tasks)
	@JoinColumn({ name: 'author_id' })
	author: UserEntity
	@Column()
	title: string
	@Column({ default: moment().unix(), name: 'start_time', type: 'bigint' })
	startTime: number
	@Column({
		default: moment().add(1, 'h').unix(),
		name: 'end_time',
		type: 'bigint',
	})
	endTime: number
	@Column({ default: '', type: 'text' })
	description: string
	@Column({ default: 'no-repeat' })
	repeat: repeatType
}
