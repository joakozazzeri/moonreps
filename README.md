# Moon Reps - Ecommerce Store

Una tienda de comercio electrónico moderna construida con Next.js, con soporte para Supabase y diseño responsivo.

## 🚀 Despliegue en Vercel

### Configuración de Variables de Entorno

Para que la aplicación funcione correctamente en Vercel, necesitas configurar las siguientes variables de entorno:

1. Ve a tu proyecto en [Vercel Dashboard](https://vercel.com/dashboard)
2. Navega a **Settings** > **Environment Variables**
3. Agrega las siguientes variables:

#### Variables Obligatorias (para Supabase):
```
NEXT_PUBLIC_SUPABASE_URL=tu_url_de_supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_clave_anonima_de_supabase
```

#### Variables Opcionales (para autenticación admin):
```
ADMIN_USERNAME=tu_usuario_admin
ADMIN_PASSWORD=tu_contraseña_admin
ADMIN_NAME=Nombre del Administrador
```

### Configuración de Supabase

1. Crea una cuenta en [Supabase](https://supabase.com)
2. Crea un nuevo proyecto
3. Ve a **Settings** > **API** para obtener tu URL y clave anónima
4. Crea una tabla `products` con la siguiente estructura:

```sql
CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  category TEXT,
  brand TEXT,
  buyLink TEXT,
  imageUrls JSONB DEFAULT '[]',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Solución de Errores Comunes

#### Error 500 en /api/products
- Verifica que las variables de entorno de Supabase estén configuradas
- Asegúrate de que la tabla `products` exista en tu base de datos
- Revisa los logs de Vercel para más detalles

#### TypeError: t.map is not a function
- Este error se soluciona automáticamente con las mejoras implementadas
- La aplicación ahora maneja arrays vacíos correctamente

#### ReferenceError: Cannot access 'A' before initialization
- Este error se debe a problemas de inicialización de módulos
- Las mejoras implementadas previenen este error

## 🛠️ Desarrollo Local

1. Clona el repositorio
2. Instala las dependencias: `npm install`
3. Copia `env.example` a `.env.local` y configura las variables
4. Ejecuta el servidor de desarrollo: `npm run dev`

## 📱 Características

- ✅ Diseño completamente responsivo
- ✅ Soporte para múltiples imágenes por producto
- ✅ Filtrado por categorías
- ✅ Búsqueda de productos
- ✅ Paginación
- ✅ Lightbox para imágenes
- ✅ Panel de administración
- ✅ Carga masiva de productos
- ✅ Soporte para Supabase y SQLite

## 🔧 Tecnologías

- **Frontend**: Next.js, React, Tailwind CSS
- **Backend**: Next.js API Routes
- **Base de Datos**: Supabase (PostgreSQL) o SQLite
- **Despliegue**: Vercel
- **Imágenes**: Cloudinary (opcional)

## 📞 Soporte

Si encuentras algún problema, revisa los logs de Vercel y asegúrate de que todas las variables de entorno estén configuradas correctamente.
