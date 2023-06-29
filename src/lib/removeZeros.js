export default function removeZeros(price) {
  console.log("price", price);
  const formattedPrice = price.toFixed(3);
  const trimmedPrice = formattedPrice.replace(/\.?0*$/, "");

  console.log("trimmedPrice", trimmedPrice);
  return trimmedPrice;
}
