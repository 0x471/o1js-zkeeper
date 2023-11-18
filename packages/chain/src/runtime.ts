import { UInt64 } from "o1js";
import { Balances } from "./balances";
import { Mixer } from './mixer';

export default {
  modules: {
    Balances,
    Mixer,
  },
  config: {
    Balances: {
      totalSupply: UInt64.from(10000),
    },
    Mixer: {}
  },
};
