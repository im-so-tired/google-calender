import { Base } from '../utils/base'
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm'
import { UserEntity } from '../user/user.entity'
import { repeatType } from '../utils/types/repeat'

@Entity('reminders')
export class RemindersEntity extends Base {
	@ManyToOne(() => UserEntity, author => author.events)
	@JoinColumn({ name: 'author_id' })
	author: UserEntity
	@Column()
	title: string
	@Column({ default: Date.now(), type: 'bigint' })
	time: number
	@Column({ default: 'no-repeat' })
	repeat: repeatType
}
