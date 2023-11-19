import "reflect-metadata";  
import { TestingAppChain } from "@proto-kit/sdk";
import { PrivateKey, UInt64 } from "o1js";
import { Mixer } from "../src/mixer";
import { Balances } from "../src/balances";
//import { log } from "@proto-kit/common";

//log.setLevel("DEBUG");

describe("mixer", () => {
    it("should demonstrate a deposit operation", async () => {
        const appChain = TestingAppChain.fromRuntime({
            modules: {
                Mixer,
                Balances
            },
            config: {
                Mixer: {
                },
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
        const mixer = appChain.runtime.resolve("Mixer");

        const tx1 = await appChain.transaction(alice, () => {
            balances.mint(alice, UInt64.from(1));
        });

        await tx1.sign();
        await tx1.send();

        const block1 = await appChain.produceBlock();

        const tx2= await appChain.transaction(alice, () => {
            mixer.deposit(alice);
        })

        await tx2.sign();
        await tx2.send();

        const block2 = await appChain.produceBlock();
        
        const appendedCommitment = await appChain.query.runtime.Mixer.commitments.get(alice);
        const balanceAfterDeposit = await appChain.query.runtime.Balances.balances.get(alice);
        
        // const tx3= await appChain.transaction(alice, () => {
        //     mixer.deposit(alice);
        // })

        // await tx3.sign();
        // await tx3.send();


        //const block3 = await appChain.produceBlock();


        expect(block1?.txs[0].status).toBe(true);
        expect(balanceAfterDeposit?.toBigInt()).toBe(1n);
        expect(block2?.txs[0].status).toBe(true);
        expect(appendedCommitment?.toBigInt()).toBe(1337n);
        // TODO: comparison of the latest block root hash 

    }, 1_000_000);

    
});
