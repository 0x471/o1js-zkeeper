import { LocalhostAppChain } from "@proto-kit/cli";
import runtime from "./runtime";

export default LocalhostAppChain.fromRuntime(runtime) as any; // temporary workaround for monorepo ts issues (https://github.com/microsoft/TypeScript/issues/47663#issuecomment-1519138189)
