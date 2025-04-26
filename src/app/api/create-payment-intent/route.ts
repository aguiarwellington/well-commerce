import { auth } from '@clerk/nextjs/server';
import { stripe } from "@/lib/strype";
import { ProductType } from "@/types/productType";
import prisma from '@/lib/prisma';

const calculateOrderAmount = (items: ProductType[]) => {
  return items.reduce((acc, item) => acc + item.price! * item.quantity!, 0);
};

export async function POST(request: Request) {
    const { userId } = await auth();
  const { items, payment_intent_id } = await request.json();

  if (!userId) {
    return new Response('Unauthorized', { status: 401 });
  }

  const total = calculateOrderAmount(items);

  const orderData = {
    user: { connect: { id: 1 } }, // substituir por userId real se necessário
    amount: total,
    currency: 'brl',
    status: 'pending',
    paymentIntentID: payment_intent_id,
    products: {
      create: items.map((item: ProductType) => ({
        name: item.name,
        description: item.description,
        quantity: item.quantity,
        price: item.price,
        image: item.image,
      })),
    }
  };

  if (payment_intent_id) {
    const current_intent = await stripe.paymentIntents.retrieve(payment_intent_id);

    if (current_intent) {
      const updated_intent = await stripe.paymentIntents.update(payment_intent_id, {
        amount: total
      });

      const existing_order = await prisma.order.findFirst({
        where: { paymentIntID : payment_intent_id },
        include: { products: true },
      });

      if (!existing_order) {
        return new Response('Order not found', { status: 404 });
      }

      await prisma.order.update({
        where: { paymentIntID : payment_intent_id },
        data: {
          amount: total,
          products: {
            create: items.map((item: ProductType) => ({
              name: item.name,
              description: item.description,
              quantity: item.quantity,
              price: item.price,
              image: item.image,
            })),
          },
        },
      });

      return Response.json({ paymentIntent: updated_intent }, { status: 200 });
    }
  }

  // Criar novo paymentIntent e pedido se não houver um existente
  const paymentIntent = await stripe.paymentIntents.create({
    amount: total,
    currency: 'brl',
    automatic_payment_methods: { enabled: true },
  });

  orderData.paymentIntentID = paymentIntent.id;

  await prisma.order.create({
    data: orderData,
  });

  return Response.json({ paymentIntent }, { status: 200 });
}
