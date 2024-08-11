import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import Router from "next/navigation";
import Image from "next/image";
import axios from "axios";

import { useState, useEffect } from "react";
import { createWalletClient, custom, getContract } from "viem";
import { mainnet, holesky } from "viem/chains";
import { ethers } from "ethers";
import { DrawDashAbi } from "@/lib/abi/DrawDashNFTABI";
import { useMinipay } from "../providers/MinipayProvider";
import { useMagicContext } from "../providers/MagicProvider";

export function MintDialog({
  drawingUrl,
  prompt,
  creationData,
}: {
  drawingUrl: string;
  prompt: string;
  creationData: any;
}) {
  const [promptId, setPromptId] = useState("");
  const [enhancedImage, setEnhancedImage] = useState("");
  const [enhancementStarted, setEnhancementStarted] = useState(false);
  const [loadingEnhancedImage, setLoadingEnhancedImage] = useState(false);
  const [minting, setMinting] = useState(false);
  const [isMinted, setIsMinted] = useState(false);
  const [creationName, setCreationName] = useState("");

  const router = Router.useRouter();

  const { minipay } = useMinipay();
  const { web3 } = useMagicContext();

  async function generateArt() {
    setPromptId("");
    setEnhancedImage("");
    console.log("image prompt", prompt);
    try {
      let promptToken = "sks style"; //TODO: replace with this `${tunedModel.modeldata.token} style` || "sks style";
      const textToImageObject = {
        text: `${prompt}`,
        negative_prompt: "ugly ",
        super_resolution: true,
        face_correct: true,
        num_images: 1,
        callback: 0,
        input_image_url: drawingUrl,
        controlnet: "depth",
        denoising_strength: 1,
        controlnet_txt2img: false,
      };

      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/generate/image`,
        {
          textToImageObject,
          modelId: "690204",
        }
      );
      const PromptResponse = res.data;
      console.log("Prompt Response", PromptResponse);
      setPromptId(PromptResponse.id);
      setEnhancedImage("");
      setEnhancementStarted(true);
    } catch (error) {
      console.error("Error in API call:", error);
    }
  }

  useEffect(() => {
    if (enhancementStarted && enhancedImage === "") {
      getEnhancedImage();
    }
  }, [enhancementStarted]);

  async function getEnhancedImage() {
    try {
      setLoadingEnhancedImage(true);
      const result = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/generate/image/${promptId}`,
        {
          params: { model_id: "690204", prompt_id: promptId },
        }
      );
      console.log("result", result);
      const promptImages = result.data.data.images;

      console.log("promptImages", promptImages);
      if (result.data.data.images.length > 0) {
        setEnhancedImage(result.data.data.images[0]);
        updateCreation(result.data.data.images[0]);
        setLoadingEnhancedImage(false);
        setMinting(true);
        await mintArt();
        setMinting(false);
      } else {
        getEnhancedImage();
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function updateCreation(enhancedImage_url: string) {
    const detailsToUpdate = {
      name: creationName,
      enhanced_image: enhancedImage_url,
      minted: true,
    };
    console.log("creationDataOnmint", creationData);
    console.log("detailsToUpdate", detailsToUpdate);
    const res = await axios.put(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/creations/creation`,
      {
        detailsToUpdate,
      },
      { params: { id: creationData?._id } }
    );
    console.log("res", res);
  }

  async function mintArt() {
    const MintAddress = "0x6288541D44Cd7E575711213798dEA5d94417519B";
    const tokenUri = "https://mosaicsnft.com/api/metadata/1";

    if (minipay) {
      // TODO: Fix this... quite buggy
      const walletClient = createWalletClient({
        chain: mainnet,
        transport: custom((window as any).ethereum!),
      });

      const contract = getContract({
        address: MintAddress,
        abi: DrawDashAbi,
        client: {
          wallet: walletClient,
        },
      });

      const [address] = await walletClient.getAddresses();

      const hash = await contract.write.mintNFT([address, tokenUri]);
      console.log("hash", hash);
    } else if (web3) {
      const fromAddress = (await web3.eth.getAccounts())[0];

      const contract = new web3.eth.Contract(DrawDashAbi, MintAddress);

      const receipt = await contract.methods
        .mintNFT(fromAddress, tokenUri)
        .send({
          from: fromAddress,
        });
      console.log("receipt", receipt);
      setIsMinted(true);
    } else {
      throw new Error("No wallet provider found");
    }
    router.push("/creations");
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full">
          Mint creation
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Enhance and mint</DialogTitle>
          <DialogDescription>
            Enhance your creation with AI and mint your sketch
          </DialogDescription>
        </DialogHeader>
        <div className="border p-1 rounded-xl">
          {!enhancedImage && (
            <Image
              src={drawingUrl}
              width={600}
              height={600}
              alt="User's Drawing"
              className=" rounded-xl object-cover w-full aspect-[1]"
            />
          )}
          {enhancedImage && (
            <Image
              src={enhancedImage}
              width={600}
              height={600}
              alt="User's Drawing"
              className=" rounded-xl object-cover w-full aspect-[1]"
            />
          )}
        </div>
        <Input
          id="name"
          placeholder="Name your creation"
          onChange={(event) => {
            setCreationName(event.target.value);
          }}
          value={creationName}
        />

        <DialogFooter>
          <Button
            className="w-full"
            disabled={minting || isMinted || loadingEnhancedImage}
            onClick={generateArt}
          >
            {isMinted
              ? "Already Minted"
              : minting
              ? "Minting..."
              : loadingEnhancedImage
              ? "Enhancing..."
              : "Enhance and mint"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
