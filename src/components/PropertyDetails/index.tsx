// components/PropertyDetails/index.tsx

const PropertyDetails = ({ data }: { data: any }) => {
  const { title, description, images, price } = data.attributes;

  return (
    <div className="container py-12">
      <h1 className="text-3xl font-bold mb-4">{title}</h1>
      <p className="mb-6">{description}</p>
      <p className="font-semibold text-xl">₺{price}</p>

      <div className="grid grid-cols-2 gap-4 mt-6">
        {images?.data?.map((img: any) => (
          <img key={img.id} src={img.attributes.url} alt="" className="rounded-lg" />
        ))}
      </div>
    </div>
  );
};

export default PropertyDetails;
