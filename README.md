# DrawDash

**DrawDash** is an on-chain AI-driven art game that challenges players to test their artistic skills against AI-generated images. Players are given a text prompt that generates an AI-created image and are tasked with sketching the described image within 60 seconds. The goal is to create a sketch that closely resembles the AI-generated image, with the score determined by the similarity between the sketch and the generated image, as well as the time taken to complete the sketch.

## Project Description

DrawDash offers a unique blend of creativity and competitive gameplay, allowing players to create and enhance art while having fun. After completing their sketches, players can enhance their drawings using AI ControlNet technology, mint their creations as NFTs, and list them for sale on the integrated marketplace.

For those seeking a competitive edge, the Play-to-Earn mode allows players to deposit funds and earn multipliers based on their performance. Achieving a similarity score above 60% grants them multiplied rewards, while failing to meet the threshold results in a partial loss of their deposit. The game is supported by a vault where users can lock up their funds to pay out winning players, with profits distributed to vault participants.

Behind the scenes, DrawDash leverages advanced technologies like Astria’s Stability Diffusion API for AI-generated images and ChatGPT for generating text prompts. The backend utilizes MongoDB for storing game details off-chain, with Solidity smart contracts deployed on BaseSepolia, Alfajores, and Dango networks via Hardhat. The game also integrates Magic SDK for user onboarding, allowing login via email or web3 wallet, and offers World ID as a sign-in option.

## How It's Made

DrawDash is built using a combination of cutting-edge technologies to deliver an engaging and seamless gaming experience.

- **AI Image Generation**: Astria's Stability Diffusion API generates high-quality images based on text prompts produced by ChatGPT.
- **Blockchain Integration**: Solidity smart contracts manage NFT minting, marketplace transactions, and the Play-to-Earn mechanics. These contracts are deployed on multiple blockchain networks, including BaseSepolia and Alfajores.
- **User Onboarding**: Magic SDK is used for user authentication, allowing players to sign in using an email address or a web3 wallet. Draw Dash is also integrated with Minipay stablecoin wallet allowing users on Opera Mini to easily sign. World ID integration provides an additional secure sign-in option.
- **Backend Infrastructure**: MongoDB is employed to store game data off-chain, ensuring a smooth and responsive gameplay experience.

## Game Mechanics

### Sketching Challenge

Players are given 60 seconds to sketch an image based on a prompt, with their sketch evaluated for similarity against the AI-generated image. The closer the sketch matches the original, the higher the score.

### Play-to-Earn Mode

Players can deposit funds to participate in the Play-to-Earn mode, where their deposit is multiplied if they achieve a similarity score above 60%. If they fall short, they lose a percentage of their deposit. The vault mechanism ensures payouts to winners and rewards participants who provide liquidity to the vault.

### NFT Minting and Marketplace

After sketching, players can enhance their creations using AI and mint them as NFTs. These NFTs can then be listed for sale on the DrawDash marketplace, allowing players to earn from their unique creations.

## Contracts and Deployment

### Alfajores Network

- **DrawDashNFT**: 0x34174CA9BA66cD1449Ca70461F7E000cA450D9F3
- **NFTMarketplace**: 0xdC0e8C3AD0d0f8C12BE78A364909BFA74D980256
- **DrawDashGameVault**: 0xA54051AE922cB47734d1D13E800c061A962C5523
- **DrawDashPlayToEarn**: 0xD2DB4AF0bf26e9bE6E4384AD968BAcCeA8787712

### BaseSepolia Network

- **DrawDashNFT**: 0xa17f9Ea03427d35B2bd4DCB9167492FdF0586978
- **NFTMarketplace**: 0x05253c9Cd18B9e63EB870F4e31874f92b89163f0
- **DrawDashGameVault**: 0x261A2Fef773DF2F4909eCA15309915B0903a2c31
- **DrawDashPlayToEarn**: 0xd14735436518c564795877Ec521B35B772566eAe

## Running DrawDash Locally

1. **Install the required packages:**

   ```bash
   npm install
   ```

2. **Set up environment variables:**
   Create a `.env.local` file and configure it according to the provided `env.example`.

3. **Start the development server:**

   ```bash
   npm run dev
   ```

4. Open `http://localhost:3000` in your browser to play DrawDash locally.

## License

MIT
