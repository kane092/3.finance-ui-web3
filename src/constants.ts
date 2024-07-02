
export const SMALLEST = 1e18
export const LARGEST = 1000000000000000000000000000000

//URLs
export const CuRVE_FI_SWAP = 'https://curve.fi/#/ethereum/pools/factory-v2-109/swap'
export const CuRVE_FI_SWAP2_76 = 'https://curve.fi/#/ethereum/pools/factory-v2-76/swap'
export const Uni_SWAP = 'https://app.uniswap.org/#/add/v2/0x01597E397605Bf280674Bf292623460b4204C375/eth'

//Testing Contract addresses
export const daiTokenContract = "0xB4d1016627eA006A3487a7FCAadFE4DAB7C7ec58"
export const dgtContract = "0x177934C795bC2D98cFF7BeA0304CF7CF2a1dfF87"
export const factoryContract = "0x0DD9077D2ECE12D1C40fef70844d4D0b7d0AB7f5"
export const TestContract = "0x43b31C470Aca386dA4fc4f80b71CaB0aA6Ef3312"    //deployed to polygon mombai testnet

//Proxy Contract addresses
export const Bent3Fi = "0x8766d216ae6a39eD663b3938202c964c4C0785f0" 
export const bent3ContractAddress = "0x3C1b138eB2C9b527C8F5d69bBCEa7295A118bF2B"
export const bentCVX3Address = "0x9E32c8111b2744e9aD77CC849705b620AAf6a2AA"
export const BentCDPContractAddr = "0xF6c34742099F5b2B9d740044e242F090Feb87C67"
export const ConvexCDPContractAddr = "0x8B5b469AD104e305D8e1aedfb0fa6188f836C77D"

//Main Contract addresses - will use IERC20 ABI
export const BentAddress = "0x01597E397605Bf280674Bf292623460b4204C375" 
export const ConvexAddress = "0x4e3fbd56cd56c3e72c1403e103b45db9da5b9d2b" 
export const bentCVXcdp = "0x9E0441E084F5dB0606565737158aa6Ab6B970fE0"
export const DAIContractAddress = "0x6B175474E89094C44Da98b954EedeAC495271d0F"

//RPCs
export const rpcURL = {
    mumbaiTestnet : 'https://rpc-mumbai.maticvigil.com',
    binance : 'https://data-seed-prebsc-1-s1.binance.org:8545',
    EthTest: 'https://rpc.buildbear.io/straightforward-jango-fett-87226408',
    BBTest: 'https://rpc.buildbear.io/marxist-r2-d2-f6bd0399',
    default: 'https://mainnet.infura.io/v3/571a476709e840489f546ce9b6b5544a'
}
export const selectedRPC = rpcURL.default