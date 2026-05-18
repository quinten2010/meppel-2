"use client";

import { EffectComposer, ChromaticAberration, Noise, Vignette } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";

export function PostEffects() {
  return (
    <EffectComposer>
      <ChromaticAberration
        blendFunction={BlendFunction.NORMAL}
        offset={[0.002, 0.002]}
      />
      <Noise
        premultiply
        blendFunction={BlendFunction.SOFT_LIGHT}
        opacity={0.15}
      />
      <Vignette
        eskil={false}
        offset={0.1}
        darkness={0.5}
      />
    </EffectComposer>
  );
}