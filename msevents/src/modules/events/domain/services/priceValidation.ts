export function validateEventPricing(isFree: boolean, price?: number): void {
  if (isFree && price) {
    throw new Error('A free event cannot have a set price.');
  }
  if (!isFree && (!price || price <= 0)) {
    throw new Error('Paid events must have a price greater than 0');
  }
}