import Image from './Image';
export default class Variant {
  constructor(
    public id: string,
    public description: string,
    public price: number,
    public packaging: string,
    public available: boolean,
    public images?: Image[],
    public itemCode?: string,
  ) {}
}
