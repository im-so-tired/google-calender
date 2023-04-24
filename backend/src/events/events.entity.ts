import { UserEntity } from '../user/user.entity'
import { Column, ManyToOne, JoinColumn, Entity } from 'typeorm'
import * as moment from 'moment'
import { Base } from '../utils/base'
import { repeatType } from '../utils/types/repeat'

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
	// @OneToMany(() => UserEntity, user => user.email)
	// @JoinColumn({ name: 'users_email' })
	// guests: UserEntity[]
	@Column({ default: '' })
	guests: string
	// @Column({ default: '' })
	// location: string
	@Column({ default: '', type: 'text' })
	description: string
	@Column({ default: 'no-repeat' })
	repeat: repeatType
	@Column({ default: null, name: 'group_id', type: 'bigint' })
	groupId: number | null
}
