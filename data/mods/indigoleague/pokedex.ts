export const Pokedex: {[k: string]: ModdedSpeciesData} = {
	feraligatr: {
		inherit: true,
		baseStats: {hp: 75, atk: 105, def: 95, spa: 70, spd: 80, spe: 70},
		abilities: {0: "Strong Jaw", 1: "Swift Swim", H: "Sheer Force"},
	},
	hitmonchan: {
		inherit: true,
		types: ["Fighting", "Fairy"],
		baseStats: {hp: 60, atk: 100, def: 80, spa: 35, spd: 110, spe: 75},
		abilities: {0: "Iron Fist", 1: "Moxie", H: "Quick Feet"}
	}
}