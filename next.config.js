import { withGTConfig } from 'gt-next/config';
 
const nextConfig = {};
 
export default withGTConfig(nextConfig, {
  locales: ['ja', 'en'], // Support for Japanese and English
});