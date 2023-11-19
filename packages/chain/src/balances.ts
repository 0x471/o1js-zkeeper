import {
  RuntimeModule,
  runtimeModule,
  state,
  runtimeMethod,
} from "@proto-kit/module";
import { State, StateMap, assert } from "@proto-kit/protocol";
import { PublicKey, UInt64 } from "o1js";

interface BalancesConfig {
  totalSupply: UInt64;
}


export const errors = {
  underflow: "Cannot subtract, the result would underflow",
  overflow: "Cannot add, the result would overflow",
};

export function safeSub(
  a: UInt64,
  b: UInt64,
  error: string = errors.underflow
) {
  const fieldSub = a.value.sub(b.value);
  const fieldSubTruncated = fieldSub.rangeCheckHelper(UInt64.NUM_BITS);
  const doesNotUnderflow = fieldSubTruncated.equals(fieldSub);

  assert(doesNotUnderflow, error);

  return new UInt64(fieldSubTruncated);
}

export function safeAdd(a: UInt64, b: UInt64, error = errors.overflow) {
  const fieldAdd = a.value.add(b.value);
  const fieldAddTruncated = fieldAdd.rangeCheckHelper(UInt64.NUM_BITS);
  const doesNotOverflow = fieldAddTruncated.equals(fieldAdd);

  assert(doesNotOverflow, error);

  return new UInt64(fieldAddTruncated);
}

@runtimeModule()
export class Balances extends RuntimeModule<BalancesConfig> {
  @state() public balances = StateMap.from<PublicKey, UInt64>(
    PublicKey,
    UInt64
  );


  @runtimeMethod()
  public mint(address: PublicKey, amount: UInt64): void {
    const currentBalance = this.balances.get(address);
    const newBalance = safeAdd(currentBalance.value, amount);
    this.balances.set(address, newBalance);
  }


  @runtimeMethod()
  public burn(address: PublicKey, amount: UInt64): void {
    const currentBalance = this.balances.get(address);
    assert(
      amount.lessThanOrEqual(currentBalance.value),
      "Amount to burn should be lower than the current balance"
    );
    const balanceAfterBurn = safeSub(currentBalance.value, amount);
    this.balances.set(address, balanceAfterBurn);
  }
}