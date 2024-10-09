export type ProductPriceDto = {
  id: number;
  labelType: "LISTED" | "VIETNAM_MARKET";
  priceType: "VND" | "USD";
  value: number;
  isSearch: boolean;
  link: string;
  createdAt: string;
  updatedAt: string;
};
