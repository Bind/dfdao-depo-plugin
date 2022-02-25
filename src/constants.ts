export const DEPO_ADDRESS = "0xd8c00a439ac617f51e1f8fb58fa7f7334be56f63";
export const DEPO_ABI = [
  {
    type: "constructor",
    inputs: [
      {
        internalType: "address",
        name: "core",
        type: "address",
      },
      {
        internalType: "address[]",
        name: "blessed",
        type: "address[]",
      },
    ],
  },
  {
    type: "function",
    name: "captain",
    inputs: [
      {
        internalType: "address",
        name: "pleb",
        type: "address",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "captains",
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "demote",
    inputs: [
      {
        internalType: "address",
        name: "pleb",
        type: "address",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "deposits",
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "dfCore",
    inputs: [],
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "masterAtArms",
    inputs: [
      {
        internalType: "address",
        name: "pleb",
        type: "address",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "mastersAtArms",
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "onERC721Received",
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    outputs: [
      {
        internalType: "bytes4",
        name: "",
        type: "bytes4",
      },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "owner",
    inputs: [],
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "withdrawArtifact",
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "event",
    name: "Demote",
    inputs: [
      {
        name: "demotor",
        type: "address",
        indexed: true,
      },
      {
        name: "demoted",
        type: "address",
        indexed: true,
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "Deposit",
    inputs: [
      {
        name: "depositor",
        type: "address",
        indexed: true,
      },
      {
        name: "tokenId",
        type: "uint256",
        indexed: true,
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "Promote",
    inputs: [
      {
        name: "promotor",
        type: "address",
        indexed: true,
      },
      {
        name: "promoted",
        type: "address",
        indexed: true,
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "Withdrawl",
    inputs: [
      {
        name: "withdrawer",
        type: "address",
        indexed: true,
      },
      {
        name: "tokenId",
        type: "uint256",
        indexed: true,
      },
    ],
    anonymous: false,
  },
];
