import type { Address } from 'viem'

// Contract addresses per chain
export const CONTRACTS: Record<
  number,
  {
    markets: Address
    lssvmPairFactory: Address
    linearCurve: Address
    exponentialCurve: Address
  }
> = {
  // Lux Mainnet (C-Chain)
  96369: {
    markets: '0x308EBD39eB5E27980944630A0af6F8B0d19e31C6',
    lssvmPairFactory: '0x29E3E018C3C19F7713B2dffa3A3c340fD2c7089E',
    linearCurve: '0x360149cC47A3996522376E4131b4A6eB2A1Ca3D3',
    exponentialCurve: '0x28EBC6764A1c7Ed47b38772E197761102b08f3bb',
  },
  // Zoo Mainnet
  200200: {
    markets: '0x49B76d9ca9BcA9e9eDef5e2EC4eD425b2e6b2445',
    lssvmPairFactory: '0x28EBC6764A1c7Ed47b38772E197761102b08f3bb',
    linearCurve: '0x2BaeF607871FB40515Fb42A299a1E0b03F0C681f',
    exponentialCurve: '0x360149cC47A3996522376E4131b4A6eB2A1Ca3D3',
  },
  // Hanzo Mainnet
  36963: {
    markets: '0x6B7D3c38A3e030B95E101927Ee6ff9913ef626d4',
    lssvmPairFactory: '0x60b2d8E6B5B0FEeE529DcC6c460C44eed7b2E82A',
    linearCurve: '0x719685C371ce4C4720d3D7877CBf9bc867Ac39a6',
    exponentialCurve: '0xB4e242f9417872A843B2D0b92FCf89055349ABb5',
  },
  // SPC Mainnet
  36911: {
    markets: '0x9BC44B0De1aBe2e436C8fA5Cd5cA519026b9D8fD',
    lssvmPairFactory: '0x38E71f39f3f46907E03C48983F6578F9a8c2e72e',
    linearCurve: '0x9607F59f2377Dff9A56D0A76F0313040070c08CD',
    exponentialCurve: '0xdE5280a9306da7829A4Ba1fBf87B58e1bB4F4A53',
  },
  // Pars Mainnet
  494949: {
    markets: '0x3589fd09e7dfF3f7653fc4965B7CE1b8d8fdA9Bd',
    lssvmPairFactory: '0xb43dB9AF0C5CACb99f783E30398Ee0AEe6744212',
    linearCurve: '0xd13AB81F02449B1630ecd940Be5Fb9CD367225B4',
    exponentialCurve: '0xBc92f4e290F8Ad03F5348F81a27fb2Af3B37ec47',
  },
}
