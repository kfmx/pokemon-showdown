export const Moves: {[k: string]: ModdedMoveData} = {
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
					if (this.effectData.spe) boosts.spe = this.effectData.spe;
					this.boost(boosts, target, target);
				}
			}
		},
	}
}