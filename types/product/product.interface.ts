export interface IProductDetailInfo {
  label: string;
  value: {
    title: string;
    href?: string;
  };
}

export interface IProductDetailPrice {
  label: string;
  value: {
    title: number;
    href?: string;
    alt?: string;
    country: "VN" | "US";
  };
}
