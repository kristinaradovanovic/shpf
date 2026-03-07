const cdnImageURL = `https://${process.env.NEXT_PUBLIC_SANITY_CDN_URL}/images/${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}/${process.env.NEXT_PUBLIC_SANITY_DATASET}`;
const cdnFileURL = `https://${process.env.NEXT_PUBLIC_SANITY_CDN_URL}/files/${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}/${process.env.NEXT_PUBLIC_SANITY_DATASET}`;

export function generateCDNAssetURL(assetRef: any) {
  if (!assetRef) {
    return null;
  }
  const splitAsset = assetRef.split('-');
  if (assetRef.includes('image')) {
    return `${cdnImageURL}/${splitAsset[1]}.${splitAsset[2]}`;
  } else if (assetRef.includes('file')) {
    return `${cdnFileURL}/${splitAsset[1]}.${splitAsset[2]}`;
  }

  return null;
}
