/*
 * SPDX-FileCopyrightText: syuilo and noridev and other misskey, cherrypick contributors
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { Inject, Injectable } from '@nestjs/common';
import { DI } from '@/di-symbols.js';
import type { UserGroupJoiningsRepository, UserGroupsRepository } from '@/models/index.js';
import type { Packed } from '@/misc/json-schema.js';
import type { MiUserGroup } from '@/models/entities/UserGroup.js';
import { bindThis } from '@/decorators.js';

@Injectable()
export class UserGroupEntityService {
	constructor(
		@Inject(DI.userGroupsRepository)
		private userGroupsRepository: UserGroupsRepository,

		@Inject(DI.userGroupJoiningsRepository)
		private userGroupJoiningsRepository: UserGroupJoiningsRepository,
	) {
	}

	@bindThis
	public async pack(
		src: MiUserGroup['id'] | MiUserGroup,
	): Promise<Packed<'UserGroup'>> {
		const userGroup = typeof src === 'object' ? src : await this.userGroupsRepository.findOneByOrFail({ id: src });

		const users = await this.userGroupJoiningsRepository.findBy({
			userGroupId: userGroup.id,
		});

		return {
			id: userGroup.id,
			createdAt: userGroup.createdAt.toISOString(),
			name: userGroup.name,
			ownerId: userGroup.userId,
			userIds: users.map((x: { userId: any; }) => x.userId),
		};
	}
}

