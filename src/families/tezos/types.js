// @flow

import type {
  CoreAmount,
  CoreBigInt,
  OperationType,
  Spec
} from "../../libcore/types";

export type TezosOperationTag = *; // FIXME not sure what this is

declare class CoreTezosLikeAddress {
  toBase58(): Promise<string>;
}

declare class CoreTezosLikeTransaction {
  getType(): Promise<TezosOperationTag>;
  getHash(): Promise<string>;
  getFees(): Promise<CoreAmount>;
  getReceiver(): Promise<CoreTezosLikeAddress>;
  getSender(): Promise<CoreTezosLikeAddress>;
  getGasLimit(): Promise<CoreAmount>;
  serialize(): Promise<string>;
  setSignature(string, string, string): Promise<void>;
}

declare class CoreTezosLikeOperation {
  getTransaction(): Promise<CoreTezosLikeTransaction>;
}

declare class CoreTezosLikeTransactionBuilder {
  setType(type: TezosOperationTag): Promise<CoreTezosLikeTransactionBuilder>;
  sendToAddress(
    amount: CoreAmount,
    address: string
  ): Promise<CoreTezosLikeTransactionBuilder>;
  wipeToAddress(address: string): Promise<CoreTezosLikeTransactionBuilder>;
  setFees(fees: CoreAmount): Promise<CoreTezosLikeTransactionBuilder>;
  setGasLimit(gasLimit: CoreAmount): Promise<CoreTezosLikeTransactionBuilder>;
  build(): Promise<CoreTezosLikeTransaction>;
}

declare class CoreTezosLikeAccount {
  broadcastRawTransaction(signed: string): Promise<string>;
  buildTransaction(): Promise<CoreTezosLikeTransactionBuilder>;
  getEstimatedGasLimit(address: string): Promise<CoreBigInt>;
}

export type CoreStatics = {
  TezosLikeOperation: Class<CoreTezosLikeOperation>,
  TezosLikeAddress: Class<CoreTezosLikeAddress>,
  TezosLikeAccount: Class<CoreTezosLikeAccount>,
  TezosLikeTransaction: Class<CoreTezosLikeTransaction>,
  TezosLikeTransactionBuilder: Class<CoreTezosLikeTransactionBuilder>
};

export type {
  CoreTezosLikeOperation,
  CoreTezosLikeAddress,
  CoreTezosLikeAccount,
  CoreTezosLikeTransaction,
  CoreTezosLikeTransactionBuilder
};

export type CoreAccountSpecifics = {
  asTezosLikeAccount(): Promise<CoreTezosLikeAccount>
};

export type CoreOperationSpecifics = {
  asTezosLikeOperation(): Promise<CoreTezosLikeOperation>
};

export type CoreCurrencySpecifics = {};

export const reflect = (declare: (string, Spec) => void) => {
  declare("TezosLikeAddress", {
    methods: {
      toBase58: {}
    }
  });

  declare("TezosLikeTransaction", {
    methods: {
      getType: {},
      getHash: {},
      getFees: { returns: "Amount" },
      getGasLimit: { returns: "Amount" },
      getReceiver: { returns: "TezosLikeAddress" },
      getSender: { returns: "TezosLikeAddress" },
      serialize: { returns: "hex" },
      setSignature: {
        params: ["hex", "hex", "hex"]
      }
    }
  });

  declare("TezosLikeOperation", {
    methods: {
      getTransaction: {
        returns: "TezosLikeTransaction"
      }
    }
  });

  declare("TezosLikeTransactionBuilder", {
    methods: {
      setType: {
        returns: "TezosLikeTransactionBuilder"
      },
      sendToAddress: {
        params: ["Amount"],
        returns: "TezosLikeTransactionBuilder"
      },
      wipeToAddress: {
        returns: "TezosLikeTransactionBuilder"
      },
      setFees: {
        params: ["Amount"],
        returns: "TezosLikeTransactionBuilder"
      },
      setGasLimit: {
        params: ["Amount"],
        returns: "TezosLikeTransactionBuilder"
      },
      build: {
        returns: "TezosLikeTransaction"
      }
    }
  });

  declare("TezosLikeAccount", {
    methods: {
      broadcastRawTransaction: {
        params: ["hex"]
      },
      buildTransaction: {
        returns: "TezosLikeTransactionBuilder"
      },
      getEstimatedGasLimit: {
        returns: "BigInt"
      }
    }
  });
};
