// Vercel Serverless Function: api/send-order-email.js
const nodemailer = require('nodemailer');

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
        const { order } = req.body || {};
        if (!order || !order.customer || !order.customer.email) {
            return res.status(400).json({ error: 'Datos de pedido inválidos o correo de cliente ausente.' });
        }

        const gmailUser = process.env.GMAIL_USER;
        const gmailPass = process.env.GMAIL_PASS;

        if (!gmailUser || !gmailPass) {
            return res.status(200).json({
                success: true,
                message: 'Modo Sandbox. Configura GMAIL_USER y GMAIL_PASS para enviar correos reales.',
                mode: 'sandbox'
            });
        }

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: gmailUser,
                pass: gmailPass
            }
        });

        // 1. Format order items HTML table
        const itemsHtmlRows = order.items.map(item => `
            <tr>
                <td style="padding: 10px; border-bottom: 1px solid #e0e0e0; font-size: 14px;">
                    <strong>${item.name}</strong><br>
                    <span style="font-size: 12px; color: #7f8c8d;">Talle: ${item.size || 'Único'}</span>
                </td>
                <td style="padding: 10px; border-bottom: 1px solid #e0e0e0; font-size: 14px; text-align: center;">${item.quantity}</td>
                <td style="padding: 10px; border-bottom: 1px solid #e0e0e0; font-size: 14px; text-align: right;">$${(item.price * item.quantity).toLocaleString('es-AR')}</td>
            </tr>
        `).join('');

        // 2. Email Body for Customer
        const customerHtml = `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 25px; border: 1px solid #e8e8e8; border-radius: 8px; color: #333;">
                <div style="text-align: center; border-bottom: 1px solid #eeeeee; padding-bottom: 20px; margin-bottom: 20px;">
                    <h1 style="margin: 0; color: #2c3e50; font-size: 24px;">¡Gracias por tu compra!</h1>
                    <p style="color: #7f8c8d; font-size: 14px; margin-top: 5px;">Pedido #${order.id}</p>
                </div>
                
                <p style="font-size: 15px; line-height: 1.5;">Hola <strong>${order.customer.name}</strong>,</p>
                <p style="font-size: 15px; line-height: 1.5;">Hemos registrado tu pago y estamos preparando tu pedido. A continuación encontrarás el detalle de tu compra:</p>
                
                <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
                    <thead>
                        <tr style="background-color: #f8f9fa;">
                            <th style="padding: 10px; text-align: left; font-size: 12px; text-transform: uppercase; color: #7f8c8d; border-bottom: 2px solid #e0e0e0;">Producto</th>
                            <th style="padding: 10px; text-align: center; font-size: 12px; text-transform: uppercase; color: #7f8c8d; border-bottom: 2px solid #e0e0e0;">Cant.</th>
                            <th style="padding: 10px; text-align: right; font-size: 12px; text-transform: uppercase; color: #7f8c8d; border-bottom: 2px solid #e0e0e0;">Subtotal</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${itemsHtmlRows}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colspan="2" style="padding: 10px; font-size: 14px; text-align: right;">Subtotal:</td>
                            <td style="padding: 10px; font-size: 14px; text-align: right;">$${order.subtotal.toLocaleString('es-AR')}</td>
                        </tr>
                        <tr>
                            <td colspan="2" style="padding: 10px; font-size: 14px; text-align: right;">Costo de Envío (${order.carrier}):</td>
                            <td style="padding: 10px; font-size: 14px; text-align: right;">${order.shippingCost === 0 ? 'Gratis' : '$' + order.shippingCost.toLocaleString('es-AR')}</td>
                        </tr>
                        <tr style="font-weight: bold; font-size: 16px; border-top: 2px solid #2c3e50;">
                            <td colspan="2" style="padding: 12px; text-align: right; color: #2c3e50;">Total de la Compra:</td>
                            <td style="padding: 12px; text-align: right; color: #2c3e50;">$${order.total.toLocaleString('es-AR')}</td>
                        </tr>
                    </tfoot>
                </table>

                <div style="background-color: #fafbfc; border: 1px solid #eaebed; border-radius: 6px; padding: 15px; margin-top: 20px;">
                    <h3 style="margin-top: 0; color: #2c3e50; font-size: 14px; border-bottom: 1px solid #eaebed; padding-bottom: 8px;">Datos de Entrega</h3>
                    <p style="margin: 5px 0; font-size: 13px;"><strong>Dirección:</strong> ${order.customer.address}</p>
                    <p style="margin: 5px 0; font-size: 13px;"><strong>Localidad:</strong> ${order.customer.city}, ${order.customer.state} (${order.customer.zip})</p>
                    <p style="margin: 5px 0; font-size: 13px;"><strong>Teléfono:</strong> ${order.customer.phone}</p>
                    <p style="margin: 5px 0; font-size: 13px;"><strong>Método de Envío:</strong> ${order.carrier}</p>
                </div>

                <p style="font-size: 13px; color: #7f8c8d; line-height: 1.5; margin-top: 30px; text-align: center;">
                    Cualquier duda o consulta, puedes responder a este correo o escribirnos a nuestro WhatsApp oficial.<br>
                    <strong>TOSCO Almacén de Moda</strong>
                </p>
            </div>
        `;

        // 3. Email Body for Admin (New Order Notification)
        const adminHtml = `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 25px; border: 1px solid #c0392b; border-radius: 8px; color: #333;">
                <div style="text-align: center; border-bottom: 1px solid #eeeeee; padding-bottom: 20px; margin-bottom: 20px;">
                    <h1 style="margin: 0; color: #c0392b; font-size: 24px;">🚨 ¡Nuevo Pedido Recibido!</h1>
                    <p style="color: #7f8c8d; font-size: 14px; margin-top: 5px;">Pedido #${order.id}</p>
                </div>
                
                <p style="font-size: 15px; line-height: 1.5;">Se ha registrado una nueva venta en la tienda online:</p>
                
                <div style="background-color: #fdf2f2; border: 1px solid #f5c2c2; border-radius: 6px; padding: 15px; margin: 15px 0;">
                    <h3 style="margin-top: 0; color: #c0392b; font-size: 14px;">Cliente: ${order.customer.name}</h3>
                    <p style="margin: 5px 0; font-size: 13px;"><strong>Email:</strong> ${order.customer.email}</p>
                    <p style="margin: 5px 0; font-size: 13px;"><strong>Teléfono:</strong> ${order.customer.phone}</p>
                    <p style="margin: 5px 0; font-size: 13px;"><strong>Dirección:</strong> ${order.customer.address}, ${order.customer.city} (${order.customer.zip})</p>
                </div>

                <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
                    <thead>
                        <tr style="background-color: #f8f9fa;">
                            <th style="padding: 10px; text-align: left; font-size: 12px; text-transform: uppercase; color: #7f8c8d; border-bottom: 2px solid #e0e0e0;">Producto</th>
                            <th style="padding: 10px; text-align: center; font-size: 12px; text-transform: uppercase; color: #7f8c8d; border-bottom: 2px solid #e0e0e0;">Cant.</th>
                            <th style="padding: 10px; text-align: right; font-size: 12px; text-transform: uppercase; color: #7f8c8d; border-bottom: 2px solid #e0e0e0;">Subtotal</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${itemsHtmlRows}
                    </tbody>
                    <tfoot>
                        <tr style="font-weight: bold; font-size: 16px; border-top: 2px solid #c0392b;">
                            <td colspan="2" style="padding: 12px; text-align: right; color: #c0392b;">Total de la Venta:</td>
                            <td style="padding: 12px; text-align: right; color: #c0392b;">$${order.total.toLocaleString('es-AR')}</td>
                        </tr>
                    </tfoot>
                </table>

                <p style="text-align: center; margin-top: 25px;">
                    <a href="${req.headers.origin || 'https://toscoalmacendemoda.com'}/admin" style="background-color: #c0392b; color: white; padding: 12px 20px; text-decoration: none; border-radius: 4px; font-weight: bold; display: inline-block;">Ir al Panel de Administración</a>
                </p>
            </div>
        `;

        // Send order confirmation email to Customer
        await transporter.sendMail({
            from: `"Tosco Almacén" <${gmailUser}>`,
            to: order.customer.email,
            subject: `Confirmación de Compra - Pedido #${order.id} - Tosco`,
            html: customerHtml
        });

        // Send notification email to Admin
        await transporter.sendMail({
            from: `"Tosco Tienda" <${gmailUser}>`,
            to: gmailUser,
            subject: `🚨 NUEVA VENTA REGISTRADA - Pedido #${order.id}`,
            html: adminHtml
        });

        return res.status(200).json({
            success: true,
            message: 'Correos enviados correctamente.',
            mode: 'live'
        });

    } catch (error) {
        console.error('Error in api/send-order-email:', error);
        return res.status(500).json({ error: 'Error al enviar correos del pedido.', details: error.message });
    }
};
