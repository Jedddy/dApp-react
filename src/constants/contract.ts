export const contractAddress = "0x6676A8221F2508ced1c8D89fa621929711A29D19";
export const contractABI = [
    {
        inputs: [],
        stateMutability: "nonpayable",
        type: "constructor",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "id",
                type: "uint256",
            },
        ],
        name: "alreadyUpvoted",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "string",
                name: "content",
                type: "string",
            },
        ],
        name: "createPost",
        outputs: [
            {
                components: [
                    {
                        internalType: "uint256",
                        name: "id",
                        type: "uint256",
                    },
                    {
                        internalType: "address",
                        name: "author",
                        type: "address",
                    },
                    {
                        internalType: "string",
                        name: "content",
                        type: "string",
                    },
                    {
                        internalType: "uint256",
                        name: "upvotes",
                        type: "uint256",
                    },
                    {
                        internalType: "uint256",
                        name: "timestamp",
                        type: "uint256",
                    },
                ],
                internalType: "struct SociGlobe.Post",
                name: "",
                type: "tuple",
            },
        ],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [],
        name: "getPosts",
        outputs: [
            {
                components: [
                    {
                        internalType: "uint256",
                        name: "id",
                        type: "uint256",
                    },
                    {
                        internalType: "address",
                        name: "author",
                        type: "address",
                    },
                    {
                        internalType: "string",
                        name: "content",
                        type: "string",
                    },
                    {
                        internalType: "uint256",
                        name: "upvotes",
                        type: "uint256",
                    },
                    {
                        internalType: "uint256",
                        name: "timestamp",
                        type: "uint256",
                    },
                ],
                internalType: "struct SociGlobe.Post[]",
                name: "",
                type: "tuple[]",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "id",
                type: "uint256",
            },
        ],
        name: "upvote",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
];
