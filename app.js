/* Angel Buddy — app.js */

const WRAP_UP = "Hemos cubierto lo esencial por ahora.\n\n¿Hay algo más sobre lo que quieras profundizar, o pasamos a otra área?";

const DEFAULT_INTRO = "¡Hola! Soy Angel Buddy, tu guía de negocio. 😊\n\n¿En qué área quieres trabajar hoy? Elige una tarjeta del menú o cuéntame tu situación directamente.";

// Conversation state
var flowState = { area: null, step: 0, done: false };
function resetFlow(area) { flowState = { area: area, step: 0, done: false }; }

// DOM refs — assigned after DOMContentLoaded
var modal, chatMessages, chatInput;
var chatReady = false;
var modalJustOpened = false;

function openChat(area) {
  modal.classList.add("open");
  modalJustOpened = true;
  setTimeout(function() { modalJustOpened = false; }, 0);
  chatInput.focus();
  if (!chatReady) {
    chatReady = true;
    if (area && FLOWS[area]) {
      resetFlow(area);
      appendMessage("bot", FLOWS[area].intro, 300);
    } else {
      resetFlow(null);
      appendMessage("bot", DEFAULT_INTRO, 300);
    }
  }
}

function closeChat() { modal.classList.remove("open"); }

function appendMessage(role, text, delay) {
  delay = delay || 0;
  setTimeout(function() {
    var msg = document.createElement("div");
    msg.className = "msg " + role;
    var bubble = document.createElement("div");
    bubble.className = "msg-bubble";
    bubble.innerHTML = text
      .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
      .replace(/\*([^*\n]+)\*/g, "<em>$1</em>")
      .replace(/---/g, "<hr style='border:none;border-top:1px solid rgba(0,0,0,.12);margin:8px 0'>")
      .replace(/\n/g, "<br>");
    if (role === "bot") {
      var av = document.createElement("div");
      av.className = "msg-avatar";
      av.textContent = "AB";
      msg.appendChild(av);
    }
    msg.appendChild(bubble);
    chatMessages.appendChild(msg);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }, delay);
}

// ── FLOWS ──────────────────────────────────────────────────
var FLOWS = {

  marketing: {
    intro: "¡Vamos a trabajar en tu marketing! 📣\n\nPara ayudarte bien necesito entender dónde estás. Dime una cosa: ¿ya tienes definido quién es tu cliente ideal, o todavía no has trabajado eso?",
    steps: [
      {
        branches: [
          {
            match: /s[ií]|tengo|definid|claro|sé|identificad/i,
            advice: "Perfecto, eso es la base de todo. 💡\n\n**Acción concreta:** Escribe esta frase y complétala: *\"Mi cliente ideal es [perfil] que tiene el problema de [problema] y busca [resultado].\"*\n\nSi puedes completarla en menos de 2 minutos, tu mensaje de marketing ya tiene dirección clara."
          },
          {
            match: /no|sin|todavía|aún|poco|más o menos|vago/i,
            advice: "Es el error más común, no te preocupes. 😊\n\n**Acción concreta:** Esta semana habla con 3 personas que creas que podrían ser tus clientes. Pregúntales solo esto: *\"¿Cuál es tu mayor frustración con [tu área de negocio]?\"*\n\nEsas respuestas literales valen más que cualquier estudio de mercado."
          },
          {
            match: /varios|depende|tipos|segmento|nicho/i,
            advice: "Tener varios perfiles de cliente es normal al principio, pero intentar hablarle a todos a la vez hace que no le llegues a nadie. 🎯\n\n**Acción concreta:** Elige al cliente con el que más disfrutas trabajar y que mejor paga. Ese es tu punto de partida. Luego puedes expandir, pero empieza por uno."
          }
        ],
        fallback: "Conocer a tu cliente es el cimiento de todo lo demás.\n\n**Acción concreta:** Describe a tu cliente ideal en un párrafo como si fuera una persona real: qué edad tiene, a qué se dedica, qué le preocupa al levantarse. Ese ejercicio cambia cómo comunicas.",
        next: "Bien. Segunda pregunta: ¿cómo llegas hoy a esos clientes? ¿Tienes algún canal que ya uses (redes sociales, boca a boca, eventos, publicidad…) o todavía estás buscando el camino?"
      },
      {
        branches: [
          {
            match: /redes|instagram|facebook|tiktok|linkedin|twitter|social/i,
            advice: "Las redes son un canal potente, pero solo si publicas con una estrategia. 📲\n\n**Acción concreta:** Elige **una sola red** donde esté concentrado tu cliente ideal y comprométete a publicar 3 veces por semana durante 30 días seguidos. Cada post debe responder una pregunta real de tu cliente.\n\nLa consistencia en un canal siempre supera estar presente en todos sin foco."
          },
          {
            match: /boca|referido|recomendacion|conocidos|amigos|red de contactos/i,
            advice: "El boca a boca es el canal con mayor tasa de conversión, pero tiene un defecto: es pasivo. 🗣️\n\n**Acción concreta:** Después de tu próxima venta o entrega, envía este mensaje: *\"Oye, si conoces a alguien que pueda necesitar algo así, me ayudaría mucho que me lo presentaras.\"*\n\nUn sistema activo de referidos puede duplicar tus clientes en 3 meses sin gastar en publicidad."
          },
          {
            match: /publicidad|anuncio|ads|google|meta|pauta|pago|inversión/i,
            advice: "La publicidad pagada es un acelerador, no un punto de partida. ⚠️\n\n**Acción concreta:** Antes de invertir un euro en ads, valida que tu mensaje funciona de forma orgánica: publica el mismo contenido gratis y mide la reacción. Cuando consigas 3 clientes sin pagar, ese mensaje ya merece inversión."
          },
          {
            match: /eventos|networking|ferias|charlas|conferencias/i,
            advice: "Los eventos son excelentes para construir relaciones, pero tienen baja escala. 🤝\n\n**Acción concreta:** El truco es el seguimiento: el 80% de las oportunidades de negocio en eventos se pierden porque nadie hace follow-up. Después de cada evento, envía un mensaje personalizado en las primeras 24 horas a cada contacto nuevo."
          },
          {
            match: /nada|no tengo|ninguno|probando|empezando|perdido/i,
            advice: "Estar en cero con canales tiene su ventaja: puedes elegir bien desde el principio. 🎯\n\n**Acción concreta:** Esta semana haz un solo ejercicio: identifica dónde pasa tiempo online tu cliente ideal (grupos de Facebook, Reddit, LinkedIn, foros…) y aparece ahí respondiendo preguntas, sin vender nada. Primero generas confianza, luego viene la venta."
          }
        ],
        fallback: "Sea cual sea tu canal, lo importante es medir. **Acción concreta:** Esta semana define una sola métrica que seguirás: alcance, clics, mensajes recibidos o ventas. Sin datos no puedes mejorar lo que no puedes ver.",
        next: "Vamos a la tercera parte del marketing: el mensaje. ¿Tienes claro qué te hace **diferente** de otras opciones que tiene tu cliente? ¿Podrías explicarlo en una sola frase?"
      },
      {
        branches: [
          {
            match: /s[ií]|tengo|claro|comunico|diferente|único/i,
            advice: "Tener un diferencial claro es lo que convierte visitantes en clientes. ✅\n\n**Acción concreta:** Ahora el reto es que ese diferencial esté en el **primer lugar** que la gente vea de ti: la bio de tu red social, el encabezado de tu web, la primera frase cuando te presentas.\n\nSi alguien llega a tu perfil y en 5 segundos no sabe qué te hace especial, ya lo perdiste."
          },
          {
            match: /no|poco|igual|todos hacen|competencia|difícil/i,
            advice: "Sin diferencial compites solo por precio, y eso es una carrera hacia abajo que nadie gana. 💡\n\n**Acción concreta:** Responde estas 3 preguntas esta semana:\n(1) ¿Qué hago que mis competidores no hacen o no hacen bien?\n(2) ¿A qué tipo de cliente sirvo mejor que nadie?\n(3) ¿Qué resultado concreto obtienen mis clientes?\n\nLa intersección de esas tres respuestas es tu diferencial real."
          },
          {
            match: /precio|barato|económico|mejor precio/i,
            advice: "El precio nunca es un diferencial sostenible: siempre habrá alguien dispuesto a cobrar menos. ⚠️\n\n**Acción concreta:** Identifica qué valora realmente tu cliente más allá del precio: rapidez, confianza, resultados garantizados, trato personalizado. Eso sí es un diferencial que nadie puede copiarte fácilmente."
          }
        ],
        fallback: "Trabajar el diferencial siempre vale la pena.\n\n**Acción concreta:** Pregunta esta semana a 3 clientes o conocidos: *\"¿Por qué me elegirías a mí en vez de a otro?\"* Sus palabras exactas son tu mejor copy de marketing.",
      }
    ]
  },

  finanzas: {
    intro: "¡Vamos con las finanzas! 💰 Este es el área donde ser honesto contigo mismo marca toda la diferencia.\n\nPrimera pregunta directa: ¿llevas actualmente algún registro de tus ingresos y gastos, aunque sea básico?",
    steps: [
      {
        branches: [
          {
            match: /s[ií]|llevo|tengo|excel|hoja|registro|app|sistema|contabilidad/i,
            advice: "Llevar registro ya te pone por delante del 70% de los emprendedores. Eso es mucho. 📊\n\n**Acción concreta:** El siguiente nivel es la separación: ¿tienes una cuenta bancaria exclusiva para el negocio, separada de la personal? Si no, ábrela esta semana.\n\nMezclar cuentas personales y de negocio es la causa número uno de caos financiero — y de pagar más impuestos de los necesarios."
          },
          {
            match: /no|nada|sin|nunca|poco|básico|informal/i,
            advice: "Sin registro no puedes saber si tu negocio realmente gana dinero o solo lo parece. ⚠️\n\n**Acción concreta:** Hoy mismo crea un archivo (Excel, Google Sheets, o incluso papel) con 3 columnas: **Fecha · Ingreso · Gasto**. Anota cada movimiento de dinero esta semana.\n\nCon solo 2 semanas de datos ya tendrás información para tomar mejores decisiones que el 80% de tus competidores."
          },
          {
            match: /gestor|asesor|contable|externalizado/i,
            advice: "Tener un gestor es un buen paso, pero ojo: el gestor ordena el pasado, tú tienes que gestionar el presente. 💼\n\n**Acción concreta:** Aunque tengas gestor, necesitas revisar tus números tú mismo cada semana. Dedica 15 minutos cada viernes a revisar lo que entró y salió. Así detectas problemas antes de que lleguen a tu gestor un mes después."
          }
        ],
        fallback: "El control financiero es el músculo más importante de un negocio sano.\n\n**Acción concreta:** Dedica 15 minutos cada viernes a revisar lo que entró y lo que salió esa semana. Ese solo hábito transforma la salud financiera de un negocio en 3 meses.",
        next: "Segunda pregunta clave: ¿sabes cuánto necesitas vender cada mes para cubrir todos tus costos fijos y llegar a tu **punto de equilibrio**?"
      },
      {
        branches: [
          {
            match: /s[ií]|sé|calculo|tengo|claro|aproximadamente|más o menos/i,
            advice: "Conocer tu punto de equilibrio es una ventaja enorme que poca gente tiene. ✅\n\n**Acción concreta:** Ve un paso más allá: ¿cuánto necesitas vender para pagarte a ti mismo un sueldo digno **por encima** del punto de equilibrio?\n\nMuchos emprendedores cubren los gastos del negocio pero se olvidan de que ellos también son un coste. Pon tu sueldo como línea roja antes de cualquier otra decisión."
          },
          {
            match: /no|idea|cómo|ni idea|nunca|calculado/i,
            advice: "Es más sencillo de lo que parece, te lo explico. 💡\n\n**Fórmula del punto de equilibrio:**\n1. Suma todos tus gastos fijos del mes (alquiler, suscripciones, servicios, etc.)\n2. Divide esa cifra entre el precio promedio de lo que vendes\n3. El resultado es el número de ventas que necesitas para no perder dinero\n\n**Ejemplo:** Si tus fijos son 800€ y cobras 200€ por servicio → necesitas 4 ventas al mes mínimo.\n\n¿Tienes esos datos a mano para calcularlo?"
          },
          {
            match: /varía|variable|depende|irregular|temporada/i,
            advice: "Los ingresos variables son normales en muchos negocios, pero hacen más importante aún tener un punto de referencia. 📈\n\n**Acción concreta:** Calcula tu punto de equilibrio basándote en el mes más flojo del año. Si en ese mes cubres gastos, los buenos meses son ganancia real. Si no, tienes un problema de estructura que hay que resolver."
          }
        ],
        fallback: "El punto de equilibrio es tu número mágico mensual: sin conocerlo, operas a ciegas.\n\n**Acción concreta:** Esta semana dedica 30 minutos a calcularlo. Suma gastos fijos, divide entre tu precio promedio. Ese número es tu meta mínima de ventas cada mes.",
        next: "Tercera pregunta: ¿tienes una reserva de emergencia para el negocio? Es decir, si un mes o dos va mal, ¿puedes seguir pagando los gastos fijos sin entrar en pánico?"
      },
      {
        branches: [
          {
            match: /s[ií]|tengo|reserva|ahorro|guardado|colchón/i,
            advice: "Tener reserva es lo que separa un negocio frágil de uno resiliente. 🛡️\n\n**Acción concreta:** Si ya tienes reserva, el siguiente nivel es calcular exactamente cuántos meses de gastos fijos cubre. La meta ideal para un negocio pequeño son **3 meses**. Si estás en 1, sube a 2. Si estás en 2, sube a 3.\n\nEsa reserva también te da algo que no tiene precio: la libertad de decir no a clientes que no encajan."
          },
          {
            match: /no|nada|sin|justo|al límite|mes a mes|apurado/i,
            advice: "Este es el riesgo silencioso que cierra más negocios que la competencia o la economía. ⚠️\n\n**Acción concreta:** Empieza hoy mismo con el sistema del 10%: cada vez que recibas un pago, transfiere el 10% a una cuenta separada que no toques.\n\nNo hace falta que sea mucho al principio. Lo que importa es instalar el hábito. En 6 meses tendrás un colchón real que cambiará cómo tomas decisiones."
          },
          {
            match: /poco|algo|empezando|pequeña|poquito/i,
            advice: "Tener algo es mucho mejor que nada, y puedes construir desde ahí. 💪\n\n**Acción concreta:** Calcula cuántos meses de gastos fijos cubre lo que tienes. Si es menos de 1 mes, haz del ahorro tu prioridad número uno este trimestre antes que cualquier otra inversión en el negocio."
          }
        ],
        fallback: "La reserva financiera es el seguro de vida de tu negocio.\n\n**Acción concreta:** Abre una cuenta de ahorro exclusiva para el negocio y transfiere el 10% de cada cobro. Automatízalo si puedes. En 6 meses tendrás un colchón que cambiará cómo operas."
      }
    ]
  },

  ventas: {
    intro: "¡Vamos a mejorar tus ventas! 🤝\n\nAntes de darte un consejo necesito saber en qué punto estás. ¿Ya tienes clientes que te compran regularmente, o todavía estás buscando los primeros?",
    steps: [
      {
        branches: [
          {
            match: /s[ií]|tengo|clientes|compran|vendo|ya|varios|regulares/i,
            advice: "Tener clientes reales es el mejor punto de partida posible. 🎉\n\n**Acción concreta:** Esta semana contacta a tus 3 mejores clientes y hazles esta sola pregunta: *\"¿Qué fue lo que más valoraste de trabajar conmigo?\"*\n\nEsas respuestas textuales te dirán exactamente qué palabras usar para atraer más clientes como ellos. Es la técnica de copywriting más efectiva y la más ignorada."
          },
          {
            match: /no|ninguno|primero|buscando|empezando|todavía|cero/i,
            advice: "Conseguir el primer cliente es el hito más importante, y tiene su técnica. 🎯\n\n**Acción concreta:** No intentes llegar a todo el mundo. Haz esta lista ahora mismo: escribe 10 personas concretas que conozcas y que podrían necesitar lo que ofreces. Luego escríbeles un mensaje MUY personalizado (no masivo) explicando específicamente cómo puedes ayudarles a ellos.\n\nLa venta directa y personalizada tiene la tasa de conversión más alta de todos los canales."
          },
          {
            match: /pocos|irregulares|esporádico|a veces|alguno/i,
            advice: "Los clientes esporádicos son una señal: tienes producto, pero te falta sistema. 📋\n\n**Acción concreta:** Esta semana define tu proceso de venta por escrito: ¿cómo te encuentra alguien? ¿Qué pasa después del primer contacto? ¿Cómo cierras? ¿Qué pasa post-venta?\n\nEscribirlo te dará claridad sobre dónde se rompe el flujo y dónde perdes clientes potenciales."
          }
        ],
        fallback: "Cada etapa de ventas tiene su propio reto.\n\n**Acción concreta:** Esta semana dedica 30 minutos a mapear tu proceso de venta actual de principio a fin. Escríbelo en papel. Los puntos donde el proceso se vuelve vago son donde pierdes ventas.",
        next: "Segunda pregunta: ¿en qué momento del proceso de venta sientes que se te escapan más oportunidades? ¿Capatando la atención, generando confianza, o cerrando cuando ya hay interés real?"
      },
      {
        branches: [
          {
            match: /captar|atención|llegar|visibilidad|que me conozcan|encuentren/i,
            advice: "Si el problema es que no te conocen, el trabajo está en la parte superior del embudo. 📣\n\n**Acción concreta:** Define UN solo canal de captación esta semana y aparece ahí con constancia. Publica algo que resuelva una duda real de tu cliente, sin pedir nada a cambio.\n\nRegla de oro: da valor 3 veces antes de pedir una compra. La gente compra a quien le ha ayudado antes."
          },
          {
            match: /confianza|credibilidad|dudan|no me conocen|referencias|reputación/i,
            advice: "La confianza es la moneda más valiosa en ventas, y se construye antes de la primera conversación. 🤝\n\n**Acción concreta:** Esta semana consigue y publica al menos 2 testimonios reales de personas que se hayan beneficiado de tu trabajo, aunque no hayan pagado.\n\nDato que importa: el 88% de las personas confía en reseñas de desconocidos tanto como en recomendaciones de amigos."
          },
          {
            match: /cerrar|cierre|decidirse|convencer|precio|caro|objeciones/i,
            advice: "El problema de cierre casi nunca está en el cierre: está en que el cliente no tiene claro el valor antes de llegar ahí. 💡\n\n**Técnica concreta para tu próxima venta:** Antes de mencionar el precio, haz esta pregunta: *\"¿Qué pasaría en tu negocio si no resuelves esto en los próximos 3 meses?\"*\n\nDeja que el cliente articule el coste del problema. Cuando lo hace, el precio de tu solución se vuelve pequeño en comparación."
          },
          {
            match: /seguimiento|follow.?up|no responden|quedan en silencio|olvidados/i,
            advice: "El 80% de las ventas se cierran después del 5º contacto, pero el 90% de los vendedores se rinden en el 2º. La perseverancia educada es tu ventaja. 📬\n\n**Acción concreta:** Crea una secuencia de seguimiento de 5 pasos: contacto inicial, valor añadido (artículo útil), check-in, oferta concreta, cierre definitivo. Espacia cada paso 3-5 días."
          }
        ],
        fallback: "El proceso de venta tiene tres momentos críticos: atención, confianza y decisión.\n\n**Acción concreta:** Habla con alguien que haya considerado comprarte pero no lo hizo y pregúntale honestamente por qué. Esa conversación vale más que cualquier libro de ventas.",
        next: "Última parte: el precio. ¿Cobras con confianza lo que vale tu trabajo, o a veces tienes la sensación de que estás cobrando demasiado — o demasiado poco?"
      },
      {
        branches: [
          {
            match: /confianza|seguro|bien|correcto|justo|cómodo/i,
            advice: "Tener claridad en el precio es señal de que entiendes el valor que generas. 💪\n\n**Acción concreta:** El siguiente nivel es el precio basado en valor, no en tiempo. En lugar de cobrar por hora o por entregable, cobra por el resultado que consigue el cliente.\n\n¿Cuánto vale para tu cliente resolver el problema que tú resuelves? Tu precio debería ser una fracción de eso."
          },
          {
            match: /poco|bajo|cobro menos|infravalorado|barato|debo subir/i,
            advice: "Cobrar poco no atrae más clientes: atrae peores clientes y te agota. ⚠️\n\n**Acción concreta:** Sube tu precio un 20% en la próxima propuesta que presentes. Observa la reacción. Si nadie objeta el precio, es que aún tienes margen para subir más. Si todos objetan, entonces el problema es el valor percibido, no el precio en sí."
          },
          {
            match: /mucho|caro|no me compran|precio alto|competencia cobra menos/i,
            advice: "Si el precio parece alto, casi siempre el problema real es que el valor no está bien comunicado. 💡\n\n**Acción concreta:** Revisa cómo presentas tu precio. ¿Lo mencionas con contexto del resultado que consigue el cliente, o simplemente dices el número? Prueba a presentarlo así: *\"Por [precio] consigues [resultado concreto en tiempo concreto].\"* El mismo precio, comunicado diferente, se percibe completamente distinto."
          }
        ],
        fallback: "El precio refleja el valor que percibes de tu propio trabajo.\n\n**Acción concreta:** Investiga esta semana qué cobran 3 competidores directos por algo similar. Pon tu precio en contexto. Si lo que ofreces es mejor, cobra más y justifícalo con resultados."
      }
    ]
  },

  operaciones: {
    intro: "¡Vamos con operaciones! ⚙️ Este es el área que más tiempo libera cuando se trabaja bien.\n\nSer directo: ¿cuál es la tarea o proceso que más tiempo te consume cada semana y que sientes que podría hacerse mejor?",
    steps: [
      {
        branches: [
          {
            match: /admin|factura|papeleo|burocracia|formularios|gestión|contabilidad/i,
            advice: "Las tareas administrativas son el ladrón de tiempo número uno de los emprendedores. 🕳️\n\n**Acción concreta:** Esta semana dedica 30 minutos a listar TODAS las tareas admin que haces. Luego clasifícalas en tres columnas: *Automatizable* / *Delegable* / *Solo yo puedo hacerlo*.\n\nHerramientas gratuitas para empezar: Wave (facturación), Calendly (citas), Zapier free (automatizaciones básicas). Con 3 automatizaciones recuperas 3-4 horas por semana."
          },
          {
            match: /clientes|responder|mensajes|soporte|whatsapp|email|comunicación/i,
            advice: "La atención al cliente sin sistema te consume porque siempre es reactiva: esperas que llegue el problema para actuar. 📬\n\n**Acción concreta en dos pasos:**\n1. Crea una carpeta con respuestas a las 10 preguntas que más te hacen. Copy-paste personalizado = 30 segundos en vez de 10 minutos.\n2. Define y comunica un horario fijo de atención. *\"Respondo de lunes a viernes de 9 a 18h.\"* Los límites claros reducen el estrés y, paradójicamente, aumentan la satisfacción del cliente."
          },
          {
            match: /producción|fabricar|crear|entregar|logística|envíos|servicio/i,
            advice: "Los cuellos de botella en producción o entrega casi siempre se resuelven con dos cosas: procesos escritos y tiempos cronometrados. 📋\n\n**Acción concreta:** La próxima vez que hagas tu proceso principal, cronometra cada paso. Cuando lo mides, inmediatamente ves qué pasos son innecesarios o pueden hacerse más rápido. Lo que se mide, se mejora."
          },
          {
            match: /reuniones|calls|videollamadas|juntas|tiempo perdido/i,
            advice: "Las reuniones sin estructura son el tiempo más caro de cualquier negocio. ⏱️\n\n**Acción concreta:** Implementa la regla de las 3 preguntas para cada reunión antes de agendarla: ¿Cuál es el objetivo? ¿Qué decisión se tomará? ¿Podría resolverse con un mensaje?\n\nSi no hay respuesta clara a las tres, la reunión no debería existir."
          }
        ],
        fallback: "Identificar el cuello de botella correcto es el primer paso para mejorar operaciones.\n\n**Acción concreta:** Esta semana durante 3 días apunta en tiempo real cuánto dedicas a cada tipo de tarea. Al final verás con datos dónde se va realmente el tiempo — casi siempre es diferente a lo que creemos.",
        next: "Segunda pregunta importante: ¿tienes documentado en algún lugar cómo haces las cosas en tu negocio, o todo el conocimiento está solo en tu cabeza?"
      },
      {
        branches: [
          {
            match: /s[ií]|tengo|documentado|escrito|manual|proceso|wiki|procedimiento/i,
            advice: "Tener procesos documentados es lo que convierte un trabajo en un sistema escalable. ✅\n\n**Acción concreta:** El siguiente nivel es convertir tus documentos en checklists operativos: listas de verificación que alguien pueda seguir sin necesitar tu supervisión.\n\nEmpieza por el proceso más repetido de tu negocio. Un checklist de 7 pasos bien hecho puede reemplazar 30 minutos de explicaciones."
          },
          {
            match: /no|cabeza|nada|mental|solo yo|sin documentar|improvisado/i,
            advice: "Si todo el conocimiento de cómo funciona tu negocio está en tu cabeza, tú eres el mayor riesgo para tu propio negocio. ⚠️\n\n**Acción concreta de esta semana:** Elige el proceso que más repites y grábate en vídeo haciéndolo, o escribe los pasos mientras lo ejecutas. No tiene que ser perfecto.\n\nEse vídeo o documento es el primer ladrillo de un negocio que puede funcionar sin que tú estés presente en cada detalle."
          },
          {
            match: /algo|parcial|básico|poco|algunos/i,
            advice: "Tener algo documentado es mucho mejor que nada. 👍\n\n**Acción concreta:** Identifica el proceso más crítico que aún NO está documentado (el que más daño causaría si fallas o si tienes que delegar de urgencia) y escríbelo esta semana. Los procesos críticos primero."
          }
        ],
        fallback: "La documentación es lo que transforma un trabajo en un sistema.\n\n**Acción concreta:** Dedica 1 hora esta semana a escribir los pasos de tus 3 procesos más importantes. No tiene que ser perfecto, con que alguien más pudiera entenderlo es suficiente para empezar.",
        next: "Tercera pregunta: ¿usas alguna herramienta para gestionar tareas y proyectos, o todavía lo llevas por memoria, notas en papel o hilos de WhatsApp?"
      },
      {
        branches: [
          {
            match: /s[ií]|uso|trello|notion|asana|monday|clickup|jira|herramienta|app|sistema/i,
            advice: "Tener una herramienta de gestión ya te pone en ventaja. 🛠️\n\n**Acción concreta:** El mayor error con las herramientas es usarlas a medias. Para que funcionen necesitan el 100% de las tareas dentro — nada en la cabeza, nada en WhatsApp, nada en papeles.\n\nEsta semana haz un volcado total: mete absolutamente todo lo pendiente en la herramienta. Ese solo ejercicio te dará más claridad mental de la que imaginas."
          },
          {
            match: /no|nada|memoria|papel|whatsapp|email|sin|cuaderno/i,
            advice: "Gestionar sin herramienta funciona mientras el negocio es pequeño, pero llega un punto donde la carga mental te limita más que los recursos. 😓\n\n**Acción concreta:** Empieza con **Trello** (gratis, muy simple). Esta semana dedica 30 minutos a crear 3 columnas: *Por hacer / En progreso / Listo*. Mueve TODAS tus tareas pendientes ahí.\n\nEse único ejercicio te dará una visión clara de todo lo que tienes entre manos y reducirá tu estrés inmediatamente."
          },
          {
            match: /varios|demasiados|cambio|pruebo|diferentes/i,
            advice: "Cambiar de herramienta constantemente es peor que no tener ninguna: pierdes tiempo en la transición y nunca aprovechas el sistema. 🔄\n\n**Acción concreta:** Elige UNA herramienta y comprométete con ella durante 90 días, sin cambiar. El problema casi nunca es la herramienta, sino el hábito de usarla. Después de 90 días puedes evaluar si realmente necesitas cambiar."
          }
        ],
        fallback: "La mejor herramienta de gestión es la que usas de verdad.\n\n**Acción concreta:** Elige la más simple que cubra tus necesidades y úsala durante 90 días sin cambiar. La consistencia con una herramienta básica siempre supera el cambio constante entre herramientas sofisticadas."
      }
    ]
  },

  personas: {
    intro: "¡Vamos con personas y equipo! 👥 Este área tiene un impacto enorme en cómo disfrutas tu negocio día a día.\n\nPara empezar bien: ¿trabajas solo actualmente, tienes colaboradores externos o freelancers, o ya tienes personas contratadas en tu equipo?",
    steps: [
      {
        branches: [
          {
            match: /solo|sola|yo solo|por mi cuenta|sin equipo|únicamente yo/i,
            advice: "Trabajar solo tiene sus ventajas — velocidad, control, sin conflictos — pero también tiene un techo claro. 🙋\n\n**Dos acciones concretas:**\n1. **Para el corto plazo:** Identifica las 2 tareas que más odias o en las que eres claramente peor que otros. Esas son las primeras para delegar cuando llegue el momento.\n2. **Para el presente:** Busca un *socio informal* — un emprendedor de confianza con quien reunirte una vez al mes para contaros retos mutuos. La soledad es el mayor enemigo del emprendedor en solitario y tiene solución."
          },
          {
            match: /freelance|colaborador|externo|proyecto|autónomo|esporádico/i,
            advice: "Trabajar con freelancers es un modelo muy eficiente, pero requiere una gestión diferente a la de empleados. 🤝\n\n**Acción concreta:** Para cada colaborador externo, crea un documento de una página con: qué entrega exactamente, en qué formato, cuándo, y cuál es el criterio de calidad.\n\nEl 80% de los malentendidos con freelancers vienen de expectativas no escritas. Un briefing claro al inicio evita conversaciones incómodas al final."
          },
          {
            match: /empleado|contratado|nómina|plantilla|equipo|trabajadores|staff/i,
            advice: "Tener empleados multiplica tu capacidad pero también tu responsabilidad como líder. 📈\n\n**Acción concreta:** Haz esta revisión esta semana: ¿cada persona de tu equipo sabe exactamente qué se espera de ella en los próximos 30 días y cómo sabrá que lo está haciendo bien?\n\nSin esa claridad, la gente trabaja con ansiedad aunque tenga buena voluntad. La ambigüedad en los objetivos es la causa número uno de bajo rendimiento en equipos pequeños."
          }
        ],
        fallback: "La gestión de personas empieza por entender qué necesitas y cuándo.\n\n**Acción concreta:** Haz una lista de las tareas que haces tú pero no deberías: las que no son tu punto fuerte, las que no te gustan, o las que un tercero podría hacer igual o mejor. Esa lista define a quién necesitas incorporar primero.",
        next: "Segunda pregunta: ¿tienes pensado incorporar a alguien nuevo en los próximos 6 meses? ¿O más bien estás en modo consolidación del equipo actual?"
      },
      {
        branches: [
          {
            match: /s[ií]|quiero|pienso|plan|pronto|necesito|busco|contratar/i,
            advice: "Contratar bien es una de las decisiones más importantes de un negocio pequeño: una mala contratación puede costarte 3 meses de trabajo y mucho estrés. 🎯\n\n**Acción concreta antes de publicar ninguna oferta:**\nResponde estas 4 preguntas por escrito:\n1. ¿Qué problema concreto resuelve esta persona?\n2. ¿Qué habrá entregado en sus primeros 90 días?\n3. ¿Qué 3 habilidades son no-negociables?\n4. ¿Qué tipo de personalidad encaja con tu forma de trabajar?\n\nEse documento filtra el 90% de los candidatos que no encajan antes de la primera entrevista."
          },
          {
            match: /no|todavía|sin plan|lejos|futuro|consolidar|estable/i,
            advice: "La fase de consolidación es tan importante como la de crecimiento. 🔧\n\n**Acción concreta:** Aprovecha este período para construir los cimientos que harán más fácil contratar cuando llegue el momento: documenta procesos, define cultura, clarifica objetivos.\n\nAdemás, empieza a construir tu reputación como empleador ahora — comparte cómo trabajas en redes sociales. Cuando necesites contratar, los candidatos ya te conocerán."
          },
          {
            match: /quizás|depende|lo pienso|no sé|incertidumbre/i,
            advice: "La incertidumbre sobre cuándo contratar es muy normal. Hay una forma objetiva de saberlo. 💡\n\n**Acción concreta:** Define el número que justifica contratar. Por ejemplo: *\"Cuando facture X al mes de forma estable durante 3 meses consecutivos, contrato a alguien.\"*\n\nTener ese número claro convierte una decisión emocional en una decisión basada en datos."
          }
        ],
        fallback: "El ritmo de crecimiento del equipo debe seguir al del negocio, no ir por delante ni muy por detrás.\n\n**Acción concreta:** Define el número de facturación que justificaría incorporar a la siguiente persona. Ese número objetivo te ayudará a decidir sin dudas cuando llegue el momento.",
        next: "Última pregunta, y es importante: ¿tienes una forma de dar y recibir feedback con las personas con las que trabajas? ¿Esas conversaciones te resultan naturales o las evitas?"
      },
      {
        branches: [
          {
            match: /s[ií]|doy|hablo|reunión|feedback|natural|fácil|bien|fluye/i,
            advice: "Dar feedback bien es una de las habilidades de liderazgo más valiosas y más escasas. 💬\n\n**Acción concreta para subir el nivel:** Implementa una revisión rápida semanal de 15 minutos con cada colaborador cercano. Solo tres preguntas:\n1. ¿Qué fue bien esta semana?\n2. ¿Qué podría hacerse mejor?\n3. ¿Qué necesitas de mí para la próxima semana?\n\nEsa rutina corta construye confianza, detecta problemas antes de que exploten, y hace que la gente se sienta vista."
          },
          {
            match: /no|difícil|cuesta|evito|incómodo|tenso|raro|mal/i,
            advice: "Evitar el feedback es comprensible — nadie quiere crear tensión — pero es de las cosas más caras que puede hacer un líder. ⚠️\n\n**Técnica concreta para la próxima conversación difícil:**\nEn lugar de evaluar, pregunta: *\"He observado [situación concreta]. ¿Qué crees que pasó y cómo lo harías de forma diferente?\"*\n\nEste formato convierte una conversación de juicio en una conversación de desarrollo. La diferencia en cómo lo recibe el otro es enorme."
          },
          {
            match: /solo|solo yo|recibo|ellos no dan|unidireccional/i,
            advice: "El feedback bidireccional es lo que construye equipos de verdad: no solo tú a ellos, sino también ellos a ti. 🔄\n\n**Acción concreta:** Esta semana pregúntale a alguien de tu equipo o a un colaborador cercano: *\"¿Hay algo que yo pueda hacer de forma diferente para que sea más fácil trabajar conmigo?\"*\n\nEsa pregunta requiere humildad, pero transforma la dinámica del equipo de forma inmediata."
          }
        ],
        fallback: "El feedback regular es lo que hace crecer tanto a las personas como a los equipos.\n\n**Acción concreta:** Agenda esta semana aunque sean 10 minutos con alguien de tu equipo para preguntarle: ¿Qué necesitas para trabajar mejor? Esa sola pregunta puede cambiar la dinámica del equipo."
      }
    ]
  }

};

// ── RESPONSE ENGINE ────────────────────────────────────────
function respondInFlow(userText) {
  var flow = FLOWS[flowState.area];
  if (!flow || flowState.done) return respondFreeform(userText);
  var step = flow.steps[flowState.step];
  var advice = step.fallback;
  for (var i = 0; i < step.branches.length; i++) {
    if (step.branches[i].match.test(userText)) { advice = step.branches[i].advice; break; }
  }
  var isLast = flowState.step >= flow.steps.length - 1;
  if (isLast) { flowState.done = true; return advice + "\n\n---\n\n" + WRAP_UP; }
  var nextQ = step.next;
  flowState.step++;
  return advice + "\n\n" + nextQ;
}

function respondFreeform(t) {
  var l = t.toLowerCase();
  if (/marketing|clientes|redes|publicidad|marca/.test(l))
    return "El marketing efectivo empieza por conocer bien a tu cliente. 📣\n\nPulsa la tarjeta de **Marketing** en el menú y te guío paso a paso.";
  if (/finanz|dinero|ingresos|gastos|contabilidad|cuenta/.test(l))
    return "Las finanzas son el corazón del negocio. 💰\n\nPulsa la tarjeta de **Finanzas** para trabajarlo en profundidad.";
  if (/venta|vender|precio|comercial|cliente|compra/.test(l))
    return "Las ventas tienen su propio ritmo y proceso. 🤝\n\nPulsa la tarjeta de **Ventas** y trabajamos en ello juntos.";
  if (/operacion|proceso|tiempo|automatiz|eficiencia|tarea/.test(l))
    return "Las operaciones eficientes liberan tiempo para crecer. ⚙️\n\nPulsa la tarjeta de **Operaciones** para empezar.";
  if (/equipo|empleado|contratar|personas|rrhh|freelance|colabor/.test(l))
    return "El equipo lo cambia todo. 👥\n\nPulsa la tarjeta de **Personas & RRHH** para trabajar en eso.";
  return "Gracias por contarme eso. 😊\n\nPara darte el consejo más útil, cuéntame un poco más: ¿a qué se dedica tu negocio y cuál es tu mayor reto ahora mismo?";
}

function handleSend() {
  var text = chatInput.value.trim();
  if (!text) return;
  appendMessage("user", text);
  chatInput.value = "";
  var reply = flowState.area ? respondInFlow(text) : respondFreeform(text);
  appendMessage("bot", reply, 700);
}

// ── INIT ───────────────────────────────────────────────────
document.addEventListener("DOMContentLoaded", function() {
  modal        = document.getElementById("modal");
  chatMessages = document.getElementById("chat-messages");
  chatInput    = document.getElementById("chat-input");

  document.querySelectorAll(".area-card").forEach(function(card) {
    card.addEventListener("click", function() {
      document.querySelectorAll(".area-card").forEach(function(c) { c.classList.remove("active"); });
      card.classList.add("active");
      chatReady = false;
      chatMessages.innerHTML = "";
      openChat(card.dataset.area);
    });
  });

  document.getElementById("btn-start").addEventListener("click", function() { openChat(null); });
  document.getElementById("btn-chat").addEventListener("click",  function() { openChat(null); });
  document.getElementById("btn-explore").addEventListener("click", function() {
    document.getElementById("feed").scrollIntoView({ behavior: "smooth" });
  });
  document.getElementById("modal-close").addEventListener("click", closeChat);
  document.getElementById("modal").addEventListener("click", function(e) {
    if (!modalJustOpened && e.target === document.getElementById("modal")) closeChat();
  });
  document.getElementById("btn-send").addEventListener("click", handleSend);
  chatInput.addEventListener("keydown", function(e) { if (e.key === "Enter") handleSend(); });
});
