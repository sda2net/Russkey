<!--
SPDX-FileCopyrightText: syuilo and other misskey, cherrypick contributors
SPDX-License-Identifier: AGPL-3.0-only
-->

<template>
<MkStickyContainer>
	<template #header><MkPageHeader :actions="headerActions" :tabs="headerTabs"/></template>
	<div style="overflow: clip;">
		<MkSpacer :contentMax="600" :marginMin="20">
			<div class="_gaps_m znqjceqz">
				<div v-panel class="about">
					<div ref="containerEl" class="container" :class="{ playing: easterEggEngine != null }">
						<img src="/client-assets/about-icon.png" alt="" class="icon" draggable="false" @load="iconLoaded" @click="gravity"/>
						<div class="cherrypick">Russkey</div>
						<div class="version" @click="whatIsNewCherryPick">v{{ version }}</div>
						<span v-for="emoji in easterEggEmojis" :key="emoji.id" class="emoji" :data-physics-x="emoji.left" :data-physics-y="emoji.top" :class="{ _physics_circle_: !emoji.emoji.startsWith(':') }">
							<MkCustomEmoji v-if="emoji.emoji[0] === ':'" class="emoji" :name="emoji.emoji" :normal="true" :noStyle="true"/>
							<MkEmoji v-else class="emoji" :emoji="emoji.emoji" :normal="true" :noStyle="true"/>
						</span>
					</div>
					<button v-if="thereIsTreasure" class="_button treasure" @click="getTreasure"><img src="/fluent-emoji/1f3c6.png" class="treasureImg"></button>
				</div>
				<div style="text-align: center;">
					{{ i18n.ts._aboutMisskey.about }}<br><a href="https://misskey-hub.net/docs/misskey.html" target="_blank" class="_link">{{ i18n.ts.learnMore }}</a>
				</div>
				<div v-if="$i != null" style="text-align: center;">
					<MkButton primary rounded inline @click="iLoveRusskey">I <Mfm text="$[jelly ❤]"/> #Russkey</MkButton>
					<MkButton primary rounded inline @click="iLoveMisskey">I <Mfm text="$[jelly ❤]"/> #Misskey</MkButton>
					<MkButton primary rounded inline @click="iLoveCherryPick">I <Mfm text="$[jelly ❤]"/> #CherryPick</MkButton>
				</div>
				<FormSection>
					<template #label>Russkey</template>
					<div class="_formLinks">
						<FormLink to="https://github.com/sda2net/Russkey" external>
							<template #icon><i class="ti ti-code"></i></template>
							{{ i18n.ts._aboutMisskey.source }}
							<template #suffix>GitHub</template>
						</FormLink>
					</div>
				</FormSection>
				<FormSection>
					<template #label>{{ i18n.ts._aboutMisskey.contributors }}</template>
					<div :class="$style.contributors">
						<a href="https://github.com/syuilo" target="_blank" :class="$style.contributor">
							<img src="https://avatars.githubusercontent.com/u/4439005?v=4" :class="$style.contributorAvatar">
							<span :class="$style.contributorUsername">@syuilo
								<span :class="$style.contributorClient">
									<span :class="$style.misskey">Misskey</span>
								</span>
							</span>
						</a>
						<a href="https://github.com/tamaina" target="_blank" :class="$style.contributor">
							<img src="https://avatars.githubusercontent.com/u/7973572?v=4" :class="$style.contributorAvatar">
							<span :class="$style.contributorUsername">@tamaina
								<span :class="$style.contributorClient">
									<span :class="$style.misskey">Misskey</span>
								</span>
							</span>
						</a>
						<a href="https://github.com/acid-chicken" target="_blank" :class="$style.contributor">
							<img src="https://avatars.githubusercontent.com/u/20679825?v=4" :class="$style.contributorAvatar">
							<span :class="$style.contributorUsername">@acid-chicken
								<span :class="$style.contributorClient">
									<span :class="$style.misskey">Misskey</span>
								</span>
							</span>
						</a>
						<a href="https://github.com/rinsuki" target="_blank" :class="$style.contributor">
							<img src="https://avatars.githubusercontent.com/u/6533808?v=4" :class="$style.contributorAvatar">
							<span :class="$style.contributorUsername">@rinsuki
								<span :class="$style.contributorClient">
									<span :class="$style.misskey">Misskey</span>
								</span>
							</span>
						</a>
						<a href="https://github.com/mei23" target="_blank" :class="$style.contributor">
							<img src="https://avatars.githubusercontent.com/u/30769358?v=4" :class="$style.contributorAvatar">
							<span :class="$style.contributorUsername">@mei23
								<span :class="$style.contributorClient">
									<span :class="$style.misskey">Misskey</span>
								</span>
							</span>
						</a>
						<a href="https://github.com/robflop" target="_blank" :class="$style.contributor">
							<img src="https://avatars.githubusercontent.com/u/8159402?v=4" :class="$style.contributorAvatar">
							<span :class="$style.contributorUsername">@robflop
								<span :class="$style.contributorClient">
									<span :class="$style.misskey">Misskey</span>
								</span>
							</span>
						</a>
						<a href="https://github.com/noridev" target="_blank" :class="$style.contributor">
							<img src="https://avatars.githubusercontent.com/u/11006910?v=4" :class="$style.contributorAvatar">
							<span :class="$style.contributorUsername">@noridev
								<span :class="$style.contributorClient">
									<span :class="$style.cherry">Cherry</span><span :class="$style.pick">Pick</span>
								</span>
							</span>
						</a>
						<a href="https://github.com/dev-aixel" target="_blank" :class="$style.contributor">
							<img src="https://avatars.githubusercontent.com/u/142141355?v=4" :class="$style.contributorAvatar">
							<span :class="$style.contributorUsername">@dev-aixel
								<span :class="$style.contributorClient">
									<span :class="$style.cherry">Russ</span><span :class="$style.pick">key</span>
								</span>
							</span>
						</a>
					</div>
					<template #caption><MkLink url="https://github.com/kokonect-link/cherrypick/graphs/contributors">{{ i18n.ts._aboutMisskey.allContributors }}</MkLink></template>
				</FormSection>
				<FormSection>
					<p style="font-weight: bold; padding-top: 20px"><b>Russkey</b></p>
					<div :class="$style.patronsWithIcon">
						<div v-for="patron in patronsWithIconWithMisskey" :class="$style.patronWithIcon">
							<img :src="patron.icon" :class="$style.patronIcon">
							<span :class="$style.patronName">{{ patron.name }}</span>
						</div>
					</div>
					<p>{{ i18n.ts._aboutMisskey.morePatrons }}</p>
				</FormSection>
			</div>
		</MkSpacer>
	</div>
</MkStickyContainer>
</template>

<script lang="ts" setup>
import { nextTick, onBeforeUnmount, onMounted } from 'vue';
import { version } from '@/config';
import FormLink from '@/components/form/link.vue';
import FormSection from '@/components/form/section.vue';
import MkButton from '@/components/MkButton.vue';
import MkLink from '@/components/MkLink.vue';
import { physics } from '@/scripts/physics';
import { i18n } from '@/i18n';
import { defaultStore } from '@/store';
import * as os from '@/os';
import { definePageMetadata } from '@/scripts/page-metadata';
import { claimAchievement, claimedAchievements } from '@/scripts/achievements';
import { $i } from '@/account';

const patronsWithIconWithMisskey = [{
}];

let thereIsTreasure = $ref($i && !claimedAchievements.includes('foundTreasure'));

let easterEggReady = false;
let easterEggEmojis = $ref([]);
let easterEggEngine = $ref(null);
const containerEl = $shallowRef<HTMLElement>();

const whatIsNewCherryPick = () => {
  window.open(`https://github.com/kokonect-link/cherrypick/blob/develop/CHANGELOG_CHERRYPICK.md#${version.replace(/\./g, '')}`, '_blank');
};

function iconLoaded() {
	const emojis = defaultStore.state.reactions;
	const containerWidth = containerEl.offsetWidth;
	for (let i = 0; i < 32; i++) {
		easterEggEmojis.push({
			id: i.toString(),
			top: -(128 + (Math.random() * 256)),
			left: (Math.random() * containerWidth),
			emoji: emojis[Math.floor(Math.random() * emojis.length)],
		});
	}

	nextTick(() => {
		easterEggReady = true;
	});
}

function gravity() {
	if (!easterEggReady) return;
	easterEggReady = false;
	easterEggEngine = physics(containerEl);
}

function iLoveRusskey() {
	os.post({
		initialText: 'I $[jelly ❤] #Russkey',
		instant: true,
	});
}

function iLoveMisskey() {
	os.post({
		initialText: 'I $[jelly ❤] #Misskey',
		instant: true,
	});
}

function iLoveCherryPick() {
	os.post({
		initialText: 'I $[jelly ❤] #CherryPick',
		instant: true,
	});
}

function getTreasure() {
	thereIsTreasure = false;
	claimAchievement('foundTreasure');
}

onBeforeUnmount(() => {
	if (easterEggEngine) {
		easterEggEngine.stop();
	}
});

const headerActions = $computed(() => []);

const headerTabs = $computed(() => []);

definePageMetadata({
	title: i18n.ts.aboutMisskey,
	icon: null,
});
</script>

<style lang="scss" scoped>
.znqjceqz {
	> .about {
		position: relative;
		border-radius: var(--radius);

		> .treasure {
			position: absolute;
			top: 60px;
			left: 0;
			right: 0;
			margin: 0 auto;
			width: min-content;

			> .treasureImg {
				width: 25px;
				vertical-align: bottom;
			}
		}

		> .container {
			position: relative;
			text-align: center;
			padding: 16px;

			&.playing {
				&, * {
					user-select: none;
				}

				* {
					will-change: transform;
				}

				> .emoji {
					visibility: visible;
				}
			}

			> .icon {
				display: block;
				width: 80px;
				margin: 0 auto;
				border-radius: 16px;
				position: relative;
				z-index: 1;
			}

			> .cherrypick {
				margin: 0.75em auto 0 auto;
				width: max-content;
				position: relative;
				z-index: 1;
			}

			> .version {
				margin: 0 auto;
				width: max-content;
				opacity: 0.5;
				position: relative;
				z-index: 1;

        &:hover {
          text-decoration: underline;
          color: var(--link);
        }
			}

			> .emoji {
				position: absolute;
				z-index: 1;
				top: 0;
				left: 0;
				visibility: hidden;

				> .emoji {
					pointer-events: none;
					font-size: 24px;
					width: 24px;
				}
			}
		}
	}
}
</style>

<style lang="scss" module>
.contributors {
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
	grid-gap: 12px;
}

.contributor {
	display: flex;
	align-items: center;
	padding: 12px;
	background: var(--buttonBg);
	border-radius: 6px;

	&:hover {
		text-decoration: none;
		background: var(--buttonHoverBg);
	}

	&.active {
		color: var(--accent);
		background: var(--buttonHoverBg);
	}
}

.contributorAvatar {
	width: 30px;
	border-radius: 100%;
}

.contributorUsername {
	margin-left: 12px;
}

.contributorClient {
	display: block;
	font-size: 11px;
	font-weight: bold;

	> .cherrypick {
		color: #86b300;
	}

	> .cherry {
		color: var(--cherry);
	}

	> .pick {
		color: var(--pick);
	}
}

.patronsWithIcon {
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
	grid-gap: 12px;
}

.patronWithIcon {
	display: flex;
	align-items: center;
	padding: 12px;
	background: var(--buttonBg);
	border-radius: 6px;
}

.patronIcon {
	width: 24px;
	border-radius: 100%;
}

.patronName {
	margin-left: 12px;
}
</style>
