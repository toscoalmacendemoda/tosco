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
            const { key } = req.query;
            if (!key) {
                return res.status(400).json({ error: 'Falta parámetro key.' });
            }
            const config = await prisma.config.findUnique({
                where: { key }
            });
            if (!config) {
                return res.status(404).json({ error: 'Configuración no encontrada.' });
            }
            return res.status(200).json(config.data);
        }

        if (req.method === 'POST') {
            const { key, data, action } = req.body;
            
            // Database reset action helper
            if (action === 'reset') {
                await prisma.product.deleteMany({});
                await prisma.config.deleteMany({});
                return res.status(200).json({ success: true, message: 'Base de datos vaciada con éxito.' });
            }

            if (!key || data === undefined) {
                return res.status(400).json({ error: 'Faltan campos key o data.' });
            }

            const config = await prisma.config.upsert({
                where: { key },
                update: { data: data },
                create: { key, data: data }
            });
            return res.status(200).json(config.data);
        }

        return res.status(405).json({ error: 'Método no permitido.' });
    } catch (error) {
        console.error('Error in api/config:', error);
        return res.status(500).json({ error: 'Error del servidor.', details: error.message });
    }
};
