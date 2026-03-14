/**
 * Ana sayfada kullanılan görseller için build'te üretilen -opt sürümlerini kullanır.
 * Böylece "image larger than it needs to be" uyarısı ve indirilen boyut azalır.
 */
export function getOptimizedImagePath(imagePath: string): string {
  if (!imagePath || typeof imagePath !== 'string') return imagePath;
  return imagePath.replace(/(\.(jpg|jpeg|png|JPG|JPEG|PNG))$/i, '-opt$1');
}
