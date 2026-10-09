// components/ProductCard.tsx
'use client';

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/data/products";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FavoriteButton } from "@/components/FavoriteButton";

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <Card
      data-testid="product-card"
      className="group/product overflow-hidden border-border/60 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:border-border flex flex-col justify-between"
    >
      {/* Top section: Link to detail page wrapping image and name */}
      <Link
        href={`/products/${product.id}`}
        data-testid="link-detail"
        className="block no-underline"
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
            {product.category}
          </span>
        </div>

        {/* Card Body */}
        <CardContent className="flex flex-col gap-2 pt-4">
          {/* Rating */}
          <div className="flex items-center gap-1 text-xs text-amber-400">
            <span>★ ★ ★ ★ ☆</span>
            <span className="text-muted-foreground ml-1">(4.8)</span>
          </div>

          {/* Name */}
          <h3
            data-testid="product-name"
            className="text-base font-bold text-foreground leading-snug line-clamp-1 group-hover/product:text-blue-600 transition-colors"
            title={product.name}
          >
            {product.name}
          </h3>

          {/* Description */}
          <p
            data-testid="product-description"
            className="text-sm text-muted-foreground leading-relaxed line-clamp-2"
          >
            {product.description}
          </p>
        </CardContent>
      </Link>

      {/* Footer */}
      <CardFooter className="flex items-center justify-between pt-2">
        <div className="flex flex-col">
          <span className="text-[0.7rem] uppercase text-muted-foreground font-semibold tracking-wide">
            Price
          </span>
          <span
            data-testid="product-price"
            className="text-lg font-extrabold text-blue-600"
          >
            ${product.price}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <FavoriteButton productId={product.id} />
          <Button
            variant="secondary"
            size="sm"
            className="font-semibold group-hover/product:bg-primary group-hover/product:text-primary-foreground transition-colors cursor-pointer"
          >
            Add to cart
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;