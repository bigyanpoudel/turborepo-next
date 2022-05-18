import React from "react";
import { Button } from "ui";
import Image from "next/image";
export const ProductCard = (props: any) => {
  const { title, description, image } = props;

  const imageURL = image
    ? image.split("https://")[1]
    : "/api.lorem.space/image/shoes";

  return (
    <div className="card w-80 bg-base-100 shadow-200">
      <Image src={imageURL} alt="Shoes" height={250} width={370} />

      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <p>{description}</p>
        <div className="card-actions justify-end">
          <Button appearance="secondary" size="sm">
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
