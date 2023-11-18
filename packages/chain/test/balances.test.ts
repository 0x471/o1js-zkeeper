import { TestingAppChain } from "@proto-kit/sdk";
import { PrivateKey, UInt64 } from "o1js";
import { Balances } from "../src/balances";
import { log } from "@proto-kit/common";

log.setLevel("ERROR");

describe("balances", () => {
  it("should demonstrate how to add balance", async () => {
    const appChain = TestingAppChain.fromRuntime({
      modules: {
        Balances,
      },
      config: {
        Balances: {
          totalSupply: UInt64.from(10000),
        },
      },
    });

    await appChain.start();

    const alicePrivateKey = PrivateKey.random();
    const alice = alicePrivateKey.toPublicKey();

    appChain.setSigner(alicePrivateKey);

    const balances = appChain.runtime.resolve("Balances");

    const tx1 = await appChain.transaction(alice, () => {
      balances.addBalance(alice, UInt64.from(1000));
    });

    await tx1.sign();
    await tx1.send();

    const block = await appChain.produceBlock();

    const balance = await appChain.query.runtime.Balances.balances.get(alice);

    expect(block?.txs[0].status).toBe(true);
    expect(balance?.toBigInt()).toBe(1000n);
  }, 1_000_000);


  it('should demonstrate how to subtract balance', async () => {
    const appChain = TestingAppChain.fromRuntime({
      modules: {
        Balances,
      },
      config: {
        Balances: {
          totalSupply: UInt64.from(10000),
        },
      },
    });

    await appChain.start();

    const alicePrivateKey = PrivateKey.random();
    const alice = alicePrivateKey.toPublicKey();

    appChain.setSigner(alicePrivateKey);

    const balances = appChain.runtime.resolve("Balances");


    const tx1 = await appChain.transaction(alice, () => {
      balances.addBalance(alice, UInt64.from(1000));
    });

    await tx1.sign();
    await tx1.send();

    const block1 = await appChain.produceBlock();

    const balance1 = await appChain.query.runtime.Balances.balances.get(alice);

    expect(block1?.txs[0].status).toBe(true);
    expect(balance1?.toBigInt()).toBe(1000n);

    const tx2 = await appChain.transaction(alice, () => {
      balances.subtractBalance(alice, UInt64.from(1000));
    });

    await tx2.sign();
    await tx2.send();

    const block2 = await appChain.produceBlock();

    const balance2 = await appChain.query.runtime.Balances.balances.get(alice);

    expect(block2?.txs[0].status).toBe(true);
    expect(balance2?.toBigInt()).toBe(1000n);
  }, 1_000_000);
});
