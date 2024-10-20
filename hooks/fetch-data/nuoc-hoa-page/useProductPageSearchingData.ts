import BrandService from "@/services/modules/brand.service";
import CountryService from "@/services/modules/country.service";
import YearService from "@/services/modules/year.service";
import { BrandDto } from "@/types/brand/brand.model";
import { CountryDto } from "@/types/country/country.model";
import { YearDto } from "@/types/year/year.model";
import { useEffect, useState } from "react";

interface ProductPageSearchingInnerProps {
  country: CountryDto[];
  brand: BrandDto[];
  year: YearDto[];
}
export const useProductPageSearchingData = () => {
  const [options, setOptions] = useState<ProductPageSearchingInnerProps>({
    country: [],
    brand: [],
    year: [],
  });

  const fetchData = async () => {
    const countryService = new CountryService();
    const brandService = new BrandService();
    const yearService = new YearService();

    const countryResponse = await countryService.getAllCountry();
    const brandResponse = await brandService.getAllBrand();
    const yearResponse = await yearService.getAllYear();

    setOptions({
      country: countryResponse.data,
      brand: brandResponse.data,
      year: yearResponse.data,
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { options };
};
