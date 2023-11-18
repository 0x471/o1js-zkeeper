import {
  RuntimeModule,
  runtimeMethod,
  state,
  runtimeModule,
} from "@proto-kit/module";
import { State, StateMap, assert } from "@proto-kit/protocol";
import {
  Bool,
  Experimental,
  Field,
  MerkleMapWitness,
  MerkleTree,
  Nullifier,
  Poseidon,
  Struct,
  UInt64,
} from "o1js";

export class MixerPublicOutput extends Struct({
  root: Field,
  nullifier: Field,
}) {}

export const message: Field[] = [Field(1337)];

export function canWithdraw(
  witness: MerkleMapWitness,
  nullifier: Nullifier
): MixerPublicOutput {
  const key = Poseidon.hash(nullifier.getPublicKey().toFields());
  const [computedRoot, computedKey] = witness.computeRootAndKey(
    Bool(true).toField()
  );
  computedKey.assertEquals(key);

  nullifier.verify(message); 

  return new MixerPublicOutput({
    root: computedRoot,
    nullifier: nullifier.key(),
  });
}

export const mixerCircuit = Experimental.ZkProgram({
  publicOutput: MixerPublicOutput,
  methods: {
    canClaim: {
      privateInputs: [MerkleMapWitness, Nullifier],
      method: canWithdraw,
    },
  },
});


export class MixerProof extends Experimental.ZkProgram.Proof(mixerCircuit) {}

@runtimeModule()
export class Mixer extends RuntimeModule<unknown> {
  @state() public commitment = State.from<Field>(Field);
  @state() public nullifiers = StateMap.from<Field, Bool>(Field, Bool);
  
  // @runtimeMethod()
  // public init() {
  //   const Tree = new MerkleTree(8);
  // }

  @runtimeMethod()
  public setCommitment(commitment: Field) {

    // this.commitment.set(commitment);
  }

  @runtimeMethod()
  public claim(mixerProof: MixerProof) {
    mixerProof.verify();  
    const commitment = this.commitment.get();

    assert(
      mixerProof.publicOutput.root.equals(commitment.value),
      "Mixer proof does not contain the correct commitment"
    );

    const isNullifierUsed = this.nullifiers.get(
      mixerProof.publicOutput.nullifier
    );

    assert(isNullifierUsed.value.not(), "Nullifier has already been used");

    this.nullifiers.set(mixerProof.publicOutput.nullifier, Bool(true));

    this.send({to: this.sender, amount: UInt64.from(0.5)});
  }
}