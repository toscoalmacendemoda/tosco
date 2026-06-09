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
            const products = await prisma.product.findMany({
                orderBy: { order: 'asc' }
            });
            return res.status(200).json(products);
        }

        if (req.method === 'POST') {
            const p = req.body;
            if (!p.id || !p.name || p.price === undefined) {
                return res.status(400).json({ error: 'Faltan campos requeridos (id, name, price).' });
            }

            const product = await prisma.product.upsert({
                where: { id: parseInt(p.id) },
                update: {
                    name: p.name,
                    brand: p.brand,
                    category: p.category,
                    subcategory: p.subcategory,
                    price: parseFloat(p.price),
                    originalPrice: p.originalPrice ? parseFloat(p.originalPrice) : null,
                    stock: parseInt(p.stock) || 0,
                    image: p.image,
                    labels: p.labels || [],
                    sizes: p.sizes || [],
                    sizesStock: p.sizesStock || {},
                    order: parseInt(p.order) || 0,
                    visible: p.visible !== false
                },
                create: {
                    id: parseInt(p.id),
                    name: p.name,
                    brand: p.brand,
                    category: p.category,
                    subcategory: p.subcategory,
                    price: parseFloat(p.price),
                    originalPrice: p.originalPrice ? parseFloat(p.originalPrice) : null,
                    stock: parseInt(p.stock) || 0,
                    image: p.image,
                    labels: p.labels || [],
                    sizes: p.sizes || [],
                    sizesStock: p.sizesStock || {},
                    order: parseInt(p.order) || 0,
                    visible: p.visible !== false
                }
            });
            return res.status(200).json(product);
        }

        if (req.method === 'DELETE') {
            const { id } = req.query;
            if (!id) {
                return res.status(400).json({ error: 'Falta parámetro id.' });
            }
            await prisma.product.delete({
                where: { id: parseInt(id) }
            });
            return res.status(200).json({ success: true });
        }

        return res.status(405).json({ error: 'Método no permitido.' });
    } catch (error) {
        console.error('Error in api/products:', error);
        return res.status(500).json({ error: 'Error del servidor.', details: error.message });
    }
};
