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
import { Label } from "@/components/ui/label";
import Image from "next/image";
import axios from "axios";

import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";

export function MintDialog({
  drawingUrl,
  prompt,
}: {
  drawingUrl: string;
  prompt: string;
}) {
  const [promptId, setPromptId] = useState("");
  const [enhancedImage, setEnhancedImage] = useState("");
  const [enhancementStarted, setEnhancementStarted] = useState(false);
  const [loadingEnhancedImage, setLoadingEnhancedImage] = useState(false);

  useEffect(() => {
    if (promptId !== "" && enhancedImage === "") {
      getAIImage(promptId, "690204");
      console.log("getting image..");
    }
  }, []);

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
      setEnhancementStarted(true);
    } catch (error) {
      console.error("Error in API call:", error);
    }
  }

  async function getAIImage(promptId: string, modelId: string) {
    try {
      setLoadingEnhancedImage(true);
      setEnhancedImage("");
      const result = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/generate/image/${promptId}`,
        {
          params: { model_id: modelId, prompt_id: promptId },
        }
      );
      console.log("result", result);
      const promptImages = result.data.data.images;

      console.log("prompt Images", promptImages);
      if (result.data.data.images.length > 0) {
        setEnhancedImage(result.data.data.images[0]);
        setLoadingEnhancedImage(false);
        setEnhancementStarted(false);
      }
    } catch (error) {
      console.error(error);
    }
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
        <Input id="name" placeholder="Name your creation" />

        <DialogFooter>
          {!loadingEnhancedImage && (
            <Button type="submit" className="w-full" onClick={generateArt}>
              Enhance and mint
            </Button>
          )}
          {loadingEnhancedImage && (
            <Button type="submit" className="w-full" disabled>
              Enhancing...
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}