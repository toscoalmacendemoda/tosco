const prisma = require('./prisma');

module.exports = async (req, res) => {
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    try {
        if (req.method === 'GET') {
            const orders = await prisma.order.findMany({
                orderBy: { date: 'desc' }
            });
            const serialized = orders.map(o => ({
                ...o,
                id: String(o.id)
            }));
            return res.status(200).json(serialized);
        }

        if (req.method === 'POST') {
            const o = req.body;
            if (o.updateStatusOnly) {
                const { id, status } = o;
                if (!id || !status) {
                    return res.status(400).json({ error: 'Faltan campos (id, status).' });
                }
                const updated = await prisma.order.update({
                    where: { id: String(id) },
                    data: { status }
                });
                return res.status(200).json({
                    ...updated,
                    id: String(updated.id)
                });
            }

            if (!o.id || !o.customer || !o.items) {
                return res.status(400).json({ error: 'Faltan campos requeridos (id, customer, items).' });
            }

            const order = await prisma.order.create({
                data: {
                    id: String(o.id),
                    date: o.date ? new Date(o.date) : new Date(),
                    status: o.status || 'Pendiente',
                    customerName: o.customer.name,
                    customerPhone: o.customer.phone,
                    customerEmail: o.customer.email,
                    customerState: o.customer.state,
                    customerCity: o.customer.city,
                    customerAddress: o.customer.address,
                    customerZip: o.customer.zip,
                    carrier: o.carrier || '',
                    shippingCost: parseFloat(o.shippingCost) || 0,
                    subtotal: parseFloat(o.subtotal) || 0,
                    total: parseFloat(o.total) || 0,
                    items: o.items || []
                }
            });
            return res.status(200).json({
                ...order,
                id: String(order.id)
            });
        }

        if (req.method === 'PUT' || req.method === 'PATCH') {
            const { id, status } = req.body;
            if (!id || !status) {
                return res.status(400).json({ error: 'Faltan campos (id, status).' });
            }
            const updated = await prisma.order.update({
                where: { id: String(id) },
                data: { status }
            });
            return res.status(200).json({
                ...updated,
                id: String(updated.id)
            });
        }

        if (req.method === 'DELETE') {
            const { id } = req.query;
            if (!id) {
                return res.status(400).json({ error: 'Falta parámetro id.' });
            }
            await prisma.order.delete({
                where: { id: String(id) }
            });
            return res.status(200).json({ success: true });
        }

        return res.status(405).json({ error: 'Método no permitido.' });
    } catch (error) {
        console.error('Error in api/orders:', error);
        return res.status(500).json({ error: 'Error del servidor.', details: error.message });
    }
};
