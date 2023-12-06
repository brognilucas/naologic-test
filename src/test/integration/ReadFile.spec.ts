import type { FsService } from 'src/infrastructure/fs-service/FSService';
import ReadFile from '../../use-cases/ReadFile';
import FakeFS from '../test-implementation/FakeFS';

describe('ReadFile', () => {
  let fakeFS: FakeFS;
  let readFile: ReadFile;

  beforeEach(() => {
    fakeFS = new FakeFS();
    readFile = new ReadFile(fakeFS as FsService);
    jest.mock('fs', () => fakeFS);
  });

  it('should read and parse a file correctly', async () => {
    const fakeFileContent = `SiteSource	ItemID	ManufacturerID	ManufacturerCode	ManufacturerName	ProductID	ProductName	ProductDescription	ManufacturerItemCode	ItemDescription	ImageFileName	ItemImageURL	NDCItemCode	PKG	UnitPrice	QuantityOnHand	PriceDescription	Availability	PrimaryCategoryID	PrimaryCategoryName	SecondaryCategoryID	SecondaryCategoryName	CategoryID	CategoryName	IsRX	IsTBD
    AIM	10289480	563	10000701	BSN Medical/Jobst	10033525	BSN MEDICAL JOBST� ULTRASHEER COMPRESSION STOCKINGS	Seamless circular knitted for a soft, silky look and comfortable feel. Reciprocated heel and toe for better fit and durability. Maternity styles provide a little "extra" for the mother-to-be. Assorted colors. Available in knee high, thigh high and pantyhose styles.	121529	Compression Stocking, Waist High, 20-30 mmHG, Closed Toe, Suntan, Small			BSN 121529	pr	76.7900	0		14-21 Days	12	Orthopedic & Physical Therapy	115	Soft Goods	742	Compression	N	N
    `;

    fakeFS.setFileContent('fakeFilePath', fakeFileContent);

    const result = await readFile.execute('fakeFilePath');

    expect(result).toEqual([
      {
        SiteSource: '    AIM',
        ItemID: '10289480',
        ManufacturerID: '563',
        ManufacturerCode: '10000701',
        ManufacturerName: 'BSN Medical/Jobst',
        ProductID: '10033525',
        ProductName: 'BSN MEDICAL JOBST� ULTRASHEER COMPRESSION STOCKINGS',
        ProductDescription:
          'Seamless circular knitted for a soft, silky look and comfortable feel. Reciprocated heel and toe for better fit and durability. Maternity styles provide a little "extra" for the mother-to-be. Assorted colors. Available in knee high, thigh high and pantyhose styles.',
        ManufacturerItemCode: '121529',
        ItemDescription:
          'Compression Stocking, Waist High, 20-30 mmHG, Closed Toe, Suntan, Small',
        ImageFileName: '',
        ItemImageURL: '',
        NDCItemCode: 'BSN 121529',
        PKG: 'pr',
        UnitPrice: '76.7900',
        QuantityOnHand: '0',
        PriceDescription: '',
        Availability: '14-21 Days',
        PrimaryCategoryID: '12',
        PrimaryCategoryName: 'Orthopedic & Physical Therapy',
        SecondaryCategoryID: '115',
        SecondaryCategoryName: 'Soft Goods',
        CategoryID: '742',
        CategoryName: 'Compression',
        IsRX: 'N',
        IsTBD: 'N',
      },
    ]);
  });
});
