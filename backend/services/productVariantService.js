export function resolveProductVariant(product, storage, ptaStatus) {
  const variants = product?.variants || [];
  if (variants.length === 0) return null;

  const selectedStorage = storage || variants[0].storage;
  const storageVariants = variants.filter((variant) => variant.storage === selectedStorage);
  if (storageVariants.length === 0) return undefined;

  const selectedStatus = ptaStatus || (
    storageVariants.find((variant) => variant.ptaStatus === 'PTA Approved')?.ptaStatus ||
    storageVariants.find((variant) => variant.ptaStatus === 'Not Applicable')?.ptaStatus ||
    storageVariants[0].ptaStatus
  );

  return storageVariants.find((variant) => variant.ptaStatus === selectedStatus);
}

export function getStartingProductPrice(variants, fallbackPrice) {
  if (!variants?.length) return Number(fallbackPrice);

  const defaultVariants = variants.filter((variant) => variant.ptaStatus !== 'Non-PTA');
  const priceVariants = defaultVariants.length ? defaultVariants : variants;
  return Math.min(...priceVariants.map((variant) => Number(variant.price)));
}
