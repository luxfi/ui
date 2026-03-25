// Market.sol ABI (Seaport-based)
export const MARKET_ABI = [
  {
    name: 'list',
    type: 'function',
    stateMutability: 'nonpayable',
    inputs: [
      { name: 'nftContract', type: 'address' },
      { name: 'tokenId', type: 'uint256' },
      { name: 'paymentToken', type: 'address' },
      { name: 'price', type: 'uint256' },
      { name: 'duration', type: 'uint256' },
    ],
    outputs: [{ name: 'listingId', type: 'bytes32' }],
  },
  {
    name: 'cancelListing',
    type: 'function',
    stateMutability: 'nonpayable',
    inputs: [{ name: 'listingId', type: 'bytes32' }],
    outputs: [],
  },
  {
    name: 'buy',
    type: 'function',
    stateMutability: 'payable',
    inputs: [{ name: 'listingId', type: 'bytes32' }],
    outputs: [],
  },
  {
    name: 'makeOffer',
    type: 'function',
    stateMutability: 'payable',
    inputs: [
      { name: 'nftContract', type: 'address' },
      { name: 'tokenId', type: 'uint256' },
      { name: 'paymentToken', type: 'address' },
      { name: 'amount', type: 'uint256' },
      { name: 'duration', type: 'uint256' },
    ],
    outputs: [{ name: 'offerId', type: 'bytes32' }],
  },
  {
    name: 'cancelOffer',
    type: 'function',
    stateMutability: 'nonpayable',
    inputs: [{ name: 'offerId', type: 'bytes32' }],
    outputs: [],
  },
  {
    name: 'acceptOffer',
    type: 'function',
    stateMutability: 'nonpayable',
    inputs: [{ name: 'offerId', type: 'bytes32' }],
    outputs: [],
  },
  {
    name: 'getListing',
    type: 'function',
    stateMutability: 'view',
    inputs: [{ name: 'listingId', type: 'bytes32' }],
    outputs: [
      { name: 'seller', type: 'address' },
      { name: 'nftContract', type: 'address' },
      { name: 'tokenId', type: 'uint256' },
      { name: 'paymentToken', type: 'address' },
      { name: 'price', type: 'uint256' },
      { name: 'expiry', type: 'uint256' },
      { name: 'active', type: 'bool' },
    ],
  },
  {
    name: 'Listing',
    type: 'event',
    inputs: [
      { name: 'listingId', type: 'bytes32', indexed: true },
      { name: 'seller', type: 'address', indexed: true },
      { name: 'nftContract', type: 'address', indexed: false },
      { name: 'tokenId', type: 'uint256', indexed: false },
      { name: 'price', type: 'uint256', indexed: false },
    ],
  },
  {
    name: 'Sale',
    type: 'event',
    inputs: [
      { name: 'listingId', type: 'bytes32', indexed: true },
      { name: 'buyer', type: 'address', indexed: true },
      { name: 'price', type: 'uint256', indexed: false },
    ],
  },
  {
    name: 'OfferMade',
    type: 'event',
    inputs: [
      { name: 'offerId', type: 'bytes32', indexed: true },
      { name: 'buyer', type: 'address', indexed: true },
      { name: 'nftContract', type: 'address', indexed: false },
      { name: 'tokenId', type: 'uint256', indexed: false },
      { name: 'amount', type: 'uint256', indexed: false },
    ],
  },
] as const

// ERC721 ABI (minimal for NFT queries)
export const ERC721_ABI = [
  {
    name: 'name',
    type: 'function',
    stateMutability: 'view',
    inputs: [],
    outputs: [{ type: 'string' }],
  },
  {
    name: 'symbol',
    type: 'function',
    stateMutability: 'view',
    inputs: [],
    outputs: [{ type: 'string' }],
  },
  {
    name: 'tokenURI',
    type: 'function',
    stateMutability: 'view',
    inputs: [{ name: 'tokenId', type: 'uint256' }],
    outputs: [{ type: 'string' }],
  },
  {
    name: 'ownerOf',
    type: 'function',
    stateMutability: 'view',
    inputs: [{ name: 'tokenId', type: 'uint256' }],
    outputs: [{ type: 'address' }],
  },
  {
    name: 'balanceOf',
    type: 'function',
    stateMutability: 'view',
    inputs: [{ name: 'owner', type: 'address' }],
    outputs: [{ type: 'uint256' }],
  },
  {
    name: 'approve',
    type: 'function',
    stateMutability: 'nonpayable',
    inputs: [
      { name: 'to', type: 'address' },
      { name: 'tokenId', type: 'uint256' },
    ],
    outputs: [],
  },
  {
    name: 'setApprovalForAll',
    type: 'function',
    stateMutability: 'nonpayable',
    inputs: [
      { name: 'operator', type: 'address' },
      { name: 'approved', type: 'bool' },
    ],
    outputs: [],
  },
  {
    name: 'isApprovedForAll',
    type: 'function',
    stateMutability: 'view',
    inputs: [
      { name: 'owner', type: 'address' },
      { name: 'operator', type: 'address' },
    ],
    outputs: [{ type: 'bool' }],
  },
  {
    name: 'totalSupply',
    type: 'function',
    stateMutability: 'view',
    inputs: [],
    outputs: [{ type: 'uint256' }],
  },
  {
    name: 'Transfer',
    type: 'event',
    inputs: [
      { name: 'from', type: 'address', indexed: true },
      { name: 'to', type: 'address', indexed: true },
      { name: 'tokenId', type: 'uint256', indexed: true },
    ],
  },
] as const

// ERC1155 minimal ABI
export const ERC1155_ABI = [
  {
    name: 'balanceOf',
    type: 'function',
    stateMutability: 'view',
    inputs: [
      { name: 'account', type: 'address' },
      { name: 'id', type: 'uint256' },
    ],
    outputs: [{ type: 'uint256' }],
  },
  {
    name: 'uri',
    type: 'function',
    stateMutability: 'view',
    inputs: [{ name: 'id', type: 'uint256' }],
    outputs: [{ type: 'string' }],
  },
  {
    name: 'setApprovalForAll',
    type: 'function',
    stateMutability: 'nonpayable',
    inputs: [
      { name: 'operator', type: 'address' },
      { name: 'approved', type: 'bool' },
    ],
    outputs: [],
  },
  {
    name: 'isApprovedForAll',
    type: 'function',
    stateMutability: 'view',
    inputs: [
      { name: 'owner', type: 'address' },
      { name: 'operator', type: 'address' },
    ],
    outputs: [{ type: 'bool' }],
  },
] as const

// LSSVM Pair ABI (sudoswap AMM for NFTs)
export const LSSVM_PAIR_ABI = [
  {
    name: 'swapTokenForSpecificNFTs',
    type: 'function',
    stateMutability: 'payable',
    inputs: [
      { name: 'nftIds', type: 'uint256[]' },
      { name: 'maxExpectedTokenInput', type: 'uint256' },
      { name: 'nftRecipient', type: 'address' },
      { name: 'isRouter', type: 'bool' },
      { name: 'routerCaller', type: 'address' },
    ],
    outputs: [{ name: 'inputAmount', type: 'uint256' }],
  },
  {
    name: 'swapNFTsForToken',
    type: 'function',
    stateMutability: 'nonpayable',
    inputs: [
      { name: 'nftIds', type: 'uint256[]' },
      { name: 'minExpectedTokenOutput', type: 'uint256' },
      { name: 'tokenRecipient', type: 'address' },
      { name: 'isRouter', type: 'bool' },
      { name: 'routerCaller', type: 'address' },
    ],
    outputs: [{ name: 'outputAmount', type: 'uint256' }],
  },
  {
    name: 'getBuyNFTQuote',
    type: 'function',
    stateMutability: 'view',
    inputs: [
      { name: 'assetId', type: 'uint256' },
      { name: 'numNFTs', type: 'uint256' },
    ],
    outputs: [
      { name: 'error', type: 'uint8' },
      { name: 'newSpotPrice', type: 'uint256' },
      { name: 'newDelta', type: 'uint256' },
      { name: 'inputAmount', type: 'uint256' },
      { name: 'protocolFee', type: 'uint256' },
      { name: 'royaltyAmount', type: 'uint256' },
    ],
  },
  {
    name: 'getSellNFTQuote',
    type: 'function',
    stateMutability: 'view',
    inputs: [
      { name: 'assetId', type: 'uint256' },
      { name: 'numNFTs', type: 'uint256' },
    ],
    outputs: [
      { name: 'error', type: 'uint8' },
      { name: 'newSpotPrice', type: 'uint256' },
      { name: 'newDelta', type: 'uint256' },
      { name: 'outputAmount', type: 'uint256' },
      { name: 'protocolFee', type: 'uint256' },
      { name: 'royaltyAmount', type: 'uint256' },
    ],
  },
  {
    name: 'spotPrice',
    type: 'function',
    stateMutability: 'view',
    inputs: [],
    outputs: [{ type: 'uint128' }],
  },
  {
    name: 'nft',
    type: 'function',
    stateMutability: 'view',
    inputs: [],
    outputs: [{ type: 'address' }],
  },
] as const
