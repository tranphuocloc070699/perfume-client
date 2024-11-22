export type ProductPriceDto = {
  id?: number;
  labelType: "LISTED" | "VIETNAM_MARKET";
  priceType: "VND" | "USD";
  value: string;
  isSearch: boolean;
  link: string;
  createdAt: string;
  updatedAt: string;
};

