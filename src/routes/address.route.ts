import { Router } from "express";
import AddressController from "../controllers/address.controller";
import AuthenticateMiddleware from "../middleware/authenticate.middleware";

class Address extends AuthenticateMiddleware {
  public router: Router;
  private addressController: AddressController;

  constructor() {
    super();
    this.router = Router();
    this.addressController = new AddressController();
    this.createAddressRoute();
    this.updateAddressRoute();
    this.getMyAddressesRoute();
    this.getAddressRoute();
    this.deleteAddressRoute();
  }

  // create address
  private createAddressRoute(): void {
    this.router.post(
      "/address/",
      super.isAuthenticated,
      this.addressController.validateCreateAddressFields,
      this.addressController.createAddress
    );
  }

  // update address
  private updateAddressRoute(): void {
    this.router.put(
      "/address/:addressId",
      super.isAuthenticated,
      this.addressController.validateUpdateAddressFields,
      this.addressController.updateAddress
    );
  }
  // get my addresses
  private getMyAddressesRoute(): void {
    this.router.get(
      "/address/all/my-addresses",
      super.isAuthenticated,
      this.addressController.getMyAddresses
    );
  }
  // get address
  private getAddressRoute(): void {
    this.router.get(
      "/address/:addressId",
      super.isAuthenticated,
      this.addressController.getAddress
    );
  }

  // delete address
  private deleteAddressRoute(): void {
    this.router.delete(
      "/address/:addressId",
      super.isAuthenticated,
      this.addressController.deleteAddress
    );
  }
}

export default Address;
