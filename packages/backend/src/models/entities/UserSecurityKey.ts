/*
 * SPDX-FileCopyrightText: syuilo and other misskey, cherrypick contributors
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { PrimaryColumn, Entity, JoinColumn, Column, ManyToOne, Index } from 'typeorm';
import { id } from '../id.js';
import { MiUser } from './User.js';

@Entity('user_security_key')
export class MiUserSecurityKey {
	@PrimaryColumn('varchar', {
		comment: 'Variable-length id given to navigator.credentials.get()',
	})
	public id: string;

	@Index()
	@Column(id())
	public userId: MiUser['id'];

	@ManyToOne(type => MiUser, {
		onDelete: 'CASCADE',
	})
	@JoinColumn()
	public user: MiUser | null;

	@Index()
	@Column('varchar', {
		comment:
			'Variable-length public key used to verify attestations (hex-encoded).',
	})
	public publicKey: string;

	@Column('timestamp with time zone', {
		comment:
			'The date of the last time the UserSecurityKey was successfully validated.',
	})
	public lastUsed: Date;

	@Column('varchar', {
		comment: 'User-defined name for this key',
		length: 30,
	})
	public name: string;

	constructor(data: Partial<MiUserSecurityKey>) {
		if (data == null) return;

		for (const [k, v] of Object.entries(data)) {
			(this as any)[k] = v;
		}
	}
}
