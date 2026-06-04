// Vercel Serverless Function: api/send-otp.js
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
        return res.status(405).json({ error: 'Método no permitido.' });
    }

    try {
        const { email } = req.body || {};
        if (!email || !email.includes('@')) {
            return res.status(400).json({ error: 'Un email válido es requerido.' });
        }

        const cleanEmail = email.trim().toLowerCase();
        
        // Generate random 6-digit OTP code
        const otp = String(Math.floor(100000 + Math.random() * 900000));
        
        // Centralized Bucket ID for Tosco DB
        const bucketId = 'bucket_tosco_almacen_335196ff';
        
        // 1. Save email registration key (persists customer email permanently)
        await fetch(`https://kvdb.io/${bucketId}/tosco:email:${cleanEmail}`, {
            method: 'POST',
            body: new Date().toISOString()
        });

        // 2. Save temporary verification OTP (expires in KVdb if supported or we overwrite)
        await fetch(`https://kvdb.io/${bucketId}/tosco:otp:${cleanEmail}`, {
            method: 'POST',
            body: otp
        });

        // 3. Send email to customer
        let sentMethod = null;
        const gmailUser = process.env.GMAIL_USER;
        const gmailPass = process.env.GMAIL_PASS;
        const resendApiKey = process.env.RESEND_API_KEY;

        const subject = `${otp} es tu código de verificación - Tosco`;
        const htmlContent = `
            <div style="font-family: Arial, sans-serif; max-width: 500px; margin: 0 auto; padding: 20px; border: 1px solid #f0f0f0; border-radius: 8px;">
                <div style="text-align: center; margin-bottom: 20px;">
                    <h2 style="color: #333333; margin: 0;">Tosco Almacén de Moda</h2>
                </div>
                <p style="color: #555555; font-size: 14px; line-height: 1.5;">¡Hola!</p>
                <p style="color: #555555; font-size: 14px; line-height: 1.5;">Tu código de verificación para ingresar a la tienda es:</p>
                <div style="background-color: #f9f9f9; border: 1px solid #e0e0e0; border-radius: 6px; padding: 15px; text-align: center; margin: 20px 0;">
                    <span style="font-size: 32px; font-weight: bold; letter-spacing: 4px; color: #2c3e50; font-family: monospace;">${otp}</span>
                </div>
                <p style="color: #999999; font-size: 12px; line-height: 1.5; text-align: center; margin-top: 20px;">El código expirará en 10 minutos. Si no solicitaste este código, puedes ignorar este correo de forma segura.</p>
            </div>
        `;

        if (gmailUser && gmailPass) {
            // Send via Gmail SMTP
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: gmailUser,
                    pass: gmailPass
                }
            });

            await transporter.sendMail({
                from: `"Tosco Almacén" <${gmailUser}>`,
                to: cleanEmail,
                subject: subject,
                html: htmlContent
            });
            sentMethod = 'gmail';
            console.log(`OTP email sent via Gmail to ${cleanEmail}`);
        } else if (resendApiKey) {
            // Send via Resend API
            await fetch('https://api.resend.com/emails', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${resendApiKey}`
                },
                body: JSON.stringify({
                    from: 'Tosco Almacén <onboarding@resend.dev>',
                    to: cleanEmail,
                    subject: subject,
                    html: htmlContent
                })
            });
            sentMethod = 'resend';
            console.log(`OTP email sent via Resend to ${cleanEmail}`);
        }

        return res.status(200).json({
            success: true,
            message: 'Código enviado correctamente.',
            sentMethod: sentMethod,
            // Return code for sandbox simulation if no email client is configured
            code: sentMethod ? null : otp 
        });

    } catch (error) {
        console.error('Error in api/send-otp:', error);
        return res.status(500).json({ error: 'Error al enviar el código OTP.', details: error.message });
    }
};
