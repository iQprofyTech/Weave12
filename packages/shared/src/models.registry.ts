export type Modality = "text" | "image" | "video" | "audio";
export type Provider =
  | "openai" | "anthropic" | "google" | "bfl" | "stability" | "minimax" | "custom";

export type ModelId =
  // text
  | "gpt-4o" | "gpt-4o-mini" | "claude-3.5-sonnet" | "claude-3.5-haiku"
  // image
  | "imagen-4-ultra" | "imagen-4" | "imagen-4-fast"
  | "sdxl" | "sdxl-turbo" | "stable-cascade"
  | "flux-1-schnell" | "flux-1-dev"
  | "pattern-diffusion"
  // video
  | "veo-sora" | "minimax-video" | "stable-video-diffusion"
  // audio
  | "mars7" | "openai-tts" | "stable-audio";

export interface ModelMeta {
  id: ModelId;
  name: string;
  modality: Modality;
  provider: Provider;
  tags?: string[];            // например: ["fast","ultra","photoreal"]
  paid?: boolean;             // платная ли
  params?: Record<string, any>; // подсказки по параметрам (напр., макс. размер)
}

// Единый список
export const MODELS: ModelMeta[] = [
  // text
  { id:"gpt-4o", name:"GPT-4o", modality:"text", provider:"openai"},
  { id:"gpt-4o-mini", name:"GPT-4o Mini", modality:"text", provider:"openai"},
  { id:"claude-3.5-sonnet", name:"Claude 3.5 Sonnet", modality:"text", provider:"anthropic"},
  { id:"claude-3.5-haiku", name:"Claude 3.5 Haiku", modality:"text", provider:"anthropic"},

  // image
  { id:"imagen-4-ultra", name:"Imagen 4 Ultra", modality:"image", provider:"google", tags:["ultra"]},
  { id:"imagen-4", name:"Imagen 4", modality:"image", provider:"google"},
  { id:"imagen-4-fast", name:"Imagen 4 Fast", modality:"image", provider:"google", tags:["fast"]},
  { id:"sdxl", name:"Stable Diffusion XL", modality:"image", provider:"stability"},
  { id:"sdxl-turbo", name:"SDXL Turbo", modality:"image", provider:"stability", tags:["fast"]},
  { id:"stable-cascade", name:"Stable Cascade", modality:"image", provider:"stability"},
  { id:"flux-1-schnell", name:"Flux 1 Schnell", modality:"image", provider:"bfl", tags:["fast"]},
  { id:"flux-1-dev", name:"Flux 1 Dev", modality:"image", provider:"bfl"},
  { id:"pattern-diffusion", name:"Pattern Diffusion", modality:"image", provider:"custom", tags:["patterns"]},

  // video
  { id:"veo-sora", name:"Google Veo (Sora)", modality:"video", provider:"google"},
  { id:"minimax-video", name:"MiniMax Video", modality:"video", provider:"minimax"},
  { id:"stable-video-diffusion", name:"Stable Video Diffusion", modality:"video", provider:"stability"},

  // audio
  { id:"mars7", name:"MARS7 TTS", modality:"audio", provider:"custom"},
  { id:"openai-tts", name:"OpenAI TTS", modality:"audio", provider:"openai"},
  { id:"stable-audio", name:"Stable Audio", modality:"audio", provider:"stability"},
];

// Утилиты фильтрации
export function filterModels(opts: {
  modality?: Modality;
  include?: ModelId[];
  exclude?: ModelId[];
  providers?: Provider[];
  tagsAny?: string[]; // хотя бы один тег
} = {}) {
  const { modality, include, exclude, providers, tagsAny } = opts;
  return MODELS.filter(m => {
    if (modality && m.modality !== modality) return false;
    if (include && !include.includes(m.id)) return false;
    if (exclude && exclude.includes(m.id)) return false;
    if (providers && !providers.includes(m.provider)) return false;
    if (tagsAny && tagsAny.length && !tagsAny.some(t => m.tags?.includes(t))) return false;
    return true;
  });
}
