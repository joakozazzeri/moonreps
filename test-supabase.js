// test-supabase.js
import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

// Cargar variables de entorno
dotenv.config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

console.log('Supabase URL:', supabaseUrl)
console.log('Supabase Key (first 20 chars):', supabaseKey ? supabaseKey.substring(0, 20) + '...' : 'NOT FOUND')

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase environment variables')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

async function testConnection() {
  try {
    console.log('Testing Supabase connection...')
    
    // Probar conexión básica
    const { data, error } = await supabase
      .from('products')
      .select('count')
      .limit(1)
    
    if (error) {
      console.error('Connection error:', error)
      return
    }
    
    console.log('✅ Connection successful!')
    
    // Probar inserción
    const testProduct = {
      name: 'Test Product',
      price: 99.99,
      category: 'Test',
      brand: 'Test Brand',
      buyLink: 'https://test.com',
      imageUrls: JSON.stringify(['https://test.com/image.jpg'])
    }
    
    console.log('Testing product insertion...')
    const { data: insertData, error: insertError } = await supabase
      .from('products')
      .insert([testProduct])
      .select()
      .single()
    
    if (insertError) {
      console.error('Insert error:', insertError)
      return
    }
    
    console.log('✅ Product insertion successful!')
    console.log('Inserted product:', insertData)
    
    // Limpiar producto de prueba
    const { error: deleteError } = await supabase
      .from('products')
      .delete()
      .eq('id', insertData.id)
    
    if (deleteError) {
      console.error('Delete error:', deleteError)
    } else {
      console.log('✅ Test product cleaned up')
    }
    
  } catch (error) {
    console.error('Test failed:', error)
  }
}

testConnection() 