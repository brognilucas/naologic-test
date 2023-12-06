import Variant from './Variant';
import Image from './Image';
export default class Product {
  variants: Variant[] = [];

  constructor(
    public id: string,
    public name: string,
    public vendorId: string,
    public description: string,
    public price: number,
  ) {}

  private variantAlreadyExist(variantId: string) {
    return this.variants.some((variant) => variant.id === variantId);
  }

  public addVariant(
    variantId: string,
    description: string,
    packaging: string,
    price: number,
    available: boolean,
    imgUrl?: string,
    imgName?: string,
    itemCode?: string,
  ) {
    if (this.variantAlreadyExist(variantId)) {
      return;
    }

    const images = [];
    if (imgUrl && imgName) {
      images.push(new Image(imgUrl, imgName));
    }

    this.variants.push(
      new Variant(
        variantId,
        description,
        price,
        packaging,
        available,
        images,
        itemCode,
      ),
    );
  }
}
