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
	time: number
	@Column({ default: '', type: 'text' })
	description: string
	@Column({ default: 'no-repeat' })
	repeat: repeatType
	@Column({ default: false })
	completed: boolean
	@Column({ default: null, name: 'group_id', type: 'bigint' })
	groupId: number | null
}
