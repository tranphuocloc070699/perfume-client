import React, { ReactNode } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface IProductCardBlockProps {
  title: string;
  children: ReactNode;
}

const ProductCardBlock = ({ title, children }: IProductCardBlockProps) => {
  return (
    <>
      <Card className="relative">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>{children}</CardContent>
      </Card>
    </>
  );
};

export default ProductCardBlock;
