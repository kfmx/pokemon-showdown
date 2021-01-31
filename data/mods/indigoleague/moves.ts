export const Moves: {[k: string]: ModdedMoveData} = {
	cometpunch: {
		inherit: true,
		accuracy: 100,
		type: "Fairy",
	},
	crushclaw: {
		inherit: true,
		accuracy: 100,
		basePowerCallback(pokemon, target, move) {
			return target.boosts.def > 0 ? move.basePower * 2 : move.basePower;
		},
		secondary: null,
		ignoreDefensive: true,
	},
	disarmingvoice: {
		inherit: true,
		basePower: 60,
		secondary: {
			chance: 100,
			boosts: {
				atk: -1,
			},
		},
	},
	iceball: {
		inherit: true,
		accuracy: 95,
		condition: {
			duration: 2,
			onLockMove: 'iceball',
			onStart(target) {
				this.effectData.hitCount = 1;
				this.effectData.spe = 0;
				const curSpe = target.boosts.spe;
				this.boost({spe: 1}, target, target);
				if (curSpe !== target.boosts.spe) this.effectData.spe--;
			},
			onRestart(target) {
				this.effectData.hitCount++;
				if (this.effectData.hitCount < 5) {
					this.effectData.duration = 2;
				}
				const curSpe = target.boosts.spe;
				this.boost({spe: 1}, target, target);
				if (curSpe !== target.boosts.spe) this.effectData.spe--;
			},
			onResidual(target) {
				if (target.lastMove && target.lastMove.id === 'struggle') {
					// don't lock
					delete target.volatiles['iceball'];
				}
			},
			onEnd(target) {
				if (this.effectData.spe) {
					const boosts: SparseBoostsTable = {};
					boosts.spe = this.effectData.spe;
					this.boost(boosts, target, target);
				}
			}
		},
	},
	meditate: {
		inherit: true,
		boosts: {
			atk: 1,
			spd: 1,
		},
	},
	metalclaw: {
		inherit: true,
		basePower: 75,
	},
	needlearm: {
		inherit: true,
		basePower: 80,
		secondary: {
			chance: 30,
			volatileStatus: 'flinch',
		},
	},
	octazooka: {
		inherit: true,
		basePower: 85
	},
	revenge: {
		inherit: true,
		basePower: 70,
	},
	rollout: {
		inherit: true,
		accuracy: 95,
		condition: {
			duration: 2,
			onLockMove: 'rollout',
			onStart(target) {
				this.effectData.hitCount = 1;
				this.effectData.spe = 0;
				const curSpe = target.boosts.spe;
				this.boost({spe: 1}, target, target);
				if (curSpe !== target.boosts.spe) this.effectData.spe--;
			},
			onRestart(target) {
				this.effectData.hitCount++;
				if (this.effectData.hitCount < 5) {
					this.effectData.duration = 2;
				}
				const curSpe = target.boosts.spe;
				this.boost({spe: 1}, target, target);
				if (curSpe !== target.boosts.spe) this.effectData.spe--;
			},
			onResidual(target) {
				if (target.lastMove && target.lastMove.id === 'struggle') {
					// don't lock
					delete target.volatiles['rollout'];
				}
			},
			onEnd(target) {
				if (this.effectData.spe) {
					const boosts: SparseBoostsTable = {};
					boosts.spe = this.effectData.spe;
					this.boost(boosts, target, target);
				}
			},
		},
	},
	spitup: {
		inherit: true,
		basePowerCallback(pokemon) {
			if (!pokemon.volatiles['stockpile'] || !pokemon.volatiles['stockpile'].layers) return false;
			return pokemon.volatiles['stockpile'].layers * 60;
		},
		type: "Poison",
	},
	stockpile: {
		inherit: true,
		onTry(source) {
			if (source.volatiles['stockpile'] && source.volatiles['stockpile'].layers > 0) return false;
		},
		condition: {
			noCopy: true,
			onStart() {
				this.effectData.layers = 0;
				this.effectData.def = 0;
				this.effectData.spd = 0;
			},
			onAfterMove(target) {
				if (this.effectData.layers >= 3) return false;
				this.effectData.layers++;
				this.add('-start', target, 'stockpile' + this.effectData.layers);
				const curDef = target.boosts.def;
				const curSpD = target.boosts.spd;
				this.boost({def: 1, spd: 1}, target, target);
				if (curDef !== target.boosts.def) this.effectData.def--;
				if (curSpD !== target.boosts.spd) this.effectData.spd--;
			},
			onEnd(target) {
				if (this.effectData.def || this.effectData.spd) {
					const boosts: SparseBoostsTable = {};
					if (this.effectData.def) boosts.def = this.effectData.def;
					if (this.effectData.spd) boosts.spd = this.effectData.spd;
					this.boost(boosts, target, target);
				}
				this.add('-end', target, 'Stockpile');
				if (this.effectData.def !== this.effectData.layers * -1 || this.effectData.spd !== this.effectData.layers * -1) {
					this.hint("In Gen 7, Stockpile keeps track of how many times it successfully altered each stat individually.");
				}
			},
		},
	},
	stealthrock: {
		inherit: true,
		condition: {
			// this is a side condition
			onStart(side) {
				this.add('-sidestart', side, 'move: Stealth Rock');
			},
			onSwitchIn(pokemon) {
				if (pokemon.hasItem('heavydutyboots')) return;
				this.damage(pokemon.maxhp * 0.15);
			},
		},
	},
	tailglow: {
		inherit: true,
		boosts: {
			spa: 2,
			accuracy: 1
		},
	},
	toxicthread: {
		inherit: true,
		status: 'tox',
	},
	watershuriken: {
		inherit: true,
		category: "Physical",
		priority: 0,
	},


	crocbite: {
		inherit: true,
		accuracy: 100,
		basePower: 70,
		category: "Physical",
		name: "Croc-Bite",
		pp: 25,
		priority: 0,
		flags: {bite: 1, contact: 1, protect: 1, mirror: 1},
		target: "normal",
		type: "Water",
		contestType: "Tough",
	}
}