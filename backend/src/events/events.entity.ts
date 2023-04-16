import { UserEntity } from '../user/user.entity'
import { Column, ManyToOne, JoinColumn, Entity, OneToMany } from 'typeorm'
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
	startTime: bigint
	@Column({
		default: moment().add(1, 'h').unix(),
		name: 'end_time',
		type: 'bigint',
	})
	endTime: bigint
	// @OneToMany(() => UserEntity, user => user.email)
	// @JoinColumn({ name: 'users_email' })
	// guests: UserEntity[]
	@Column({ default: '' })
	guests: string
	@Column({ default: '' })
	location: string
	@Column({ default: '', type: 'text' })
	description: string
}
