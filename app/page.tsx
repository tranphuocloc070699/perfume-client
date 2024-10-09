import AppTitle from "@/components/common/AppTitle";
import ProductCardList from "@/components/specific/Product/ProductCardList";
import ProductService from "@/services/modules/product.service";
import { ProductDto } from "@/types/product/product.model";

export default async function Home() {
  // const [productList, setProductList] = useState<Product[]>([]);

  // const fetchData = async () => {
  //   const productService = new ProductService();

  //   const response = await productService.getAllProduct();

  //   if (response.data.content.length > 0) {
  //     setProductList(response.data.content);
  //   }
  // };
  // useEffect(() => {
  //   fetchData();
  // }, []);
  const productService = new ProductService();
  const { data } = await productService.getAllProduct();

  return (
    <main className={`md:px-0 px-4 w-full max-w-`}>
      <section className="mt-6">
        <AppTitle
          loading={false}
          title="Mới ra mắt"
          icon="material-symbols-light:award-star-outline"
        >
          <ProductCardList data={data.content} />
          <div></div>
        </AppTitle>
      </section>
    </main>
  );
}
