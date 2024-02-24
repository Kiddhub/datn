const ProductDescription = ({ des }) => {
  return (
    <div className="m-10">
      <div dangerouslySetInnerHTML={{ __html: des }} />
    </div>
  );
};

export default ProductDescription;
