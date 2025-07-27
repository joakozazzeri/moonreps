import { createHash } from 'crypto';

// Obtener credenciales desde variables de entorno
const getAdminCredentials = () => {
  const username = process.env.ADMIN_USERNAME;
  const password = process.env.ADMIN_PASSWORD;
  const name = process.env.ADMIN_NAME || 'Administrador';
  
  // Logs para debuggear
  console.log('🔍 Debug - Variables de entorno:');
  console.log('ADMIN_USERNAME:', username ? '✅ Configurado' : '❌ NO configurado');
  console.log('ADMIN_PASSWORD:', password ? '✅ Configurado' : '❌ NO configurado');
  console.log('ADMIN_NAME:', name);
  
  // Solo retornar credenciales si están configuradas
  if (!username || !password) {
    console.log('❌ Error: Variables de entorno faltantes');
    return {};
  }
  
  console.log('✅ Credenciales configuradas correctamente');
  return {
    admin: {
      username,
      password,
      name
    }
  };
};

// Función para hashear contraseñas
function hashPassword(password) {
  return createHash('sha256').update(password).digest('hex');
}

// Función para generar un token simple
function generateToken(username) {
  const timestamp = Date.now();
  const randomString = Math.random().toString(36).substring(2);
  return createHash('sha256').update(`${username}${timestamp}${randomString}`).digest('hex');
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Método no permitido' });
  }

  try {
    const { username, password } = req.body;
    
    console.log('🔍 Debug - Datos recibidos:');
    console.log('Username recibido:', username ? username : '❌ Vacío');
    console.log('Password recibido:', password ? '✅ Proporcionada' : '❌ Vacía');

    if (!username || !password) {
      return res.status(400).json({ message: 'Usuario y contraseña son requeridos' });
    }

    // Obtener credenciales desde variables de entorno
    const ADMIN_CREDENTIALS = getAdminCredentials();
    
    // Verificar que las credenciales estén configuradas
    if (Object.keys(ADMIN_CREDENTIALS).length === 0) {
      console.log('❌ Error: No se pudieron obtener las credenciales');
      return res.status(500).json({ 
        message: 'Error de configuración: Variables de entorno no configuradas' 
      });
    }
    
    console.log('🔍 Debug - Credenciales obtenidas:', Object.keys(ADMIN_CREDENTIALS));
    
    // Buscar el usuario en las credenciales
    const user = Object.values(ADMIN_CREDENTIALS).find(
      cred => cred.username === username
    );
    
    console.log('🔍 Debug - Usuario buscado:', username);
    console.log('🔍 Debug - Usuario encontrado:', user ? '✅ Sí' : '❌ No');

    if (!user) {
      console.log('❌ Error: Usuario no encontrado');
      return res.status(401).json({ message: 'Credenciales incorrectas' });
    }

    // Verificar la contraseña
    const hashedPassword = hashPassword(password);
    const expectedHash = hashPassword(user.password);

    console.log('🔍 Debug - Verificación de contraseña:');
    console.log('Contraseña ingresada:', password ? '✅ Proporcionada' : '❌ Vacía');
    console.log('Contraseña esperada:', user.password ? '✅ Configurada' : '❌ Vacía');
    console.log('Hash coinciden:', hashedPassword === expectedHash ? '✅ Sí' : '❌ No');

    if (hashedPassword !== expectedHash) {
      console.log('❌ Error: Contraseña incorrecta');
      return res.status(401).json({ message: 'Credenciales incorrectas' });
    }

    // Generar token
    const token = generateToken(username);

    console.log('✅ Login exitoso para usuario:', user.username);

    // En producción, aquí guardarías el token en una base de datos
    // con tiempo de expiración

    res.status(200).json({
      success: true,
      token,
      username: user.username,
      name: user.name,
      message: 'Login exitoso'
    });

  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
} 