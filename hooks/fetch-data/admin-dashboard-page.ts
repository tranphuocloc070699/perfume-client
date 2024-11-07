import YearService from "@/services/modules/year.service";
import { YearDto } from "@/types/year/year.model";
import { useEffect, useState } from "react";
import { useToast } from "../use-toast";
import { BrandDto } from "@/types/brand/brand.model";
import BrandService from "@/services/modules/brand.service";
import { CountryDto } from "@/types/country/country.model";
import CountryService from "@/services/modules/country.service";
import ProductNoteService from "@/services/modules/product-note.service";
import { ProductNoteDto } from "@/types/product-note/product-note.model";

export const useAdminDashboardPageData = () => {
  const { toast } = useToast();

  const [years, setYears] = useState<YearDto[]>([]);
  const [brands, setBrands] = useState<BrandDto[]>([]);
  const [countries, setCountries] = useState<CountryDto[]>([]);
  const [notes, setNotes] = useState<ProductNoteDto[]>([]);

  useEffect(() => {
    fetchYears();
    fetchBrands();
    fetchCountries();
    fetchNotes();
  }, []);

  const addYear = (year: YearDto) => {
    setYears([year, ...years]);
  };

  const addBrand = (brand: BrandDto) => {
    setBrands([brand, ...brands]);
  };

  const addCountry = (country: CountryDto) => {
    setCountries([country, ...countries]);
  };

  const addNote = (note: ProductNoteDto) => {
    setNotes([note, ...notes]);
  };

  const fetchNotes = () => {
    const noteService = new ProductNoteService();
    noteService.getAllProductNote().then((response) => {
      if (response.data.length > 0) {
        setNotes(response.data);
      }
    }).catch((err) => {
      console.error("fetch year error", err);
      toast({
        content: "Fetch year data error"
      });
    });
  };

  const fetchCountries = () => {
    const countryService = new CountryService();
    countryService.getAllCountry().then((response) => {
      if (response.data.length > 0) {
        setCountries(response.data);
      }
    }).catch((err) => {
      console.error("fetch year error", err);
      toast({
        content: "Fetch year data error"
      });
    });
  };


  const fetchBrands = () => {
    const brandService = new BrandService();
    brandService
      .getAllBrand()
      .then((response) => {
        if (response.data.length > 0) {
          setBrands(response.data);
        }
      })
      .catch((err) => {
        console.error("fetch year error", err);
        toast({
          content: "Fetch year data error"
        });
      });
  };

  const fetchYears = () => {
    const yearService = new YearService();
    yearService
      .getAllYear()
      .then((response) => {
        if (response.data.length > 0) {
          setYears(response.data);
        }
      })
      .catch((err) => {
        console.error("fetch year error", err);
        toast({
          content: "Fetch year data error"
        });
      });
  };

  return { years, addYear, brands, addBrand, countries, addCountry, notes, addNote };
};
