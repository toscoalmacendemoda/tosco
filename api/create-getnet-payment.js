// Vercel Serverless Function: api/create-getnet-payment.js

module.exports = async (req, res) => {
    // Enable CORS
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

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Método no permitido. Use POST.' });
    }

    try {
        const { items, shippingCost, customer, orderId } = req.body || {};
        if (!items || !customer) {
            return res.status(400).json({ error: 'Faltan campos requeridos (items, customer).' });
        }

        const clientId = process.env.GETNET_CLIENT_ID;
        const clientSecret = process.env.GETNET_CLIENT_SECRET;
        const merchantId = process.env.GETNET_MERCHANT_ID || process.env.GETNET_SELLER_ID;
        const apiUrl = process.env.GETNET_API_URL || 'https://api.getnet.com.ar';

        // Sandbox/Simulation Mode if credentials are not configured yet
        if (!clientId || !clientSecret) {
            return res.status(200).json({
                mode: 'sandbox_simulation',
                success: true,
                init_point: `${req.headers.referer || '/'}?payment=success_simulated`
            });
        }

        // 1. Get access token from OAuth endpoint
        const authResponse = await fetch(`${apiUrl}/oauth/token`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                client_id: clientId,
                client_secret: clientSecret,
                grant_type: 'client_credentials'
            })
        });

        if (!authResponse.ok) {
            const errAuth = await authResponse.text();
            throw new Error(`Getnet Authentication failed: ${errAuth}`);
        }

        const authData = await authResponse.json();
        const accessToken = authData.access_token;

        // 2. Calculate total amount in cents (Getnet orders require integer cents)
        const subtotal = items.reduce((sum, item) => sum + Number(item.price) * Number(item.quantity), 0);
        const totalAmount = Math.round((subtotal + Number(shippingCost || 0)) * 100);

        // 3. Format items and create order body (Geopagos v2 spec)
        const orderBody = {
            data: {
                type: 'orders',
                attributes: {
                    seller_id: merchantId,
                    amount: totalAmount,
                    currency: 'ARS',
                    description: `Pedido Tosco #${orderId || Date.now()}`,
                    callback_url: `${req.headers.origin}/index.html?payment=success`,
                    redirect_url: `${req.headers.origin}/index.html?payment=success`,
                    cancel_url: `${req.headers.origin}/index.html?payment=failure`,
                    items: items.map(item => ({
                        name: item.name,
                        price: Math.round(Number(item.price) * 100),
                        quantity: Number(item.quantity)
                    })),
                    buyer: {
                        first_name: customer.name.split(' ')[0] || customer.name,
                        last_name: customer.name.split(' ').slice(1).join(' ') || '.',
                        email: customer.email,
                        phone: customer.phone
                    }
                }
            }
        };

        if (shippingCost && Number(shippingCost) > 0) {
            orderBody.data.attributes.items.push({
                name: 'Costo de Envío',
                price: Math.round(Number(shippingCost) * 100),
                quantity: 1
            });
        }

        // 4. Send request to create the order
        const orderResponse = await fetch(`${apiUrl}/api/v2/orders`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/vnd.api+json',
                'Accept': 'application/vnd.api+json',
                'Authorization': `Bearer ${accessToken}`
            },
            body: JSON.stringify(orderBody)
        });

        if (!orderResponse.ok) {
            const errOrder = await orderResponse.text();
            throw new Error(`Getnet Order API failed: ${errOrder}`);
        }

        const orderResult = await orderResponse.json();
        
        // Retrieve checkout URL from response attributes/links
        const checkoutUrl = orderResult.data.attributes.checkout_url || 
                            (orderResult.data.links && orderResult.data.links.checkout) || 
                            orderResult.data.attributes.payment_url;

        if (!checkoutUrl) {
            throw new Error('No checkout_url found in Getnet order response.');
        }

        return res.status(200).json({
            mode: 'official_api',
            success: true,
            init_point: checkoutUrl
        });

    } catch (error) {
        console.error('Error in api/create-getnet-payment:', error);
        return res.status(500).json({ error: 'Fallo al inicializar el pago con Getnet.', details: error.message });
    }
};
