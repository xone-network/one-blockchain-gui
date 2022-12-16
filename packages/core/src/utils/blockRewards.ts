import BigNumber from 'bignumber.js';

const MOJO_PER_ONE = new BigNumber('100000000');
const _REWARD_PER = [
    [10000, 300000],
    [8000, 600000],
    [6000, 900000],
    [4000, 1200000],
    [3000, 1500000],
    [2000, 1800000],
    [1500, 2100000],
    [1000, 2500000],
    [800, 3000000],
    [600, 3500000],
    [400, 4000000],
    [300, 5000000],
    [200, 6000000],
    [100, 8000000],
    [80, 10000000],
    [60, 15000000],
    [40, 20000000],
    [30, 30000000],
    [20, 40000000],
    [15, 60000000],
]
const POOL_REWARD = '0.875'; // 7 / 8
const FARMER_REWARD = '0.125'; // 1 /8
const COMMUNITY_REWARD = '0.03'; // 3 / 100
const TIMELORD_FEE = '0.01'; // 1 / 100

function calculateReward(height: number, index = 0): number {
    if(height >= 60000000) {
      return 10
    } else {
      const [_reward, _height] = _REWARD_PER[index]
      if (height < _height){  return _reward }
      else{ return calculateReward(height, ++index)}
    }
}


export function calculatePoolReward(height: number): BigNumber {
  return MOJO_PER_ONE.times(calculateReward(height)).times(POOL_REWARD);
}

export function calculateBaseFarmerReward(height: number): BigNumber {
  return MOJO_PER_ONE.times(calculateReward(height)).times(FARMER_REWARD);
}

export function calculateCommunityReward(height: number): BigNumber {
  return MOJO_PER_ONE.times(calculateReward(height)).times(COMMUNITY_REWARD);
}

export function calculateTimelordReward(height: number): BigNumber {
  return MOJO_PER_ONE.times(calculateReward(height)).times(TIMELORD_FEE);
}
