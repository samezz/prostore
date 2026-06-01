
import ProductList from '@/components/shared/product/product-list';
import { getLatestProducts } from '@/lib/actions/product.actions';
import IconBoxes from '@/components/icon-boxes';

// if you want to have a metadata with pipe "Home|prostore"
export const metadata = {
  title: 'Home'
}



const HomePage = async () => {
  const latestProducts = await getLatestProducts();

  return (
    <div className='space-y-8'>
      <h2 className='h2-bold'>Latest Products</h2>
      <ProductList title='Newest Arrivals' data={latestProducts} />
    </div>
  );
};

export default HomePage;

