export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Método no permitido' });
  }

  try {
    const { token } = req.body;

    if (!token) {
      return res.status(400).json({ message: 'Token requerido' });
    }

    // En una implementación más robusta, verificarías el token contra una base de datos
    // y verificarías su tiempo de expiración
    // Por ahora, simplemente verificamos que el token existe y tiene el formato correcto
    
    if (typeof token === 'string' && token.length > 0) {
      res.status(200).json({
        success: true,
        valid: true,
        message: 'Token válido'
      });
    } else {
      res.status(401).json({
        success: false,
        valid: false,
        message: 'Token inválido'
      });
    }

  } catch (error) {
    console.error('Error verificando token:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
} 