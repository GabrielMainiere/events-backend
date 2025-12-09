export class Address {
  constructor(
    readonly street: string,
    readonly number: string | undefined,
    readonly city: string,
    readonly state: string,
    readonly zipcode: string,
    readonly country: string,
  ) {
    if (!street.trim()) throw new Error("Street is required");
    if (!city.trim()) throw new Error("City is required");
    if (!zipcode.trim()) throw new Error("Zipcode is required");
  }
}
