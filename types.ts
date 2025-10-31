
export type AspectRatio = "1:1" | "4:3" | "16:9" | "9:16" | "3:4";

export interface BannerSize {
  name: string;
  width: number;
  height: number;
  aspectRatio: AspectRatio;
}

export interface GeneratedBanner {
  id: string;
  size: BannerSize;
  imageUrl: string | null;
  status: 'pending' | 'generating' | 'completed' | 'failed';
}
