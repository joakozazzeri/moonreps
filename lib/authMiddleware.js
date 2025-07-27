// Middleware para verificar autenticación en rutas de API
export function withAuth(handler) {
  return async (req, res) => {
    // Obtener el token del header Authorization
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.startsWith('Bearer ') 
      ? authHeader.substring(7) 
      : null;

    if (!token) {
      return res.status(401).json({ 
        message: 'Token de autenticación requerido' 
      });
    }

    try {
      // Verificar el token
      const verifyResponse = await fetch(`${req.headers.host ? `http://${req.headers.host}` : 'http://localhost:3000'}/api/auth/verify`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token }),
      });

      if (!verifyResponse.ok) {
        return res.status(401).json({ 
          message: 'Token inválido o expirado' 
        });
      }

      // Si el token es válido, continuar con el handler original
      return handler(req, res);
    } catch (error) {
      console.error('Error verificando autenticación:', error);
      return res.status(500).json({ 
        message: 'Error interno del servidor' 
      });
    }
  };
} 