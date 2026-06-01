// create the table to embed in the order details page.

'use client';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';
import { formatCurrency, formatDateTime, formatId } from '@/lib/utils';
import { Order } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import {
  PayPalButtons,
  PayPalScriptProvider,
  usePayPalScriptReducer,
} from '@paypal/react-paypal-js';

import {
  approvePayPalOrder,
  createPayPalOrder,
} from '@/lib/actions/order.actions';

// We are just bringing in some components from ShadCN, Image, Link components, our utility functions.

// Checks the loading status of the PayPal script
function PrintLoadingState() {
  const [{ isPending, isRejected }] = usePayPalScriptReducer();
  if (isPending) {
    return <p className='text-blue-500'>Loading PayPal...</p>;
  }
  if (isRejected) {
    return <p className='text-red-500'>Error in loading PayPal.</p>;
  }
  return null;
}

const OrderDetailsTable = ({ order, paypalClientId }: { order: Order; paypalClientId: string }) => {

    // Let's destructure the order data:

    const {
        shippingAddress,
        orderItems,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paymentMethod,
        isPaid,
        paidAt,
        isDelivered,
        deliveredAt,
        } = order;

  const { toast } = useToast();
// Creates a PayPal order
const handleCreatePayPalOrder = async () => {
  const res = await createPayPalOrder(order.id);
  if (!res.success)
    return toast({
      description: res.message,
      variant: 'destructive',
    });
  return res.data;
};

// Approves a PayPal order
const handleApprovePayPalOrder = async (data: { orderID: string }) => {
  const res = await approvePayPalOrder(order.id, data);
  toast({
    description: res.message,
    variant: res.success ? 'default' : 'destructive',
  });
};

  return (
    <>
      <h1 className='py-4 text-2xl'> Order {formatId(order.id)}</h1>
      <div className='grid md:grid-cols-3 md:gap-5'>
        <div className='overflow-x-auto md:col-span-2 space-y-4'>

       
        <Card>

        <CardContent className='p-4 gap-4'>

            <h2 className='text-xl pb-4'>Payment Method</h2>

            <p className='mb-2'>{paymentMethod}</p>

            {/* We are checking if the order is paid. If it is, we are displaying the paid at date. 
            If it is not, we are displaying a badge that says "Not paid". */}
            {isPaid ? (
            <Badge variant='secondary'>
                Paid at {formatDateTime(paidAt!).dateTime}
            </Badge>
            ) : (
            <Badge variant='destructive'>Not paid</Badge>
            )}

        </CardContent>

        </Card>

           
        <Card>

        <CardContent className='p-4 gap-4'>

            <h2 className='text-xl pb-4'>Shipping Address</h2>

            <p>{shippingAddress.fullName}</p>

            <p className='mb-2'>
            {shippingAddress.streetAddress}, {shippingAddress.city},{' '}
            {shippingAddress.postalCode}, {shippingAddress.country}{' '}
            </p>

            {/* This checks for delivery and will display a badge that says "Not delivered" 
            if it is not delivered and the delivery date if it is delivered. */}
            {isDelivered ? (
            <Badge variant='secondary'>
                Delivered at {formatDateTime(deliveredAt!).dateTime}
            </Badge>
            ) : (
            <Badge variant='destructive'>Not delivered</Badge>
            )}

        </CardContent>

        </Card>

        {/*  This will show the order items. */}
        <Card>

        <CardContent className='p-4 gap-4'>

            <h2 className='text-xl pb-4'>Order Items</h2>

            <Table>

            <TableHeader>

                <TableRow>
                <TableHead>Item</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Price</TableHead>

                </TableRow>

            </TableHeader>

            <TableBody>

                {orderItems.map((item) => (
                <TableRow key={item.slug}>

                    <TableCell>

                    <Link href={`/product/${item.slug}`} className='flex items-center' > 

                        <Image src={item.image} alt={item.name} width={50} height={50} ></Image>

                        <span className='px-2'>{item.name}</span>

                    </Link>

                    </TableCell>

                    <TableCell>
                    <span className='px-2'>{item.qty}</span>
                    </TableCell>

                    <TableCell className='text-right'>${item.price}</TableCell>

                </TableRow>

                ))}

            </TableBody>

            </Table>

        </CardContent>

        </Card>
        
        </div>  

        {/* Finally we want the price summary */}
        <div>
            <Card>
                <CardContent className='p-4 space-y-4 gap-4'>
                <h2 className='text-xl pb-4'>Order Summary</h2>
                <div className='flex justify-between'>
                    <div>Items</div>
                    <div>{formatCurrency(itemsPrice)}</div>
                </div>
                <div className='flex justify-between'>
                    <div>Tax</div>
                    <div>{formatCurrency(taxPrice)}</div>
                </div>
                <div className='flex justify-between'>
                    <div>Shipping</div>
                    <div>{formatCurrency(shippingPrice)}</div>
                </div>
                <div className='flex justify-between'>
                    <div>Total</div>
                    <div>{formatCurrency(totalPrice)}</div>
                </div>

                {  /* PayPal Payment */}

                {
                !isPaid && paymentMethod === 'PayPal' && (
                    <div>
                    <PayPalScriptProvider options={{ clientId: paypalClientId }}>
                        <PrintLoadingState />
                        <PayPalButtons
                        createOrder={handleCreatePayPalOrder}
                        onApprove={handleApprovePayPalOrder}
                        />
                    </PayPalScriptProvider>
                    </div>
                )}
                

                </CardContent>
            </Card>
        </div>
        

      </div>
    </>
  );
};

export default OrderDetailsTable;