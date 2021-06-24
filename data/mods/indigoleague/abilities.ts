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
	disasterwarning: {
		inherit: true,
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
	}
}