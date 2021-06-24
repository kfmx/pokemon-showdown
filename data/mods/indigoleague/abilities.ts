export const Abilities: {[k: string]: ModdedAbilityData} = {
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
	}
}