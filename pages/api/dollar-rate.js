// pages/api/dollar-rate.js
export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // Intentar primero con DolarAPI
    try {
      const response = await fetch('https://dolarapi.com/v1/dolares/oficial');
      if (response.ok) {
        const data = await response.json();
        return res.status(200).json({
          rate: data.venta,
          date: data.fechaActualizacion,
          source: 'DolarAPI'
        });
      }
    } catch (error) {
      console.log('DolarAPI failed, trying alternative...', error.message);
    }

    // Fallback a otra API
    try {
      const response = await fetch('https://api.bluelytics.com.ar/v2/latest');
      if (response.ok) {
        const data = await response.json();
        return res.status(200).json({
          rate: data.oficial.value_sell,
          date: data.last_update,
          source: 'Bluelytics'
        });
      }
    } catch (error) {
      console.log('Bluelytics failed, trying BCRA...', error.message);
    }

    // Fallback a BCRA (puede requerir configuración adicional)
    try {
      const response = await fetch('https://api.estadisticasbcra.com/usd_of', {
        headers: {
          'Authorization': 'Bearer GUEST'
        }
      });
      if (response.ok) {
        const data = await response.json();
        const latestRate = data[data.length - 1];
        return res.status(200).json({
          rate: latestRate.v,
          date: latestRate.d,
          source: 'BCRA'
        });
      }
    } catch (error) {
      console.log('BCRA failed:', error.message);
    }

    // Si todas las APIs fallan, usar valor por defecto
    return res.status(200).json({
      rate: 1050, // Valor por defecto actualizable
      date: new Date().toISOString(),
      source: 'Default'
    });

  } catch (error) {
    console.error('Error fetching dollar rate:', error);
    return res.status(500).json({
      message: 'Error fetching dollar rate',
      rate: 1050, // Valor por defecto
      date: new Date().toISOString(),
      source: 'Default'
    });
  }
} 