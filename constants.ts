
import { BannerSize } from './types';

export const STANDARD_BANNER_SIZES: BannerSize[] = [
  { name: 'Medium Rectangle', width: 300, height: 250, aspectRatio: '4:3' },
  { name: 'Leaderboard', width: 728, height: 90, aspectRatio: '16:9' },
  { name: 'Wide Skyscraper', width: 160, height: 600, aspectRatio: '9:16' },
  { name: 'Square', width: 250, height: 250, aspectRatio: '1:1' },
  { name: 'Large Rectangle', width: 336, height: 280, aspectRatio: '4:3' },
  { name: 'Mobile Banner', width: 320, height: 50, aspectRatio: '16:9' },
  { name: 'Half Page', width: 300, height: 600, aspectRatio: '9:16' },
  { name: 'Portrait', width: 300, height: 1050, aspectRatio: '3:4' },
];
