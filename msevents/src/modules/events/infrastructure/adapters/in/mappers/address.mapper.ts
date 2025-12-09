import { Address } from "src/modules/events/domain/value-objects/address.entity";
import { AddressModel } from "../models/address-graphql-model";

export class AddressMapper {
  static toGraphModel(address: Address): AddressModel {
    return {
      street: address.street,
      number: address.number,
      city: address.city,
      state: address.state,
      zipcode: address.zipcode,
      country: address.country,
    };
  }
}
