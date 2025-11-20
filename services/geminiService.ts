import { GoogleGenAI, Modality } from "@google/genai";
import { GeminiModel } from "../types";

// NOTE: API Key should be in process.env.API_KEY. 
// The actual key injection is handled by the environment/bundler.

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const analyzeImage = async (base64Image: string, prompt: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: GeminiModel.PRO_VISION,
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: 'image/jpeg', 
              data: base64Image,
            },
          },
          { text: prompt },
        ],
      },
    });
    return response.text || "无法分析图片。";
  } catch (error) {
    console.error("Gemini Vision Error:", error);
    return "图片分析服务暂时不可用。";
  }
};

export const searchKnowledge = async (query: string): Promise<{ text: string, sources?: any[] }> => {
  try {
    const response = await ai.models.generateContent({
      model: GeminiModel.FLASH,
      contents: query,
      config: {
        tools: [{ googleSearch: {} }],
      },
    });
    
    const text = response.text || "未找到相关信息。";
    const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
    
    return { text, sources: chunks };
  } catch (error) {
    console.error("Gemini Search Error:", error);
    return { text: "知识库搜索暂时不可用。" };
  }
};

// Helper to decode raw PCM data
function decodePCM(data: Uint8Array, sampleRate: number, ctx: AudioContext): AudioBuffer {
  const pcm16 = new Int16Array(data.buffer);
  const buffer = ctx.createBuffer(1, pcm16.length, sampleRate);
  const channelData = buffer.getChannelData(0);
  for (let i = 0; i < pcm16.length; i++) {
      channelData[i] = pcm16[i] / 32768.0;
  }
  return buffer;
}

export const generateSpeech = async (text: string): Promise<AudioBuffer | null> => {
  try {
    const response = await ai.models.generateContent({
      model: GeminiModel.TTS,
      contents: [{ parts: [{ text }] }],
      config: {
        responseModalities: [Modality.AUDIO],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: 'Aoede' },
          },
        },
      },
    });

    const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
    if (!base64Audio) return null;

    const binaryString = atob(base64Audio);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }

    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)({sampleRate: 24000});
    return decodePCM(bytes, 24000, audioContext);
  } catch (error) {
    console.error("Gemini TTS Error:", error);
    return null;
  }
};
