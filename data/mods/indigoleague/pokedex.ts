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
	altaria: {
		inherit: true,
		types: ["Dragon", "Fairy"],
		baseStats: {hp: 75, atk: 70, def: 90, spa: 70, spd: 105, spe: 80},
		abilities: {0: "Cloud Nine", 1: "Pixilate", H: "Updraft"}
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