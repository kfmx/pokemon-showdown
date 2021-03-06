export const Pokedex: {[k: string]: ModdedSpeciesData} = {
	absol: {
		inherit: true,
		baseStats: {hp: 80, atk: 75, def: 70, spa: 110, spd: 70, spe: 95},
		abilities: {0: "Pressure", 1: "Justified", H: "Disaster Warning"}
	},
	aerodactyl: {
		inherit: true,
		baseStats: {hp: 80, atk: 100, def: 90, spa: 60, spd: 70, spe: 110},
		abilities: {0: "Unnerve", 1: "Hustle", H: "Imposing"}
	},
	aggron: {
		inherit: true,
		types: ["Steel"],
		baseStats: {hp: 90, atk: 100, def: 110, spa: 80, spd: 60, spe: 50},
		abilities: {0: "Filter", 1: "Stamina", H: "Rock Head"}
	},
	alakazam: {
		inherit: true,
		baseStats: {hp: 60, atk: 50, def: 45, spa: 120, spd: 85, spe: 115},
		abilities: {0: "Trace", 1: "Magic Guard", H: "Perfect Memory"}
	},
	altaria: {
		inherit: true,
		types: ["Dragon", "Fairy"],
		baseStats: {hp: 75, atk: 70, def: 90, spa: 70, spd: 105, spe: 80},
		abilities: {0: "Cloud Nine", 1: "Pixilate", H: "Updraft"}
	},
	ampharos: {
		inherit: true,
		types: ["Electric", "Dragon"],
		baseStats: {hp: 90, atk: 70, def: 75, spa: 110, spd: 90, spe: 55},
		abilities: {0: "Static", 1: "Dazzling", H: "Wonder Skin"}
	},
	arbok: {
		inherit: true,
		types: ["Poison", "Dark"],
		baseStats: {hp: 80, atk: 99, def: 80, spa: 60, spd: 80, spe: 86},
		abilities: {0: "Chest Patterns"}
	},
	arcanine: {
		inherit: true,
		baseStats: {hp: 90, atk: 85, def: 70, spa: 95, spd: 80, spe: 95},
		abilities: {0: "Flash Fire", 1: "Intimidate", H: "Solar Power"}
	},
	ariados: {
		inherit: true,
		baseStats: {hp: 70, atk: 90, def: 75, spa: 60, spd: 75, spe: 90},
		abilities: {0: "Arena Trap", 1: "Skitter", H: "Merciless"}
	},
	armaldo: {
		inherit: true,
		baseStats: {hp:	 75, atk: 100, def: 95, spa: 70, spd: 80, spe: 60},
		abilities: {0: "Swift Swim", 1: "Own Tempo", H: "Merciless"}
	},
	banette: {
		inherit: true,
		baseStats: {hp: 65, atk: 110, def: 65, spa: 85, spd: 65, spe: 65},
		abilities: {0: "Innards Out", 1:"Doll's Curse", H: "Possession"}
	},
	beedrill: {
		inherit: true,
		baseStats: {hp: 65, atk: 115, def: 50, spa: 40, spd: 70, spe: 110},
		abilities: {0: "Swarm", 1: "Sniper", H: "Stinger"}
	},
	bellossom: {
		inherit: true,
		types: ["Grass", "Fairy"],
		baseStats: {hp: 70, atk: 80, def: 90, spa: 90, spd: 100, spe: 70},
		abilities: {0: "Chlorophyll", 1: "Dancer", H: "Cute Charm"}
	},
	feraligatr: {
		inherit: true,
		baseStats: {hp: 75, atk: 105, def: 95, spa: 70, spd: 80, spe: 70},
		abilities: {0: "Strong Jaw", 1: "Swift Swim", H: "Sheer Force"}
	},
	hitmonchan: {
		inherit: true,
		types: ["Fighting", "Fairy"],
		baseStats: {hp: 60, atk: 100, def: 80, spa: 35, spd: 110, spe: 75},
		abilities: {0: "Iron Fist", 1: "Moxie", H: "Quick Feet"}
	}
}