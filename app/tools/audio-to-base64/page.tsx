import type { Metadata } from 'next';
import AudioToBase64Client from './client';

export const metadata: Metadata = {
  title: "Audio to Base64 Converter | WebWizKit",
  description: "Convert audio files (MP3, WAV, etc.) to Base64 encoded strings online.",
  keywords: ["audio to base64", "base64 encode audio", "file converter", "developer tools"],
};

const AudioToBase64Page = () => {
  return <AudioToBase64Client />;
};
export default AudioToBase64Page;
