export const Abilities: {[k: string]: ModdedAbilityData} = {
	unnerve: {
		inherit: true,
		onPreStart(pokemon) {
			this.add('-message', pokemon.side.foe.name + '\'s side is too nervous to use consumable items!');
			this.effectState.unnerved = true;
		},
		onStart(pokemon) {
			if (this.effectState.unnerved) return;
			this.add('-message', pokemon.side.foe.name + '\'s side is too nervous to use consumable items!');
			this.effectState.unnerved = true;
		},
		onFoeTryUseItem() {
			return !this.effectState.unnerved;
		}
	},
	//new abilities
	chestpatterns: {
		onStart(pokemon) {
			//pattern is determined by highest IV that is not 31
			const stat = Object.entries(pokemon.set.ivs).filter(m => m[1] < 31).sort((a, b) => b[1] - a[1])[0][0] as StatID;
			let pattern = 'Hunting';
			switch(stat) {
				case 'atk': pattern = 'Intimidating'; break;
				case 'def': pattern = 'Daunting'; break;
				case 'spa': pattern = 'Imposing'; break;
				case 'spd': pattern = 'Terrifying'; break;
				case 'spe': pattern = 'Frightening'; break;
				default: break;
			}

			if (stat !== 'hp') {
				let activated = false;
				for (const target of pokemon.adjacentFoes()) {
					if (!activated) {
						this.add('-ability', pokemon, pattern + " Pattern", 'boost');
						activated = true;
					}
					if (target.volatiles['substitute']) {
						this.add('-immune', target);
					} else {
						let boost: SparseBoostsTable = {};
						boost[stat] = -1;
						this.boost(boost, target, pokemon, null, true);
					}
				}
			} else {
				this.add('-ability', pokemon, pattern + " Pattern", 'boost');
			}
		},
		onModifyPriority(priority, pokemon) {
			if (pokemon.activeMoveActions < 1) {
				const isHunterPattern = Object.entries(pokemon.set.ivs).filter(m => m[1] < 31).sort((a, b) => b[1] - a[1])[0][0] === 'hp';
				if (isHunterPattern) return priority + 1;
			}
		},
		name: "Chest Patterns"
	},
	disasterwarning: {
		onStart(pokemon) {
			for (const target of pokemon.side.foe.active) {
				if (!target || !target.hp) continue;
				if (target.ability) {
					this.add('-message', pokemon.name + ' warns its trainer of ' + target.name + '\'s ability ' + target.getAbility().name + '!');
					this.add('-ability', target, target.getAbility());
				}
			}
		},
		name: "Disaster Warning"
	},
	dollscurse: {
		name: "Doll's Curse"
		//all logic for this ability is in data\mods\indigoleague\rulesets.ts
	},
	imposing: {
		onStart(pokemon) {
			let activated = false;
			for (const target of pokemon.adjacentFoes()) {
				if (!activated) {
					this.add('-ability', pokemon, 'Imposing', 'boost');
					activated = true;
				}
				if (target.volatiles['substitute']) {
					this.add('-immune', target);
				} else {
					this.boost({spa: -1}, target, pokemon, null, true);
				}
			}
		},
		name: "Imposing",
	},
	perfectmemory: {
		//currently has no competitive use, since showdown already shows moves / PP / abilities after usage
		name: "Perfect Memory"
	},
	possession: {
		name: "Possession",
		onDamagingHit(damage, target, source, move) {
			const hasLessThanThirdHp = target.hp < target.maxhp / 3;
			if (hasLessThanThirdHp && target.hp > 0 && !source.m.possessed) {
				source.formeChange(target.species, this.dex.abilities.get('possession'), true);
				source.setAbility(target.ability, target, true);
				this.add('-ability', source, target.getAbility().name);
				source.m.possessed = true;
				source.moveSlots = [];
				for (const moveSlot of target.moveSlots) {
					let moveName = moveSlot.move;
					if (moveSlot.id === 'hiddenpower') {
						moveName = 'Hidden Power ' + source.hpType;
					}
					source.moveSlots.push({
						move: moveName,
						id: moveSlot.id,
						pp: moveSlot.maxpp,
						maxpp: moveSlot.maxpp,
						target: moveSlot.target,
						disabled: false,
						used: false,
						virtual: true,
					});
				}
			}
		}
	},
	skitter: {
		onDamagingHit(damage, target, source, move) {
			if (move.category === 'Physical') {
				this.boost({def: -1, spe: 2}, target, target);
			}
		},
		name: "Skitter"
	}
}