import { UserEntity } from '../user/user.entity'
import { Column, ManyToOne, JoinColumn, Entity } from 'typeorm'
import { ITimeInterval } from '../utils/types/timeInterval'
import * as moment from 'moment'
import { Base } from '../utils/base'

@Entity('events')
export class EventsEntity extends Base {
	@ManyToOne(() => UserEntity, author => author.events)
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
	@ManyToOne(() => UserEntity, user => user.id)
	@JoinColumn({ name: 'user_id' })
	guests: UserEntity[]
	@Column({ default: '' })
	location: string
	@Column({ default: '', type: 'text' })
	description: string
	@Column()
	reminder?: number
}
