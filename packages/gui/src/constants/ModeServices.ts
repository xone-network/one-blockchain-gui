import { ServiceName } from '@xone-network/api';
import { Mode } from '@xone-network/core';

export default {
  [Mode.WALLET]: [ServiceName.WALLET],
  [Mode.FARMING]: [ServiceName.WALLET, ServiceName.FULL_NODE, ServiceName.FARMER, ServiceName.HARVESTER],
};

export const SimulatorServices = [ServiceName.WALLET, ServiceName.SIMULATOR];
