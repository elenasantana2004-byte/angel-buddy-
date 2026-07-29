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

// ── RESOURCES HUB ──────────────────────────────────────────
var RESOURCES = [

  // ── PRENSA & REVISTAS ────────────────────────────────────
  { cat:"prensa", emoji:"📰", name:"Expansión",        lang:"es", free:true,
    desc:"El diario de referencia para economía y empresa en España. Imprescindible para seguir mercados, estrategia empresarial y noticias de pymes.",
    url:"https://www.expansion.com" },
  { cat:"prensa", emoji:"📰", name:"El Economista",     lang:"es", free:true,
    desc:"Cobertura diaria de economía, startups y empresas españolas. Muy útil para seguir el ecosistema emprendedor nacional.",
    url:"https://www.eleconomista.es" },
  { cat:"prensa", emoji:"📰", name:"Emprendedores",     lang:"es", free:true,
    desc:"La revista española especializada en emprendimiento por excelencia. Casos de éxito, guías prácticas y tendencias del ecosistema pyme.",
    url:"https://www.emprendedores.es" },
  { cat:"prensa", emoji:"📰", name:"Harvard Business Review",  lang:"en", free:false,
    desc:"La publicación académica más influyente del mundo en gestión empresarial. Sus artículos son densos pero de altísima calidad sobre liderazgo, estrategia y management.",
    url:"https://hbr.org" },
  { cat:"prensa", emoji:"📰", name:"Forbes",            lang:"en", free:true,
    desc:"Referencia global para emprendedores y empresarios. Listas de empresas, perfiles de fundadores y tendencias de negocio internacionales.",
    url:"https://www.forbes.com" },
  { cat:"prensa", emoji:"📰", name:"Inc. Magazine",     lang:"en", free:true,
    desc:"Centrada en startups y empresas en crecimiento. Muy práctica: tácticas reales de fundadores que ya han pasado por lo que tú estás viviendo.",
    url:"https://www.inc.com" },
  { cat:"prensa", emoji:"📰", name:"Fast Company",      lang:"en", free:true,
    desc:"Innovación, tecnología y negocios creativos. Ideal para emprendedores que quieren entender las tendencias antes de que sean mainstream.",
    url:"https://www.fastcompany.com" },
  { cat:"prensa", emoji:"📰", name:"TechCrunch",        lang:"en", free:true,
    desc:"El medio de referencia para startups tecnológicas, rondas de inversión y análisis del ecosistema global de venture capital.",
    url:"https://techcrunch.com" },
  { cat:"prensa", emoji:"📰", name:"MIT Technology Review", lang:"en", free:false,
    desc:"La mejor fuente para entender cómo la tecnología (IA, biotech, energía) va a transformar los negocios. Rigor técnico sin perder accesibilidad.",
    url:"https://www.technologyreview.com" },

  // ── BLOGS & NEWSLETTERS ──────────────────────────────────
  { cat:"blogs", emoji:"✉️", name:"Startupeable",       lang:"es", free:true,
    desc:"La newsletter de referencia del ecosistema startup latinoamericano y español. Análisis semanales de modelos de negocio y rondas de financiación.",
    url:"https://startupeable.com" },
  { cat:"blogs", emoji:"✉️", name:"Finanzas para Mortales", lang:"es", free:true,
    desc:"Finanzas personales y empresariales explicadas sin jerga. Ideal para emprendedores que quieren entender los números de su negocio.",
    url:"https://finanzasparamortales.es" },
  { cat:"blogs", emoji:"✉️", name:"Marketing de Guerrilla", lang:"es", free:true,
    desc:"Blog veterano del marketing digital en español. Práctico, directo y actualizado con tácticas que funcionan para negocios pequeños.",
    url:"https://www.marketingdeguerrilla.es" },
  { cat:"blogs", emoji:"✉️", name:"Paul Graham Essays",  lang:"en", free:true,
    desc:"El cofundador de Y Combinator escribe ensayos que han cambiado la forma de pensar el emprendimiento. Cada uno es una clase magistral.",
    url:"https://paulgraham.com/articles.html" },
  { cat:"blogs", emoji:"✉️", name:"Seth Godin's Blog",  lang:"en", free:true,
    desc:"El gurú del marketing publica todos los días. Posts cortos pero densos en ideas sobre liderazgo, marketing y cómo crear algo que importe.",
    url:"https://seths.blog" },
  { cat:"blogs", emoji:"✉️", name:"The Hustle",         lang:"en", free:true,
    desc:"Newsletter diaria de negocios y tecnología con un estilo fresco y sin la solemnidad de los medios tradicionales. Muy recomendable para desayunar.",
    url:"https://thehustle.co" },
  { cat:"blogs", emoji:"✉️", name:"Morning Brew",       lang:"en", free:true,
    desc:"El boletín de negocios más leído de EEUU. Económica y empresarialmente relevante, con un tono ligero que hace amena la actualidad.",
    url:"https://www.morningbrew.com" },
  { cat:"blogs", emoji:"✉️", name:"Stratechery",        lang:"en", free:false,
    desc:"Ben Thompson analiza estrategia de negocios tecnológicos con una profundidad que no encontrarás en ningún otro lugar. Vale cada euro de la suscripción.",
    url:"https://stratechery.com" },
  { cat:"blogs", emoji:"✉️", name:"Lenny's Newsletter", lang:"en", free:true,
    desc:"La newsletter más seguida sobre product management, growth y startups. Casos prácticos de cómo construyen sus productos las mejores empresas.",
    url:"https://www.lennysnewsletter.com" },
  { cat:"blogs", emoji:"✉️", name:"Not Boring",         lang:"en", free:true,
    desc:"Packy McCormick analiza startups, modelos de negocio y tecnología con profundidad y humor. Una de las newsletters más originales del ecosistema.",
    url:"https://www.notboring.co" },

  // ── PODCASTS ─────────────────────────────────────────────
  { cat:"podcasts", emoji:"🎙️", name:"Mentores Hoy",    lang:"es", free:true,
    desc:"Entrevistas a emprendedores y directivos españoles. Muy útil para escuchar historias reales del ecosistema empresarial nacional.",
    url:"https://open.spotify.com/show/mentoreshoy" },
  { cat:"podcasts", emoji:"🎙️", name:"Libros para Emprendedores", lang:"es", free:true,
    desc:"Luis Ramos resume los mejores libros de negocios en formato audio. Perfecto para emprendedores que quieren aprender sin tiempo para leer.",
    url:"https://librosparaemprendedores.net" },
  { cat:"podcasts", emoji:"🎙️", name:"Negocio y Nada Más", lang:"es", free:true,
    desc:"El podcast más directo sobre estrategia de negocio en español. Sin rodeos, solo tácticas y conceptos aplicables desde el día siguiente.",
    url:"https://www.ivoox.com/podcast-negocio-nada-mas" },
  { cat:"podcasts", emoji:"🎙️", name:"How I Built This", lang:"en", free:true,
    desc:"Guy Raz entrevista a los fundadores de las empresas más grandes del mundo. Las historias son honestas, incluyen los fracasos, y son tremendamente inspiradoras.",
    url:"https://www.npr.org/podcasts/510313/how-i-built-this" },
  { cat:"podcasts", emoji:"🎙️", name:"Masters of Scale", lang:"en", free:true,
    desc:"Reid Hoffman (fundador de LinkedIn) entrevista a fundadores sobre cómo escalar empresas. Teorías contraintuitivas sobre crecimiento y estrategia.",
    url:"https://mastersofscale.com" },
  { cat:"podcasts", emoji:"🎙️", name:"My First Million",lang:"en", free:true,
    desc:"Sam Parr y Shaan Puri generan ideas de negocio en tiempo real. Muy entretenido y lleno de conceptos de monetización y validación.",
    url:"https://www.mfmpod.com" },
  { cat:"podcasts", emoji:"🎙️", name:"The Tim Ferriss Show", lang:"en", free:true,
    desc:"Entrevistas largas a los mejores del mundo en negocios, deportes y ciencia. Siempre hay táctica accionable que puedes aplicar en tu negocio.",
    url:"https://tim.blog/podcast" },
  { cat:"podcasts", emoji:"🎙️", name:"Acquired",        lang:"en", free:true,
    desc:"Análisis en profundidad de las empresas más importantes del mundo (Apple, NVIDIA, Berkshire...). Cada episodio es una clase de estrategia empresarial.",
    url:"https://www.acquired.fm" },
  { cat:"podcasts", emoji:"🎙️", name:"Lex Fridman Podcast", lang:"en", free:true,
    desc:"Conversaciones largas con los mejores científicos, tecnólogos y emprendedores. Imprescindible para entender el futuro de la IA y la tecnología.",
    url:"https://lexfridman.com/podcast" },

  // ── YOUTUBE & VÍDEO ──────────────────────────────────────
  { cat:"video", emoji:"▶️", name:"Isra Bravo",         lang:"es", free:true,
    desc:"El copywriter más influyente en español. Sus vídeos sobre ventas y comunicación son directos, sin humo y aplicables inmediatamente.",
    url:"https://www.youtube.com/@israbravo" },
  { cat:"video", emoji:"▶️", name:"Vilma Núñez",        lang:"es", free:true,
    desc:"Marketing digital y negocios online en español. Tutoriales muy prácticos sobre redes sociales, estrategia de contenidos y herramientas digitales.",
    url:"https://www.youtube.com/@vilmanunezconsultora" },
  { cat:"video", emoji:"▶️", name:"Emilio Duró",        lang:"es", free:true,
    desc:"Sus conferencias sobre actitud, liderazgo y empresa son de las más vistas en español. Mezcla humor con ideas empresariales de alto impacto.",
    url:"https://www.youtube.com/results?search_query=emilio+duro+conferencia" },
  { cat:"video", emoji:"▶️", name:"Y Combinator",       lang:"en", free:true,
    desc:"La aceleradora más importante del mundo publica sus clases de Startup School gratuitamente. Imprescindible para cualquier fundador.",
    url:"https://www.youtube.com/@ycombinator" },
  { cat:"video", emoji:"▶️", name:"Alex Hormozi",       lang:"en", free:true,
    desc:"El emprendedor más seguido actualmente en inglés sobre negocios. Contenido muy denso sobre ventas, ofertas y cómo escalar un negocio de servicios.",
    url:"https://www.youtube.com/@AlexHormozi" },
  { cat:"video", emoji:"▶️", name:"Patrick Boyle",      lang:"en", free:true,
    desc:"Finanzas, inversión y economía explicadas con rigor académico y humor seco. Ideal para entender los mercados financieros sin ser economista.",
    url:"https://www.youtube.com/@PBoyle" },
  { cat:"video", emoji:"▶️", name:"Simon Sinek",        lang:"en", free:true,
    desc:"Liderazgo, propósito y cultura empresarial. Su charla TED Start With Why es el mejor punto de partida para cualquier emprendedor.",
    url:"https://www.youtube.com/@SimonSinek" },
  { cat:"video", emoji:"▶️", name:"TED Business",       lang:"en", free:true,
    desc:"Las charlas TED seleccionadas específicamente sobre negocios, innovación y liderazgo. 15-20 minutos por idea que pueden cambiar tu perspectiva.",
    url:"https://www.youtube.com/@TED" },

  // ── FOROS & COMUNIDADES ───────────────────────────────────
  { cat:"comunidad", emoji:"💬", name:"Forocoches (Economía)", lang:"es", free:true,
    desc:"A pesar de su reputación, el subforo de economía tiene hilos muy útiles sobre fiscalidad de autónomos, inversión y experiencias reales de emprendedores.",
    url:"https://www.forocoches.com/foro/forumdisplay.php?f=32" },
  { cat:"comunidad", emoji:"💬", name:"Reddit r/entrepreneur", lang:"en", free:true,
    desc:"La comunidad de emprendedores más grande en inglés. Preguntas reales, respuestas honestas y experiencias de fundadores en todas las etapas.",
    url:"https://www.reddit.com/r/entrepreneur" },
  { cat:"comunidad", emoji:"💬", name:"Reddit r/smallbusiness", lang:"en", free:true,
    desc:"Específico para negocios pequeños. Fiscalidad, clientes difíciles, pricing, marketing local: problemas del día a día resueltos por quien ya los vivió.",
    url:"https://www.reddit.com/r/smallbusiness" },
  { cat:"comunidad", emoji:"💬", name:"Hacker News",    lang:"en", free:true,
    desc:"La comunidad de Y Combinator. Tecnología, startups y emprendimiento al más alto nivel de debate. Imprescindible para estar al día en tech.",
    url:"https://news.ycombinator.com" },
  { cat:"comunidad", emoji:"💬", name:"Indie Hackers",  lang:"en", free:true,
    desc:"La comunidad de fundadores bootstrapped (sin inversión). Comparten ingresos reales, estrategias y fracasos con una transparencia poco habitual.",
    url:"https://www.indiehackers.com" },
  { cat:"comunidad", emoji:"💬", name:"Product Hunt",   lang:"en", free:true,
    desc:"Donde se lanzan los nuevos productos digitales cada día. Útil tanto para descubrir herramientas como para lanzar tu propio producto.",
    url:"https://www.producthunt.com" },
  { cat:"comunidad", emoji:"💬", name:"LinkedIn (grupos)", lang:"en", free:true,
    desc:"Los grupos de LinkedIn son subestimados. Busca grupos activos de tu sector: son comunidades de profesionales donde se generan oportunidades reales.",
    url:"https://www.linkedin.com" },

  // ── HERRAMIENTAS DE TENDENCIAS ────────────────────────────
  { cat:"herramientas", emoji:"🛠️", name:"Google Trends",    lang:"en", free:true,
    desc:"Descubre qué está buscando la gente en tiempo real. Ideal para validar ideas, encontrar nichos y entender la estacionalidad de tu mercado.",
    url:"https://trends.google.com" },
  { cat:"herramientas", emoji:"🛠️", name:"Exploding Topics", lang:"en", free:true,
    desc:"Detecta tendencias antes de que se vuelvan mainstream. Perfecto para emprendedores que quieren adelantarse al mercado con nuevos productos o contenidos.",
    url:"https://explodingtopics.com" },
  { cat:"herramientas", emoji:"🛠️", name:"SparkToro",        lang:"en", free:true,
    desc:"Descubre dónde pasa el tiempo online tu cliente ideal: qué medios lee, qué podcasts escucha, a quién sigue. Oro puro para estrategia de marketing.",
    url:"https://sparktoro.com" },
  { cat:"herramientas", emoji:"🛠️", name:"Semrush / Trends", lang:"en", free:false,
    desc:"Más allá del SEO, su módulo de tendencias permite ver el crecimiento de sectores, comparar competidores y analizar el tráfico de cualquier web del mundo.",
    url:"https://www.semrush.com/analytics/trends" },
  { cat:"herramientas", emoji:"🛠️", name:"CB Insights",      lang:"en", free:false,
    desc:"El radar del venture capital global. Tendencias de inversión, sectores emergentes y análisis de startups que están recibiendo dinero ahora mismo.",
    url:"https://www.cbinsights.com" },
  { cat:"herramientas", emoji:"🛠️", name:"Feedly",           lang:"en", free:true,
    desc:"Agrega todos tus medios, blogs y newsletters en un solo lector. Con IA integrada puede resumirte lo más relevante de decenas de fuentes cada día.",
    url:"https://feedly.com" },
  { cat:"herramientas", emoji:"🛠️", name:"Perplexity AI",    lang:"en", free:true,
    desc:"Motor de búsqueda con IA que cita sus fuentes. Ideal para investigar mercados, competidores o conceptos empresariales con respuestas actualizadas.",
    url:"https://www.perplexity.ai" },
  { cat:"herramientas", emoji:"🛠️", name:"AlphaSignals",     lang:"en", free:true,
    desc:"Agrega señales de IA, tecnología y negocios desde Twitter/X, Reddit y medios especializados. Perfecto para estar al día en inteligencia artificial aplicada.",
    url:"https://alphasignals.ai" }
];

function renderResources(cat) {
  var grid = document.getElementById("res-grid");
  if (!grid) return;
  var html = "";
  RESOURCES.forEach(function(r) {
    var show = (cat === "all" || r.cat === cat);
    var langBadge = r.lang === "es"
      ? '<span class="res-badge es">🇪🇸 Español</span>'
      : '<span class="res-badge en">🌐 Inglés</span>';
    var priceBadge = r.free
      ? '<span class="res-badge free">Gratis</span>'
      : '<span class="res-badge paid">De pago</span>';
    html +=
      '<div class="res-card' + (show ? "" : " hidden") + '">' +
        '<div class="res-card-top">' +
          '<span class="res-emoji">' + r.emoji + '</span>' +
          '<div class="res-badges">' + langBadge + priceBadge + '</div>' +
        '</div>' +
        '<h4>' + r.name + '</h4>' +
        '<p>' + r.desc + '</p>' +
        '<a class="res-link" href="' + r.url + '" target="_blank" rel="noopener">Visitar →</a>' +
      '</div>';
  });
  grid.innerHTML = html;
}

function initResources() {
  var tabs = document.querySelectorAll(".res-tab");
  if (!tabs.length) return;
  renderResources("all");
  tabs.forEach(function(tab) {
    tab.addEventListener("click", function() {
      tabs.forEach(function(t) { t.classList.remove("active"); });
      tab.classList.add("active");
      renderResources(tab.dataset.cat);
    });
  });
}

// ── MISTAKES ───────────────────────────────────────────────
var MISTAKES = [
  {
    num: "01", icon: "💸",
    title: "Empezar sin validar la idea",
    tag: "Validación",
    body: "<p>Uno de los errores más costosos y frecuentes en España: dedicar meses (y miles de euros) a desarrollar un producto o servicio sin haber confirmado antes que alguien estaría dispuesto a pagar por él.</p><h3>Por qué ocurre</h3><p>El emprendedor se enamora de su idea y asume que si a él le parece buena, a los demás también. La ilusión sustituye a los datos. Además, en España existe cierto miedo a compartir la idea antes de que esté «perfecta», lo que retrasa la validación.</p><h3>Las consecuencias</h3><ul><li>Inversión de tiempo y dinero en algo que el mercado no quiere</li><li>Frustración y abandono prematuro al no ver resultados</li><li>Pérdida de la ventana de oportunidad mientras se desarrolla</li></ul><h3>Cómo evitarlo</h3><p><strong>Valida antes de construir.</strong> La forma más rápida es intentar vender tu producto antes de que exista: explica la propuesta a 10 personas de tu perfil de cliente ideal y observa si intentan comprarlo. Si nadie quiere sacar la cartera, el problema no es el precio ni la comunicación: es el producto.</p><p>El objetivo de la validación no es recibir opiniones positivas («me parece interesante»), sino conseguir compromisos reales: una reserva, un pago anticipado, una firma.</p><p class='article-cta'>💡 Regla de oro: si no puedes conseguir 3 personas dispuestas a pagar antes de construir, no construyas todavía. Ajusta primero.</p>"
  },
  {
    num: "02", icon: "🎯",
    title: "No tener un cliente ideal definido",
    tag: "Marketing",
    body: "<p>«Mi producto es para todo el mundo» es la frase que más negocios ha hundido en España. Intentar llegar a todos implica no llegar a nadie con suficiente fuerza como para que actúen.</p><h3>Por qué ocurre</h3><p>El miedo a perder clientes potenciales lleva al emprendedor a ampliar el mensaje hasta hacerlo genérico. Paradójicamente, cuanto más específico es tu mensaje, más clientes atraes, porque hablas directamente al problema de alguien concreto.</p><h3>Las consecuencias</h3><ul><li>Mensajes de marketing vagos que no conectan con nadie</li><li>Dificultad para diferenciarse de la competencia</li><li>Clientes que no encajan bien y generan más problemas que ingresos</li></ul><h3>Cómo evitarlo</h3><p>Define a tu cliente ideal con este nivel de detalle: ¿Qué edad tiene? ¿A qué se dedica? ¿Qué le preocupa al levantarse? ¿Dónde busca información? ¿Qué soluciones ha probado antes?</p><p>Cuando tengas ese perfil claro, cada decisión de marketing se vuelve mucho más sencilla: sabes dónde aparecer, qué decir y cómo decirlo.</p><p class='article-cta'>💡 Ejercicio: describe a tu cliente ideal como si fuera una persona real con nombre y apellidos. Si no puedes, aún no lo tienes definido.</p>"
  },
  {
    num: "03", icon: "🧾",
    title: "Mezclar finanzas personales y del negocio",
    tag: "Finanzas",
    body: "<p>Es el error financiero número uno en pymes y autónomos españoles. Usar la misma cuenta bancaria para gastos personales y del negocio hace imposible saber si el negocio gana o pierde dinero, y complica enormemente la gestión fiscal.</p><h3>Por qué ocurre</h3><p>Al principio parece cómodo: «ya lo separo mentalmente». Pero a medida que el negocio crece, la mezcla se vuelve un caos que muchos gestores se niegan incluso a intentar ordenar.</p><h3>Las consecuencias en España</h3><ul><li>Imposibilidad de saber el beneficio real del negocio</li><li>Problemas con Hacienda: gastos personales deducidos como empresariales</li><li>Dificultad para acceder a financiación (los bancos piden cuentas separadas)</li><li>Estrés financiero constante por no saber «de quién es» el dinero</li></ul><h3>Cómo evitarlo</h3><p><strong>Esta semana:</strong> abre una cuenta corriente exclusiva para el negocio, aunque seas autónomo. Todos los ingresos del negocio entran ahí y todos los gastos del negocio salen de ahí. Tu sueldo personal es una transferencia mensual fija de esa cuenta a tu cuenta personal.</p><p>Este simple cambio transforma tu visión financiera del negocio de forma inmediata.</p><p class='article-cta'>💡 Si tienes gestor, este cambio también le facilita enormemente su trabajo y puede reducir lo que le pagas.</p>"
  },
  {
    num: "04", icon: "📉",
    title: "Cobrar demasiado poco",
    tag: "Ventas",
    body: "<p>España tiene una cultura de precio bajo muy arraigada, especialmente en servicios. Muchos emprendedores fijan precios basándose en el miedo («si cobro más, no me contratan») en lugar de en el valor que generan.</p><h3>Por qué ocurre</h3><p>Inseguridad sobre el propio valor, miedo al rechazo, y la creencia de que el precio bajo es una ventaja competitiva. En realidad, cobrar poco envía una señal negativa: los clientes asocian precio bajo con calidad baja.</p><h3>Las consecuencias</h3><ul><li>Trabajar muchas horas sin rentabilidad real</li><li>Atraer clientes que no valoran el trabajo y negocian cada céntimo</li><li>Imposibilidad de invertir en crecer o mejorar el negocio</li><li>Agotamiento y abandono del proyecto</li></ul><h3>Cómo corregirlo</h3><p>Haz este ejercicio: investiga qué cobran 3 competidores directos por algo similar. Luego pregúntate cuánto le cuesta al cliente NO resolver el problema que tú resuelves. Si ese coste es mayor que tu precio, estás cobrando poco.</p><p><strong>Prueba práctica:</strong> sube tu precio un 20% en la próxima propuesta. Si el 100% de los clientes acepta sin preguntar, es que aún tienes margen. El precio correcto genera algo de fricción, pero no demasiada.</p><p class='article-cta'>💡 Los clientes que solo te eligen por precio son los peores clientes que tendrás. Los buenos clientes buscan valor y resultados, no el precio más bajo.</p>"
  },
  {
    num: "05", icon: "⚖️",
    title: "Ignorar lo legal y fiscal desde el principio",
    tag: "Legal y fiscal",
    body: "<p>España tiene uno de los sistemas fiscales más complejos para autónomos y pymes de Europa. Ignorarlo no lo hace desaparecer: solo retrasa las consecuencias y las hace más caras.</p><h3>Los errores más frecuentes en España</h3><ul><li><strong>Operar sin darse de alta como autónomo:</strong> incluso con ingresos pequeños, la Seguridad Social puede reclamar cuotas retroactivas más sanciones.</li><li><strong>No entender el IVA:</strong> el IVA no es ingreso tuyo, es dinero de Hacienda que gestionas. Gastarlo es uno de los errores más graves.</li><li><strong>Confundir beneficio con tesorería:</strong> puedes tener mucho dinero en la cuenta y deber mucho a Hacienda al trimestre siguiente.</li><li><strong>No guardar facturas de gastos:</strong> sin factura, el gasto no es deducible. Pierdes dinero que podrías recuperar legalmente.</li></ul><h3>Cómo evitarlo</h3><p>Trabaja con un gestor desde el primer día, aunque facturesvpoco. El coste de un buen gestor (entre 50-150€/mes para autónomos) es siempre menor que el coste de un problema con Hacienda.</p><p>Si empiezas solo, investiga al menos estas tres cosas: cuándo y cómo darte de alta como autónomo, cómo funciona el modelo 130 (IRPF trimestral) y el modelo 303 (IVA trimestral).</p><p class='article-cta'>💡 La tarifa plana de autónomos (actualmente 80€/mes el primer año) es una oportunidad que muchos no aprovechan por no informarse a tiempo.</p>"
  },
  {
    num: "06", icon: "🔇",
    title: "No comunicar hasta que «esté todo listo»",
    tag: "Marketing",
    body: "<p>«Cuando tenga la web perfecta, empiezo a publicar.» «Cuando tenga el logo definitivo, abro redes.» «Cuando el producto esté acabado del todo, empiezo a vender.» Este perfeccionismo retrasa el negocio meses o años.</p><h3>Por qué ocurre</h3><p>El miedo al juicio ajeno y la búsqueda de perfección son muy comunes en la cultura emprendedora española. Pero el mercado no premia la perfección: premia la presencia constante y la utilidad.</p><h3>Las consecuencias</h3><ul><li>Meses sin clientes mientras se «prepara el lanzamiento»</li><li>Pérdida de aprendizaje que solo se obtiene hablando con clientes reales</li><li>Desmotivación al ver que el trabajo no genera resultados visibles</li></ul><h3>El antídoto</h3><p>Adopta la mentalidad del <strong>«bueno y ya»</strong>: una web sencilla y funcionando es infinitamente mejor que una perfecta que no existe. Un post publicado hoy genera más que diez borradores guardados.</p><p>La perfección es un estándar que tú te impones. Tus clientes valoran que estés presente, que seas útil y que respondas. El logo puede esperar; la conversación con el cliente, no.</p><p class='article-cta'>💡 Regla práctica: si algo está al 70% de lo que quieres, ya está listo para salir. El 30% restante lo aprenderás con la reacción del mercado, no trabajando en silencio.</p>"
  },
  {
    num: "07", icon: "🏝️",
    title: "Emprender en soledad sin red de apoyo",
    tag: "Mentalidad",
    body: "<p>El emprendedor solitario es uno de los perfiles más comunes en España, y también uno de los más vulnerables. Sin una red de apoyo, cada problema parece único, insalvable y agotador.</p><h3>Por qué ocurre</h3><p>En España, el emprendimiento todavía no tiene el ecosistema de comunidad que existe en otros países. Además, muchos emprendedores sienten vergüenza de mostrar sus dificultades, lo que los lleva a aislarse más.</p><h3>Las consecuencias</h3><ul><li>Decisiones tomadas sin perspectiva externa que las cuestione</li><li>Mayor probabilidad de abandono ante los primeros obstáculos serios</li><li>Agotamiento mental por cargar con todo sin con quién compartirlo</li><li>Errores que otros ya han cometido y de los que podrías aprender</li></ul><h3>Cómo construir tu red</h3><p>No hace falta un mentor famoso ni un inversor. Empieza por lo más accesible:</p><ul><li>Busca 2-3 emprendedores en una etapa similar a la tuya y quedaos una vez al mes</li><li>Únete a comunidades online de tu sector (LinkedIn, grupos de Facebook, Slack)</li><li>Asiste a eventos locales de emprendimiento aunque solo sea para escuchar</li></ul><p>El objetivo no es hacer networking transaccional: es tener personas que entiendan tus retos porque los están viviendo también.</p><p class='article-cta'>💡 En España existen redes como AJE (Asociación de Jóvenes Empresarios) y los Viveros de Empresas municipales que ofrecen mentoring gratuito o de bajo coste.</p>"
  },
  {
    num: "08", icon: "📋",
    title: "No documentar procesos hasta que es demasiado tarde",
    tag: "Operaciones",
    body: "<p>Mientras el negocio es pequeño, tener todo en la cabeza funciona. Pero en el momento en que quieres delegar, escalar o simplemente tomarte unos días de descanso, te das cuenta del problema: el negocio no puede funcionar sin ti.</p><h3>Por qué ocurre</h3><p>Documentar parece una tarea burocrática que «ya haré cuando tenga tiempo». Ese momento nunca llega porque siempre hay algo más urgente. Hasta que hay una crisis.</p><h3>Las consecuencias</h3><ul><li>Imposibilidad de delegar: nadie más sabe hacer lo que tú haces</li><li>Cada nueva incorporación requiere que tú estés presente para enseñar</li><li>Si enfermas o te vas de vacaciones, el negocio se para</li><li>Dificultad para vender el negocio en el futuro (un comprador quiere sistemas, no personas indispensables)</li></ul><h3>Por dónde empezar</h3><p>No hace falta documentar todo a la vez. Empieza por el proceso que más repites: el que haría más daño si falla o si tienes que delegarlo de urgencia. Escríbelo en una página. Luego el siguiente.</p><p>En 10 semanas, documentando un proceso por semana, tendrás el 80% de tu negocio sistematizado.</p><p class='article-cta'>💡 Una grabación de pantalla de 10 minutos mientras haces una tarea vale más que un manual de 20 páginas que nadie lee.</p>"
  },
  {
    num: "09", icon: "🔁",
    title: "Rendirse justo antes del punto de inflexión",
    tag: "Mentalidad",
    body: "<p>Muchos negocios que habrían tenido éxito se abandonan en el peor momento posible: justo cuando estaban a punto de despegar. La curva de aprendizaje de un negocio nuevo es dura, y confundirla con el fracaso es el error más caro.</p><h3>El patrón típico en España</h3><p>Los primeros 6-18 meses de un negocio nuevo son los más difíciles. Los ingresos son bajos, el mercado no te conoce todavía, y la incertidumbre es máxima. Es en este período cuando la mayoría abandona, justo cuando la inversión en aprendizaje estaba a punto de dar sus frutos.</p><h3>Cómo distinguir «curva normal» de «esto no funciona»</h3><ul><li><strong>Señal de que vas por buen camino:</strong> tienes algunos clientes satisfechos, recibes feedback positivo aunque las ventas sean bajas, cada mes sabes algo que no sabías el anterior.</li><li><strong>Señal de que algo debe cambiar:</strong> llevas 12 meses sin un solo cliente de pago, el feedback es consistentemente negativo, o el mercado que elegiste no existe.</li></ul><h3>La regla de los 18 meses</h3><p>No evalúes si tu negocio «funciona o no» antes de los 18 meses de trabajo real y constante. Lo que sí debes hacer durante ese tiempo es iterar: cambiar lo que no funciona, reforzar lo que sí, y seguir aprendiendo.</p><p class='article-cta'>💡 Si estás pensando en abandonar, hazte esta pregunta: ¿estoy tomando esta decisión desde el cansancio o desde los datos? Las dos cosas son muy diferentes.</p>"
  }
];

function openMistake(idx) {
  var m = MISTAKES[idx];
  if (!m) return;
  var el = document.getElementById("mistake-content");
  el.innerHTML =
    '<span class="art-tag" style="background:#fde8d8;color:#e05555">' + m.tag + '</span>' +
    '<div class="art-meta"><span>' + m.num + ' · ' + m.icon + '</span></div>' +
    '<h2>' + m.title + '</h2>' +
    m.body;
  var mm = document.getElementById("mistake-modal");
  mm.classList.add("open");
}

function closeMistake() {
  document.getElementById("mistake-modal").classList.remove("open");
}

// ── ARTICLES ───────────────────────────────────────────────
var ARTICLES = [
  {
    tag: "Finanzas", tagClass: "orange",
    title: "5 métricas financieras que todo emprendedor debe conocer",
    meta: "Lectura 4 min · Finanzas básicas",
    body: "<p>Muchos emprendedores llevan su negocio sin mirar los números, confiando en la intuición. Funciona al principio, pero tiene un techo. Estas 5 métricas te darán visión real de la salud de tu negocio en cualquier momento.</p><h3>1. Punto de equilibrio mensual</h3><p>¿Cuánto necesitas vender cada mes para no perder dinero? Suma todos tus gastos fijos y divídelos entre el precio promedio de tu producto o servicio. Ese número es tu meta mínima mensual.</p><h3>2. Margen de beneficio neto</h3><p>No es lo mismo facturar mucho que ganar mucho. El margen neto te dice qué porcentaje de cada euro que entra se convierte en beneficio real. <strong>Fórmula:</strong> (Beneficio neto / Ingresos totales) × 100.</p><h3>3. Flujo de caja mensual</h3><p>¿Cuánto dinero real entró y salió de tu cuenta este mes? No lo que facturaste, sino lo que realmente cobrastes. Muchos negocios rentables quiebran por falta de liquidez.</p><h3>4. Coste de adquisición de cliente (CAC)</h3><p>¿Cuánto te cuesta conseguir un nuevo cliente? Divide lo que gastas en marketing y ventas entre el número de clientes nuevos obtenidos. Si tu CAC es mayor que lo que te paga ese cliente, tienes un problema.</p><h3>5. Valor de vida del cliente (LTV)</h3><p>¿Cuánto dinero te genera un cliente durante toda su relación contigo? Compara este número con tu CAC: si el LTV es al menos 3 veces mayor que el CAC, tu negocio tiene buena salud.</p><p class='article-cta'>💡 Empieza esta semana: calcula solo el punto de equilibrio. Con ese número claro, todas las demás decisiones se vuelven más fáciles.</p>"
  },
  {
    tag: "Marketing", tagClass: "",
    title: "Cómo construir una propuesta de valor en una frase",
    meta: "Lectura 3 min · Branding",
    body: "<p>La propuesta de valor es la respuesta a la pregunta que se hace tu cliente en los primeros 5 segundos: <em>\"¿Por qué debería elegirte a ti?\"</em> Si no tienes una respuesta clara, concisa y diferente, ya lo has perdido.</p><h3>La fórmula que funciona</h3><p>Completa esta frase: <strong>\"Ayudo a [tipo de cliente] a [resultado que obtienes] sin [obstáculo o dolor que evitas].\"</strong></p><p>Ejemplo real: <em>\"Ayudo a emprendedores principiantes a llevar su contabilidad sin necesitar conocimientos de finanzas.\"</em></p><h3>Los 3 errores más comunes</h3><ul><li><strong>Ser demasiado genérico:</strong> \"Ofrezco servicios de calidad\" no dice nada. Todos dicen lo mismo.</li><li><strong>Hablar del proceso, no del resultado:</strong> Tu cliente no compra lo que haces, compra lo que consigue gracias a lo que haces.</li><li><strong>Intentar hablarle a todos:</strong> Cuanto más específico es tu cliente ideal, más poderosa es tu propuesta.</li></ul><h3>Cómo saber si funciona</h3><p>Muéstrasela a alguien que no te conoce. Si en 10 segundos no entiende qué haces y para quién, reescríbela. La claridad siempre supera a la creatividad.</p><p class='article-cta'>💡 Ejercicio: escribe 3 versiones de tu propuesta de valor hoy y compártelas con alguien de confianza. Quédate con la que genere más curiosidad.</p>"
  },
  {
    tag: "Ventas", tagClass: "orange",
    title: "El guión de ventas que no suena a guión",
    meta: "Lectura 5 min · Técnicas comerciales",
    body: "<p>Los mejores vendedores no siguen un guión rígido: tienen una conversación estructurada que parece completamente natural. La diferencia está en dominar las preguntas correctas, no en memorizar frases.</p><h3>La estructura de 4 pasos</h3><p><strong>1. Conectar antes de vender.</strong> Empieza preguntando por la situación actual del cliente, sin intentar vender nada todavía. La gente compra a quien la entiende, no a quien la convence.</p><p><strong>2. Descubrir el problema real.</strong> Pregunta: <em>\"¿Cuál es el mayor reto que tienes ahora mismo con [área relacionada]?\"</em> Escucha más de lo que hablas. El cliente te está diciendo exactamente cómo venderle.</p><p><strong>3. Amplificar el coste del problema.</strong> Antes de presentar tu solución, pregunta: <em>\"¿Qué pasa si esto no se resuelve en los próximos 3 meses?\"</em> Cuando el cliente articula el coste del problema, el precio de tu solución se vuelve pequeño.</p><p><strong>4. Presentar como solución, no como producto.</strong> No digas lo que haces. Di cómo lo que haces resuelve exactamente lo que el cliente te acaba de contar.</p><h3>La frase que más ventas cierra</h3><p>Al final de la conversación, en lugar de preguntar \"¿lo comprás?\", pregunta: <em>\"¿Tiene sentido para ti empezar por aquí?\"</em> Es menos agresivo, más colaborativo, y convierte mucho mejor.</p><p class='article-cta'>💡 Esta semana: en tu próxima conversación de ventas, escucha sin interrumpir durante los primeros 3 minutos. Solo haz preguntas. Notarás la diferencia.</p>"
  },
  {
    tag: "Operaciones", tagClass: "",
    title: "Automatiza tu negocio con herramientas gratuitas",
    meta: "Lectura 6 min · Productividad",
    body: "<p>Automatizar no es solo para grandes empresas. Con las herramientas correctas, puedes recuperar entre 5 y 10 horas a la semana sin gastar un euro. El truco está en automatizar primero lo que más se repite.</p><h3>Herramientas gratuitas por categoría</h3><h3>📅 Agenda y citas</h3><p><strong>Calendly (gratis):</strong> Deja que los clientes reserven citas en tu calendario sin el ir y venir de emails. Conecta con Google Calendar o Outlook. Ahorra entre 20-30 minutos por cita.</p><h3>💸 Facturación</h3><p><strong>Wave (gratis):</strong> Crea facturas profesionales, hace seguimiento de pagos y lleva tu contabilidad básica. Perfecto para freelancers y negocios pequeños.</p><h3>📧 Email y seguimiento</h3><p><strong>Mailchimp (gratis hasta 500 contactos):</strong> Automatiza emails de bienvenida, seguimiento post-venta y newsletters. Una vez configurado, trabaja solo.</p><h3>🔗 Conectar apps</h3><p><strong>Zapier (gratis, 100 tareas/mes):</strong> Conecta tus aplicaciones entre sí. Ejemplo: cuando alguien rellena un formulario, automáticamente se añade a tu lista de email y recibes una notificación en WhatsApp.</p><h3>✅ Gestión de tareas</h3><p><strong>Trello o Notion (gratis):</strong> Organiza proyectos, tareas y procesos en un solo lugar. Especialmente útil cuando empiezas a delegar.</p><h3>Por dónde empezar</h3><p>Elige UNA sola herramienta esta semana, la que resuelva tu mayor pérdida de tiempo. Másterala antes de añadir otra. La trampa de las herramientas es empezar demasiadas a la vez.</p><p class='article-cta'>💡 Reto: identifica la tarea que más veces repites esta semana. Hay una probabilidad alta de que pueda automatizarse con alguna de estas herramientas.</p>"
  },
  {
    tag: "Personas", tagClass: "orange",
    title: "Tu primer contrato: qué hacer antes de contratar a alguien",
    meta: "Lectura 4 min · RRHH básico",
    body: "<p>Contratar a tu primera persona es uno de los momentos más emocionantes y arriesgados del emprendimiento. Una mala contratación puede costarte 3 meses de trabajo perdido y mucho estrés. Estas son las claves para hacerlo bien desde el principio.</p><h3>Antes de publicar ninguna oferta</h3><p>Responde estas 4 preguntas por escrito:</p><ul><li><strong>¿Qué problema concreto resuelve esta persona?</strong> No contrates un perfil genérico, contrata para resolver un problema específico.</li><li><strong>¿Qué habrá entregado en sus primeros 90 días?</strong> Si no puedes responder esto, aún no estás listo para contratar.</li><li><strong>¿Qué 3 habilidades son absolutamente no-negociables?</strong> Sé específico. \"Proactivo y organizado\" no es una habilidad medible.</li><li><strong>¿Qué tipo de personalidad encaja con tu forma de trabajar?</strong> Las habilidades se pueden enseñar; la actitud y los valores, mucho menos.</li></ul><h3>La entrevista que revela más</h3><p>En lugar de preguntar \"¿cuáles son tus puntos fuertes?\", pregunta: <em>\"Cuéntame de un proyecto en el que las cosas no salieron como esperabas. ¿Qué hiciste?\"</em> La respuesta te dice más sobre cómo trabaja alguien que cualquier CV.</p><h3>El periodo de prueba lo cambia todo</h3><p>Define claramente qué esperas al final del periodo de prueba. Un objetivo concreto, medible, acordado desde el primer día. Así tanto tú como la persona sabéis exactamente a qué ateneros.</p><p class='article-cta'>💡 Antes de tu próxima contratación, escribe la descripción del puesto respondiendo las 4 preguntas anteriores. Ese documento te ahorrará semanas de proceso.</p>"
  },
  {
    tag: "Marketing", tagClass: "",
    title: "Redes sociales para negocios: empezar bien desde el principio",
    meta: "Lectura 5 min · Redes sociales",
    body: "<p>El mayor error que cometen los emprendedores en redes sociales es intentar estar en todas a la vez. El resultado: presencia mediocre en todas partes, sin resultados en ninguna. La estrategia ganadora es la opuesta.</p><h3>Cómo elegir tu red principal</h3><p>La pregunta no es \"¿cuál red es mejor?\", sino <em>\"¿dónde está concentrado mi cliente ideal?\"</em></p><ul><li><strong>Instagram:</strong> Ideal para negocios visuales, productos físicos, lifestyle, alimentación, moda, belleza.</li><li><strong>LinkedIn:</strong> Perfecto para servicios B2B, consultoría, formación profesional, tecnología.</li><li><strong>TikTok:</strong> Audiencias jóvenes, productos de consumo, educación entretenida, tendencias.</li><li><strong>Facebook:</strong> Comunidades locales, grupos de nicho, audiencias de 35+ años.</li></ul><h3>Qué publicar (y qué no)</h3><p>El contenido que funciona en redes de negocio sigue esta proporción: <strong>70% valor, 20% personalidad, 10% venta.</strong> Si publicas más del 10% de contenido de venta directa, la audiencia desaparece.</p><h3>La frecuencia que funciona</h3><p>Publicar 3 veces por semana de forma constante durante 90 días supera a publicar todos los días durante 2 semanas y luego desaparecer. El algoritmo premia la consistencia, y tu audiencia también.</p><h3>La métrica que importa de verdad</h3><p>No te obsesiones con los seguidores. La métrica que importa es cuántas personas te contactan o preguntan por tus servicios. Puedes tener 500 seguidores y un negocio rentable si son los 500 correctos.</p><p class='article-cta'>💡 Esta semana: elige UNA red social, publica 3 veces con contenido útil para tu cliente, y mide cuántos mensajes recibes. Ese es tu punto de partida real.</p>"
  }
];

function openArticle(idx) {
  var art = ARTICLES[idx];
  if (!art) return;
  var el = document.getElementById("article-content");
  el.innerHTML =
    '<span class="art-tag ' + art.tagClass + '">' + art.tag + '</span>' +
    '<div class="art-meta">' +
    '<span>' + art.meta + '</span>' +
    '</div>' +
    '<h2>' + art.title + '</h2>' +
    art.body;
  var artModal = document.getElementById("article-modal");
  artModal.classList.add("open");
  artModal.scrollTop = 0;
  el.scrollTop = 0;
}

function closeArticle() {
  document.getElementById("article-modal").classList.remove("open");
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

  // Feed article cards
  document.querySelectorAll(".feed-card[data-article]").forEach(function(card) {
    card.addEventListener("click", function() {
      openArticle(parseInt(card.dataset.article, 10));
    });
    card.addEventListener("keydown", function(e) {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openArticle(parseInt(card.dataset.article, 10)); }
    });
  });

  // Article modal close
  document.getElementById("article-close").addEventListener("click", closeArticle);
  document.getElementById("article-modal").addEventListener("click", function(e) {
    if (e.target === document.getElementById("article-modal")) closeArticle();
  });

  // Mistake cards
  document.querySelectorAll(".mistake-card[data-mistake]").forEach(function(card) {
    card.addEventListener("click", function() {
      openMistake(parseInt(card.dataset.mistake, 10));
    });
    card.addEventListener("keydown", function(e) {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openMistake(parseInt(card.dataset.mistake, 10)); }
    });
  });

  // Mistake modal close
  document.getElementById("mistake-close").addEventListener("click", closeMistake);
  document.getElementById("mistake-modal").addEventListener("click", function(e) {
    if (e.target === document.getElementById("mistake-modal")) closeMistake();
  });

  // Resources hub
  initResources();
});
