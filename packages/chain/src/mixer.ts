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
  Nullifier,
  Poseidon,
  PublicKey,
  Struct,
  UInt64,
} from "o1js";
import { inject } from "tsyringe";
import { Balances } from "./balances";
import { AppChain  } from "@proto-kit/sdk";

export class MixerPublicOutput extends Struct({
  root: Field,
  nullifier: Field,
  path: Field
}) { }

export const message: Field[] = [Field(1337)];

export let witnessAppchain: AppChain<any, any, any, any>;

export function canWithdraw( 
  witness: MerkleMapWitness,
  nullifier: Nullifier,
): MixerPublicOutput {
  const key = Poseidon.hash([witnessAppchain.runtime.resolve('Mixer').commitments.path].concat(nullifier.getPublicKey().toFields()))
  const [computedRoot, computedKey] = witness.computeRootAndKey(
    Bool(true).toField()
  );
  computedKey.assertEquals(key);
  nullifier.verify(message);
  
  return new MixerPublicOutput({
    root: computedRoot,
    nullifier: nullifier.key(),
    path: witnessAppchain.runtime.resolve('Mixer').commitments.path,
  });
}

export const mixerCircuit = Experimental.ZkProgram({
  publicOutput: MixerPublicOutput,
  methods: {
    canWithdraw: {
      privateInputs: [MerkleMapWitness, Nullifier],
      method: canWithdraw,
    },
  },
});


export class MixerProof extends Experimental.ZkProgram.Proof(mixerCircuit) { }

@runtimeModule()
export class Mixer extends RuntimeModule<unknown> {
  @state() public commitments = StateMap.from<PublicKey, Field>(PublicKey, Field);
  @state() public nullifiers = StateMap.from<Field, Bool>(Field, Bool);
  @state() public blockRootHashes = StateMap.from<Field, Bool>(Field, Bool);

  public constructor(@inject("Balances") public balances: Balances) {
    super();
  }


  @runtimeMethod()
  public deposit(commitment: PublicKey) {
    this.commitments.set(commitment, Field(1337));
    this.blockRootHashes.set(this.network.previous.rootHash, Bool(true));
    this.balances.burn(this.transaction.sender, UInt64.from('1'));
  }

  @runtimeMethod()
  public withdraw(mixerProof: MixerProof) {
    mixerProof.verify();
    const commitment = this.commitments.get(this.transaction.sender);

    assert(
      mixerProof.publicOutput.root.equals(commitment.value),
      "Mixer proof does not contain the correct commitment"
    );

    assert(mixerProof.publicOutput.path.equals(this.commitments.path!))

    const isNullifierUsed = this.nullifiers.get(
      mixerProof.publicOutput.nullifier
    );

    assert(isNullifierUsed.value.not(), "Nullifier has already been used");

    this.nullifiers.set(mixerProof.publicOutput.nullifier, Bool(true));
    this.balances.mint(this.transaction.sender, UInt64.from('1'));
  }
}