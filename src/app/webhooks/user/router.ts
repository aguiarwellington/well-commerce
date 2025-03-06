import { Webhook, WebhookRequiredHeaders } from 'svix';
import { IncomingHttpHeaders } from 'http';
import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import prisma from '../../../lib/prisma';

const webhookSecret = process.env.CLERK_WEBHOOK_SECRET || '';

type EventType = 'user.created' | 'user.updated' | '*';

type Event = {
    data: EventDataType;
    object: 'event';
    type: EventType;
};

type EventDataType = {
    id: string;
    first_name: string;
    last_name: string;
    email_address: string;
    primary_email_address_id: string;
    attributes: Record<string, string | number>;
};

async function handler(request: Request) {
    try {
        const payload = await request.json();
        const headerlist = await headers(); // ✅ Agora estamos resolvendo a Promise corretamente

        const header = {
            'svix-id': headerlist.get('svix-id') || '',
            'svix-timestamp': headerlist.get('svix-timestamp') || '',
            'svix-signature': headerlist.get('svix-signature') || '',
        };

        const wh = new Webhook(webhookSecret);
        const evt = wh.verify(
            JSON.stringify(payload),
            header as IncomingHttpHeaders & WebhookRequiredHeaders
        ) as Event;

        const eventType: EventType = evt.type;

        if (eventType === 'user.created' || eventType === 'user.updated') {
            const { id, attributes } = evt.data;

            await prisma.user.upsert({
                where: { externalId: id as string },
                create: {
                    externalId: id,
                    attributes,
                },
                update: {
                    attributes,
                },
            });

            return NextResponse.json({ message: 'User processed' }, { status: 200 });
        }

        return NextResponse.json({ message: 'Event not handled' }, { status: 400 });
    } catch (err) {
        console.error('Webhook verification failed:', (err as Error).message);
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
}

export const GET = handler;
export const POST = handler;
export const PUT = handler;
