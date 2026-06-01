
import { getOrderById } from '@/lib/actions/order.actions';
import { notFound } from 'next/navigation';
import { ShippingAddress } from '@/types';
//Bring the form into the order details page.
import OrderDetailsTable from './order-details-table';
import { Metadata } from 'next';

export const metadata:Metadata = {
  title: 'Order Details',
};
// Now when you place an order, you should see the text "Order Details Form".
const OrderDetailsPage = async (props: {params: Promise<{id: string; }>;}) => {
  const params = await props.params;

  const { id } = params;

  const order = await getOrderById(id);
  if (!order) notFound();

  return (
// We are just passing in the order object to the form. We are also casting the shippingAddress to the ShippingAddress type.
  <OrderDetailsTable order={{...order, shippingAddress: order.shippingAddress as ShippingAddress, }} paypalClientId={process.env.PAYPAL_CLIENT_ID || 'sb'} />);
};

export default OrderDetailsPage;
