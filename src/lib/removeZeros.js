export default function removeZeros(price) {
  const formattedPrice = price.toFixed(3);
  const trimmedPrice = formattedPrice.replace(/\.?0*$/, "");

  return trimmedPrice;
}
