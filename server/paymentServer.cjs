const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// Configuración del servidor
const app = express();
app.use(cors());
app.use(bodyParser.json());

// Endpoint para procesar el pago
app.post('/process-payment', (req, res) => {
    const { cardNumber, amount } = req.body;

    // Simulación de la lógica de verificación y procesamiento del pago
    if (cardNumber === '4242424242424242' && amount <= 100) {
        res.json({ success: true, message: 'Payment successful!' });
    } else {
        res.json({ success: false, error: 'Insufficient funds or invalid card.' });
    }
});

const PORT = 4242;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
