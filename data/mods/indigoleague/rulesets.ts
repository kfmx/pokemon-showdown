export const Rulesets: {[k: string]: ModdedFormatData} = {
	teampreview: {
		inherit: true,
		onTeamPreview() {
			this.add('-message', 'Welcome to the Indigo League mod! More information can be found on www.poggerswebsite.se');
			this.add('clearpoke');
			for (const pokemon of this.getAllPokemon()) {
				const details = pokemon.details.replace(', shiny', '')
					.replace(/(Arceus|Gourgeist|Pumpkaboo|Xerneas|Silvally|Zacian|Zamazenta|Urshifu)(-[a-zA-Z?-]+)?/g, '$1-*');
				this.add('poke', pokemon.side.id, details, '');
			}
			this.makeRequest('teampreview');

			this.getAllPokemon().forEach((p, i) => {
				if (p.ability === 'dollscurse') {
					const pCopy = p.side.pokemon.slice();
					pCopy.splice(i-1, 1);	//remove pokemon with Doll's Curse ability
					let poke1 = this.prng.sample(pCopy);
					poke1.m.dollsCurse = {pokemon: p, originalMove: {...poke1.moveSlots[0]}};
					pCopy.splice(pCopy.indexOf(poke1), 1); //remove randomized pokemon
					let poke2 = this.prng.sample(pCopy);
					poke2.m.dollsCurse = {pokemon: p, originalMove: {...poke2.moveSlots[0]}};
				}
			});
		},
		onBeforeSwitchIn(pokemon) {
			if (!!pokemon.m.dollsCurse) {
				pokemon.illusion = pokemon.m.dollsCurse.pokemon;
				if (pokemon.previouslySwitchedIn < 1) {
					pokemon.moveSlots[0].id = 'shadowsneak' as ID;
					pokemon.moveSlots[0].move = 'Shadow Sneak';
					pokemon.moveSlots[0].maxpp = 48;
					pokemon.moveSlots[0].pp = 48;
				}
			}
		},
		onDamagingHit(damage, target, source, move) {
			target.illusion && this.singleEvent('End', this.dex.abilities.get('Illusion'), target.abilityState, target, source, move);
			if (target.m.dollsCurse) {
				target.moveSlots[0] = target.m.dollsCurse.originalMove;
				target.m.dollsCurse = undefined;
			}
		},
		onFaint(pokemon) {
			pokemon.illusion = null;
			if (pokemon.m.dollsCurse) {
				pokemon.moveSlots[0] = pokemon.m.dollsCurse.originalMove;
				pokemon.m.dollsCurse = undefined;
			}
		}
	}
}