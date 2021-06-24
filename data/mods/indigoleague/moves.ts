export const Moves: {[k: string]: ModdedMoveData} = {
	cometpunch: {
		inherit: true,
		accuracy: 100,
		type: "Fairy",
		isNonstandard: null
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
				this.effectState.hitCount = 1;
				this.effectState.spe = 0;
				const curSpe = target.boosts.spe;
				this.boost({spe: 1}, target, target);
				if (curSpe !== target.boosts.spe) this.effectState.spe--;
			},
			onRestart(target) {
				this.effectState.hitCount++;
				if (this.effectState.hitCount < 5) {
					this.effectState.duration = 2;
				}
				const curSpe = target.boosts.spe;
				this.boost({spe: 1}, target, target);
				if (curSpe !== target.boosts.spe) this.effectState.spe--;
			},
			onResidual(target) {
				if (target.lastMove && target.lastMove.id === 'struggle') {
					// don't lock
					delete target.volatiles['iceball'];
				}
			},
			onEnd(target) {
				if (this.effectState.spe) {
					const boosts: SparseBoostsTable = {};
					boosts.spe = this.effectState.spe;
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
	pursuit: {
		inherit: true,
		isNonstandard: null
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
				this.effectState.hitCount = 1;
				this.effectState.spe = 0;
				const curSpe = target.boosts.spe;
				this.boost({spe: 1}, target, target);
				if (curSpe !== target.boosts.spe) this.effectState.spe--;
			},
			onRestart(target) {
				this.effectState.hitCount++;
				if (this.effectState.hitCount < 5) {
					this.effectState.duration = 2;
				}
				const curSpe = target.boosts.spe;
				this.boost({spe: 1}, target, target);
				if (curSpe !== target.boosts.spe) this.effectState.spe--;
			},
			onResidual(target) {
				if (target.lastMove && target.lastMove.id === 'struggle') {
					// don't lock
					delete target.volatiles['rollout'];
				}
			},
			onEnd(target) {
				if (this.effectState.spe) {
					const boosts: SparseBoostsTable = {};
					boosts.spe = this.effectState.spe;
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
				this.effectState.layers = 0;
				this.effectState.def = 0;
				this.effectState.spd = 0;
			},
			onAfterMove(target) {
				if (this.effectState.layers >= 3) return false;
				this.effectState.layers++;
				this.add('-start', target, 'stockpile' + this.effectState.layers);
				const curDef = target.boosts.def;
				const curSpD = target.boosts.spd;
				this.boost({def: 1, spd: 1}, target, target);
				if (curDef !== target.boosts.def) this.effectState.def--;
				if (curSpD !== target.boosts.spd) this.effectState.spd--;
			},
			onEnd(target) {
				if (this.effectState.def || this.effectState.spd) {
					const boosts: SparseBoostsTable = {};
					if (this.effectState.def) boosts.def = this.effectState.def;
					if (this.effectState.spd) boosts.spd = this.effectState.spd;
					this.boost(boosts, target, target);
				}
				this.add('-end', target, 'Stockpile');
				if (this.effectState.def !== this.effectState.layers * -1 || this.effectState.spd !== this.effectState.layers * -1) {
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
	//new moves
	crocbite: {
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
	},
	fireballs: {
		accuracy: 90,
		basePower: 20,
		category: "Special",
		name: "Fireballs",
		pp: 25,
		priority: 0,
		flags: {bullet: 1, defrost: 1, distance: 1, mirror: 1, protect: 1},
		multihit: 4,
		secondary: {
			chance: 10,
			status: 'brn'
		},
		target: "any",
		type: "Fire",
		contestType: "Beauty"
	},
	serenade: {
		accuracy: 100,
		basePower: 0,
		category: "Status",
		name: "Serenade",
		pp: 15,
		priority: 0,
		flags: {authentic: 1, mirror: 1, protect: 1, reflectable: 1, sounds: 1},
		onHit(pokemon) {
			const effect = this.sample([1, 2, 3, 4]);
			switch (effect) {
				case 1:
					if (!pokemon.status && pokemon.runStatusImmunity('slp')){
						pokemon.addVolatile('yawn');
					} else {
						this.add('-message', pokemon.name + ' is already asleep!');
					}
					break;
				case 2: this.boost({'atk': -2}, pokemon); break;
				case 3: this.boost({'spa': -2}, pokemon); break;
				default: this.boost({'atk': -1, 'spa': -1}, pokemon);
			}
		},
		condition: {
			noCopy: true, // doesn't get copied by Baton Pass
			duration: 2,
			onStart(target, source) {
				this.add('-start', target, 'move: Yawn', '[of] ' + source);
			},
			onResidualOrder: 23,
			onEnd(target) {
				this.add('-end', target, 'move: Yawn', '[silent]');
				target.trySetStatus('slp', this.effectState.source);
			},
		},
		target: "normal",
		type: "Normal",
		contestType: "Beauty"
	}
}