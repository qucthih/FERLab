// components/ProductCard.tsx
import React from "react";
import Image from "next/image";
import { Product } from "@/data/products";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <Card
      data-testid="product-card"
      className="group/product overflow-hidden border-border/60 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:border-border"
    >
      {/* Product Image */}
      <div className="relative w-full aspect-square overflow-hidden bg-muted/30">
        <Image
          data-testid="product-image"
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover transition-transform duration-500 ease-out group-hover/product:scale-108"
        />
        <span className="absolute top-3 right-3 rounded-full bg-foreground/75 px-3 py-1 text-xs font-bold text-primary-foreground backdrop-blur-sm tracking-wide">
          Trending
        </span>
      </div>

      {/* Card Body */}
      <CardContent className="flex flex-col flex-1 gap-2 pt-4">
        {/* Rating */}
        <div className="flex items-center gap-1 text-xs text-amber-400">
          <span>★ ★ ★ ★ ☆</span>
          <span className="text-muted-foreground ml-1">(4.8)</span>
        </div>

        {/* Name */}
        <h3
          data-testid="product-name"
          className="text-base font-bold text-foreground leading-snug line-clamp-1"
          title={product.name}
        >
          {product.name}
        </h3>

        {/* Description */}
        <p
          data-testid="product-description"
          className="text-sm text-muted-foreground leading-relaxed line-clamp-2 flex-1"
        >
          {product.description}
        </p>
      </CardContent>

      {/* Footer */}
      <CardFooter className="flex items-center justify-between">
        <div className="flex flex-col">
          <span className="text-[0.7rem] uppercase text-muted-foreground font-semibold tracking-wide">
            Price
          </span>
          <span
            data-testid="product-price"
            className="text-lg font-extrabold text-blue-600"
          >
            {product.price}
          </span>
        </div>

        <Button variant="secondary" size="sm" className="font-semibold group-hover/product:bg-primary group-hover/product:text-primary-foreground transition-colors">
          Add to cart
        </Button>
      </CardFooter>
    </Card>
  );
};