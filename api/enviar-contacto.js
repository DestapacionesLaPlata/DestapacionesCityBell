// api/enviar-contacto.js
export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Manejar preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Solo aceptar POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  try {
    const { name, email, subject, message } = req.body;

    // Validación básica
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ 
        error: 'Todos los campos son obligatorios' 
      });
    }

    // Aquí se enviaría el email
    // Por ahora solo guardamos en consola
    console.log('Nueva consulta recibida:', {
      name,
      email,
      subject,
      message,
      fecha: new Date().toISOString()
    });

    // Respuesta exitosa
    return res.status(200).json({ 
      success: true,
      message: '¡Consulta enviada! Te contactaremos pronto.',
      data: { name, email }
    });

  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ 
      error: 'Error al procesar la solicitud',
      details: error.message 
    });
  }
}