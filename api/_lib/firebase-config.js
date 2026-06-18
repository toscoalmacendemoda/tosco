module.exports = (req, res) => {
    // Add CORS headers just in case
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    res.status(200).json({
        apiKey: process.env.FIREBASE_API_KEY || "AIzaSyBA0MU8Pt0sctRIUeg1uiMdz2Rq0e5aNmU",
        authDomain: process.env.FIREBASE_AUTH_DOMAIN || "tosco-90f31.firebaseapp.com",
        projectId: process.env.FIREBASE_PROJECT_ID || "tosco-90f31",
        storageBucket: process.env.FIREBASE_STORAGE_BUCKET || "tosco-90f31.firebasestorage.app",
        messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID || "1079789010898",
        appId: process.env.FIREBASE_APP_ID || "1:1079789010898:web:46581a797283726d21920b"
    });
};
