import { Base } from '../utils/base'
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm'
import { UserEntity } from '../user/user.entity'
import { repeatType } from '../utils/types/repeat'
import * as moment from 'moment'

@Entity('reminders')
export class RemindersEntity extends Base {
	@ManyToOne(() => UserEntity, author => author.events)
	@JoinColumn({ name: 'author_id' })
	author: UserEntity
	@Column()
	title: string
	@Column({ default: moment().unix(), type: 'bigint' })
	time: number
	@Column({ default: 'no-repeat' })
	repeat: repeatType
	@Column({ default: null, name: 'group_id', type: 'bigint' })
	groupId: number | null
}
