export interface IProductCardValue {
  title: string;
  href?: string;
  alt?: string;
  thumbnail?: string;
  country?: string;
  type: "info" | "price";
}
export interface IProductDetailInfo {
  label: string;
  value: IProductCardValue;
}

export interface IProductDetailPrice {
  label: string;
  value: IProductCardValue;
}

export interface INoteItemProps {
  showPercentMode: boolean;
  title: string;
  thumbnail: string;
  percent?: number;
}
