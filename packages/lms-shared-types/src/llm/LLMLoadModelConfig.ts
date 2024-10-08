import { z } from "zod";

/**
 * How much of the model's work should be offloaded to the GPU. The value should be between 0 and 1.
 * A value of 0 means that no layers are offloaded to the GPU, while a value of 1 means that all
 * layers (that can be offloaded) are offloaded to the GPU.
 *
 * @public
 */
export type LLMLlamaAccelerationOffloadRatio = number | "max" | "off";
export const llmLlamaAccelerationOffloadRatioSchema = z.union([
  z.number().min(0).max(1),
  z.literal("max"),
  z.literal("off"),
]);

/**
 * Settings related to offloading work to the GPU.
 *
 * @public
 */
export type LLMLlamaAccelerationSetting = {
  ratio: LLMLlamaAccelerationOffloadRatio;
  mainGpu: number;
  tensorSplit: Array<number>;
};
export const llmLlamaAccelerationSettingSchema = z.object({
  ratio: llmLlamaAccelerationOffloadRatioSchema,
  mainGpu: z.number().int(),
  tensorSplit: z.array(z.number().int()),
});

/** @public */
export interface LLMLoadModelConfig {
  /**
   * How much of the model's work should be offloaded to the GPU. The value should be between 0 and 1.
   * A value of 0 means that no layers are offloaded to the GPU, while a value of 1 means that all
   * layers (that can be offloaded) are offloaded to the GPU.
   *
   * Alternatively, the value can be set to "auto", which means it will be determined automatically.
   * (Currently uses the value in the preset.)
   *
   * @public
   */
  gpuOffload?: LLMLlamaAccelerationSetting;
  /**
   * The size of the context length in number of tokens. This will include both the prompts and the
   * responses. Once the context length is exceeded, the value set in
   * {@link LLMPredictionConfigBase#contextOverflowPolicy} is used to determine the behavior.
   *
   * See {@link LLMContextOverflowPolicy} for more information.
   */
  contextLength?: number;
  ropeFrequencyBase?: number;
  ropeFrequencyScale?: number;
  /**
   * Prompt evaluation batch size.
   */
  evalBatchSize?: number;
  flashAttention?: boolean;
  keepModelInMemory?: boolean;
  seed?: number;
  useFp16ForKVCache?: boolean;
  tryMmap?: boolean;
  numExperts?: number;
}
export const llmLoadModelConfigSchema = z.object({
  gpuOffload: llmLlamaAccelerationSettingSchema.optional(),
  contextLength: z.number().int().min(1).optional(),
  ropeFrequencyBase: z.number().optional(),
  ropeFrequencyScale: z.number().optional(),
  evalBatchSize: z.number().int().min(1).optional(),
  flashAttention: z.boolean().optional(),
  keepModelInMemory: z.boolean().optional(),
  seed: z.number().int().optional(),
  useFp16ForKVCache: z.boolean().optional(),
  tryMmap: z.boolean().optional(),
  numExperts: z.number().int().optional(),
});
