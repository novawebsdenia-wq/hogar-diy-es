const fs = require("fs");
const path = require("path");

const articles = [
  // --- JARDÍN ---
  {
    category: "jardin",
    slug: "como-hacer-compost-casero-sin-olores",
    title: "Cómo hacer compost casero sin olores en un balcón o terraza",
    description:
      "Aprende a reciclar tus restos de comida orgánica y convertirlos en abono premium para tus plantas sin atraer moscas ni olores.",
    date: "2026-03-27",
    readingTime: 5,
    tags: "['jardín', 'sostenibilidad', 'abono']",
    content: `Hacer compost en casa es el paso definitivo para tener el jardín o los tiestos más espectaculares del barrio. Pero la mayoría de la gente lo deja porque su compostera huele a basura podrida o se llena de mosquitas de la fruta. 

El secreto de un compostaje perfecto, rápido y sin ningún olor en un piso o balcón es el **equilibrio carbono-nitrógeno**.

## Materiales necesarios
<AffiliateCard 
  name="Compostador Urbano Skaza Bokashi (Hogar sin olores)"
  image="https://m.media-amazon.com/images/I/61M8rE+GIfL._AC_SL1500_.jpg"
  price="~ 65,00 €"
  link="https://www.amazon.es/s?k=compostador+urbano+bokashi"
  description="Perfecto para aislar residuos en espacios pequeños. Incluye salvado acelerador que fermenta sin pudrir."
  badge="Mejor para pisos"
/>

- Un cubo compostador (puedes hacerlo perforando dos cubos, pero por 60€ recomiendo uno cerrado).
- Restos húmedos (verdes)
- Restos secos (marrón)

## La regla de oro (El truco antimoscas)
Para que no huela, debes seguir esta regla inquebrantable:  
**Por cada taza de residuo "húmedo", echa DOS tazas de residuo "seco".**

*Húmedo (Nitrógeno):* Restos de fruta, verdura, cascaras de huevo, posos de café.  
*Seco (Carbono):* Cartón sin tinta (ej. tubos de papel higiénico), hojas secas, serrín, papel de periódico.

### Paso a paso

1. **La base:** Pon una capa de 5cm de material seco (cartón roto) en el fondo del cubo.
2. **Añade los restos:** Corta los restos de comida (mondas de patata, fruta). Cuanto más pequeño, más rápido se hace compost.
3. **Entiérralo:** Nunca dejes comida a la vista. Siempre espolvorea material marrón (serrín, tierra de plantas vieja o cartón) por encima tapando por completo la comida húmeda. Esto bloquea las moscas y el mal olor.
4. **Remueve una vez por semana:** Oxigenar la mezcla acelera que se caliente y se devore.
5. **Cosecha el oro negro:** En 3-4 meses por la puerta inferior tendrás tierra oscura riquísima para todas tus plantas.

## Preguntas frecuentes

**¿Puedo echar carne, huesos o aceite?**
Rotundamente NO en compostadores urbanos lentos. El aceite repele las bacterias, y la carne o pescado atraerán bichos no deseados y causarán olores nauseabundos.

**Mi compost huele a amoniaco, ¿qué hago?**
El olor a amoniaco (o a purín) significa que hay exceso de humedad o poco oxígeno. Echa un par de puñados de tiras de cartón seco y remueve profundamente el cubo.`,
  },
  {
    category: "jardin",
    slug: "mejores-plantas-exterior-resistentes-frio",
    title: "Top 5 Plantas de exterior resistentes al frío y las heladas",
    description:
      "No te quedes con el balcón o terraza gris en invierno. Estas 5 plantas aguantan heladas extremas y florecen en los peores meses.",
    date: "2026-03-27",
    readingTime: 4,
    tags: "['jardín', 'invierno', 'terraza']",
    content: `Mantener colorida la terraza durante los meses de invierno en España no requiere un invernadero. Existen variedades que aman el frío extremo de enero y febrero, soportando temperaturas constantes por debajo de 5 grados y heladas nocturnas. 

Como paisajista de terrazas, siempre pongo al menos una de estas 5 super-supervivientes del invierno europeo.

## Nuestras campeonas del frío

### 1. El Ciclamen (Cyclamen persicum)
Es la reina del invierno. Sus flores pueden ser blancas, rosas o rojas vivas. Paradójicamente, si las metes en casa con la calefacción se mueren rápido. Necesitan estar fuera, a pleno frío. Solamente debes regar echando un poco de agua en el platico de base y no regarlas por encima.

### 2. El Pensamiento (Viola x wittrockiana)
Un clásico en las rotondas, y por algo será. Estas pequeñas flores son tan duras que florecen incluso mientras está nevando y sus pétalos se escarchan. Agradecen sitios con luz directa y resisten hasta -10ºC. 

### 3. El Acebo (Ilex aquifolium)
El rey de la Navidad, no solo por sus preciosas bayas rojas, sino porque sus hojas duras son inmunes al hielo. Son algo lentos para crecer, pero en un macetón te duran 20 años y nunca se secarán en invierno.

### 4. La Col Ornamental (Brassica oleracea)
Parecen coles repollo gigantes pero de colores magenta intenso y verde crema que parecen psicodélicas. Lo más curioso es que cuanto más frío hace, más vivo es el color.

### 5. El brezo o Érica (Erica o Calluna)
Un pequeño arbusto rústico lleno de campanillas que llenará los huecos difíciles del balcón con colores púrpura todo el invierno. Resiste hasta a los más olvidadizos con la regadera.

<AffiliateCard 
  name="Maceta Rectangular con Aislamiento UV e Hielo (Lechuza Balconera)"
  image="https://m.media-amazon.com/images/I/71N-E-PofJL._AC_SL1500_.jpg"
  price="~ 35,00 €"
  link="https://www.amazon.es/s?k=maceta+lechuza+balconera"
  description="No es barata, pero es indestructible. Hecha de polímero que no se agrieta por las heladas e incluye un depósito interno anti encharcamientos."
  badge="Compra Maestra"
/>

## Preguntas frecuentes

**¿Qué pasa si una noche de fuerte helada se queda escarchada la tierra?**
Las raíces en las macetas sufren más el frío que en el suelo natural, dado que carecen de la inercia térmica de la tierra. Para heladas muy intensas (-5ºC) puedes arropar la jardinera con plástico de burbujas para proteger exclusivamente las raíces. `,
  },

  // --- HERRAMIENTAS ---
  {
    category: "herramientas",
    slug: "sierra-caladora-vs-circular-cual-comprar",
    title: "Sierra Caladora vs Sierra Circular: ¿Cuál comprar primero?",
    description:
      "Ambas cortan madera, pero son opuestas en función. Descubre cuál es la mejor inversión para un taller casero y por qué te equivocas si compras las dos a la vez.",
    date: "2026-03-27",
    readingTime: 6,
    tags: "['sierras', 'bricolaje', 'compras']",
    content: `Una de las dudas más repetidas que me llega al correo es: *"Carlos, voy a empezar a montar unos muebles con tableros, ¿me compro una sierra de calar o de una vez una circular?"*.

A nivel de principiante, mucha gente cree que la sierra circular es el "hermano mayor profesional" de la caladora de 30€. Tremendo error. Son herramientas para mundos totalmente distintos. 

## Tabla Rápida: Cuándo usar cuál

| Característica | Sierra Caladora (De vaivén) | Sierra Circular |
| :--- | :--- | :--- |
| **Cortes Rectos largos** | ONDULAN dolorosamente. Pésima opción. | Perfectos milimétricos, corte láser. |
| **Cortes en curva o círculos** | Diseñada exactamente para esto. Ideal. | Imposible, el disco es recto y bloqueante. |
| **Desmontar muebles en sitio** | Genial, muy portátil y poco peligrosa. | Incómoda, requiere base plana enorme. |
| **Peligro y Riesgo** | Herramienta de principiante, muy dócil. | Precisa gran respeto, retrocesos letales.|

## ¿Qué compro si soy novato total?
Si vas a realizar manualidades, montar tarimas sueltas, recortar un hueco para un fregadero en una encimera de cocina o recortar un zócalo que estorba en la pared... **Compra la Sierra de Calar**. Puedes equiparla con hojas distintas y cortar plástico, metal suave o madera.

La sierra circular no te valdría para el 90% de esos huecos complicados.  

## ¿Y si quiero construir muebles enteros?
Entonces la caladora te hará llorar. Si quieres cortar un gran tablero de DM para convertirlo en dos estanterías largas, es IMPOSIBLE que la caladora trace una línea perfecta a lo largo de 1 metro. La hoja delgada fleja (se dobla de abajo a los lados). En este caso, la **Sierra Circular** y una regla gruesa de guía es el equivalente a tener un aserradero industrial en tu cochera.

<AffiliateCard 
  name="Sierra de Calar Profesional a Batería (Dewalt DCS331N)"
  image="https://m.media-amazon.com/images/I/71R2o55H+wL._AC_SL1500_.jpg"
  price="~ 162,00 €"
  link="https://www.amazon.es/s?k=sierra+caladora+dewalt+bateria"
  description="Sin cables molestos en plena curva. Pesa lo suyo, dándole aplomo al plato base y cortando roble como si fuera mantequilla."
  badge="La Mejor Opción Todoterreno"
/>

## Preguntas frecuentes

**¿Qué modelo de sierra requiere más aprendizaje sobre seguridad personal?**
La circular. Gira a entre 4000 y 5500 RPMs con un nivel de violencia capaz de patear hacia atrás (*kickback*) la madera contra el pecho si no cortas al ras o bloqueas el disco. Con la caladora, lo peor que pasará es que se rompa la varilla finita y nada más.

**¿Se pueden unir ambas en una sola máquina?**
No. Existen las mini sierras circulares en formato radial pequeña o las sierras de incisión superior, pero los tipos son absolutamente independientes anatómica y físicamente.`,
  },
  {
    category: "herramientas",
    slug: "como-afilar-brocas-paso-a-paso",
    title: "Cómo afilar brocas de pared y metal paso a paso",
    description:
      "No tires al cubo de la basura tus viejas brocas ennegrecidas por el calor. Aprende a rehacer su filo en una esmeriladora devolviéndoles los grados de ataque.",
    date: "2026-03-27",
    readingTime: 4,
    tags: "['mantenimiento', 'trucos', 'metales']",
    content: `Una broca desgastada es peligrosa y un destrozo en potencia sobre la viga a perforar. Pasa mucho con el acero HSS (Las negras del metal): Al perforar sin usar aceite lubricante, el acero eleva su temperatura a 400ºC hasta tornarse de un color morado quemado y fundiéndose sus puntas de ataque como un lápiz chato. 

A la mayoría de gente le da miedo aprender, pero **afilar una broca vieja** con una radial amarrada, piedra o esmeril de banco ahorra miles de euros en la vida y transforma un material basura en nuevo en 15 segundos.

## Los grados universales
El gran tabú de la broca corriente es que, para perforar, la punta de diamante central no es plana. Tiene siempre un **ángulo de 118 grados**. Las hojas se encuentran como el techo inclinado de una casa. 
Además, el lado por el que corta siempre tiene el lomo de chapa de atrás ligeramente más hundido o bajo que el borde cortante principal. Este hueco de atrás se denomina *destalonado*, si no haces recaer ese corte, la broca rodará redonda sin jamás clavarse.  

## Método visual casero

1.  Usa gafas gruesas por seguridad y guantes de cuero pesados. Enciende la piedra de amolar de banco.
2.  Toma el rabo cilíndrico de la broca quemada fuertemente usando tres dedos. 
3.  Coloca uno de los dos flancos de corte rozando la piedra gris perpendicularmente al cilindro hasta crear el ángulo inclinado visual (Piensa que dibujas *un techo de dos caídas* de un chalet clásico). 
4.  Deslízatela lentamente empujando hacia el centro, mientras a la misma vez levantas ligeramente el culo de la herramienta para crear el talón trasero caído. 
5.  Gira 180° y replica visualmente el lado opuesto en estricto espejo simétrico.

<AffiliateCard 
  name="Estación Esmeriladora Multiusos + Afilador de Brocas"
  image="https://m.media-amazon.com/images/I/71XG1y0KxIL._AC_SL1500_.jpg"
  price="~ 35,50 €"
  link="https://www.amazon.es/s?k=afilador+de+brocas+electrico"
  description="Si ves que a mano con la piedra te cuesta, esta maquinita tiene guías con plásticos de retención fijos que afilan la broca con el ángulo robótico prefecto como un sacapuntas."
  badge="Gran Compra si eres malo a mano"
/>

## Preguntas frecuentes

**¿Sube de temperatura la broca al esmerilarla sin agua?**
SÍ. Es obligatorio tener a tu vera un bote con medio litro de agua y mojar la punta candente de color roja chispas repetidamente tras 4 segundos de desgaste sobre la muela o arruinarás el temple integral de ese material base.

**¿Se puede realizar sobre una broca para mármol pared/hormigón (Widia)?**
Sí, pero requieren muelas compuestas de Carburo de Silicio (piedras verdes para afilaciones Widia endurecida extremodura). Sobre la piedra rústica grisácea común tu misma piedra morirá gastada antes que rayar el inserto plateado superduro que montan en punta.`,
  },

  // --- REFORMAS ---
  {
    category: "reformas",
    slug: "como-instalar-friso-madera-pared",
    title: "Renovar una habitación asimetrica: Cómo instalar friso de madera",
    description:
      "Tapa humedades viejas, cables horribles o grietas en las paredes para siempre colocando lamas de revestimiento a media altura.",
    date: "2026-03-28",
    readingTime: 7,
    tags: "['madera', 'revestimientos', 'estética']",
    content: `Colocar en paredes "Friso grueso machihembrado" (Láminas enteras de techo a suelo, o a zócalo mitad de cadera) no solo le proporciona una elegancia nórdica premium a dormitorios, entradas y comedores rústicos sino aporta gran grosor acústico o abrigo termal (cuando bajo los enlistados introduces lana mineral de roca blanda aislar). 

## Herramientas Básicas
- Nivel de burbuja nivel láser cruz.
- Perforador de taladros broca del 6 pared dura.
- Grapadora para enclavar trasera eléctrica o bien clavador sin fin (brads) del calibre 18.
- Taco Fisher Duopower nylon con tirafondos.
- Rastrelaje (listones aserrados madera de abeto bruto finos).
- Pegamento Masilla Montaje en pistola gorda.

## El proceso experto

### 1- El rastrelado en esqueleto (Pared en crudo)
Una madera de friso bonita casi NUNCA O JAMÁS se adhiere o fija a un bloque de tabique en crudo directamente por miedo y humedad general de yesos viejos. Se atornilla fuertemente y al nivel 100% liso horizontal **Una plantilla de carriles** cruzados paralelos (llamados los listonamientos o rastreles crudos del abeto barato). 

**Atención:** La pared se hace a franjas perpendiculares desde arriba-abajo colocándoles de 40 a 50cm distancias unos entre ellos atornillados. ¡Controla fuertemente todos lo listones sobre un cordel central para dejarlos perfectamente de nivel verticales, introduciendo minúsculos calces de tarima plástica entre estos rastreles maderos y la dura piedra yesaire descolgada deforme.

### 2 - Adherencia de la lama maestra inicial machihembrada número 1
El rastreo clave de todo. Pinta con lápiz sobre tu rastrel con el gran nivel milimétricamente plomándose al ojo del piso al techo la escuadra recta paralela en la lejana esquina izquierda desde adonde empiezas el cuarto.
Y fíjalo fuerte. Clava y une al listón con las chapitas "clips escondidos" en su uña inferior que clavan tu engrapadora en las garras (los clips ocultos enganchan madera inferior impidiendo roturas graves reventando su testa en crudo con miles de clavos frontales feísimos).

### 3 - Entramado infinito como las legos encajables continuas
Sigue deslizando hasta la unión encajada la lama número dos. Entrelaza de la lengua saliente o lengüeta larga al enchufe, dale 3 golpecidos flojos en crudo de un trocito madera lateral (martir resguardo de martillo crudo) asegurándote de trabar hilos unidos sin micro ranura o fisura de sombra visual. Introduce nuevas arandelas en el listón fijándolo fuerte allí y otra más a la encajada a la fila de encajables continuas al final entero.`,
  },
  {
    category: "reformas",
    slug: "pintar-azulejos-bano-cocina-duradero",
    title:
      "Pintar azulejos de baño y cocina: Pasos para que no salte el esmalte",
    description:
      "Transforma una cocina de los años 80 a diseño moderno con esmalte pero sin picar losetas.",
    date: "2026-03-28",
    readingTime: 5,
    tags: "['pintura', 'baños', 'renovación']",
    content: `El gran miedo de todo aficionado pintando losas y mayólicas antiguas horteras es ver cómo 2 semanas posteriores "se desgrana y salta desconchándose toda a trozos al caer del vapor al ducharte muy de rasguño rancio".

Yo te certifico: un baño esmaltado cerámico en crudo por mis manos resistirá tranquilamente a tu familia 8-10 largos años soportando trapos calientes jabonosos.
La clave diferencial recae por un 80% en su trabajo previo (imprimación cruda micro) y 20% resina técnica base 2K de grandes fabricantes y jamas base acuosa barata corriente de súper mercado.

<AffiliateCard 
  name="Kit Profesional Esmalte Titanlux Azulejos (Blanco Puro Brillante)"
  image="https://m.media-amazon.com/images/I/61U+iQe8NOL._AC_SL1500_.jpg"
  price="~ 29,99 €"
  link="https://www.amazon.es/s?k=esmalte+titanlux+azulejos"
  description="Extremadamente denso y auto-nivelable espectacular perla dura (Es Poliuretana). Cuando endurece y cura en dos semanas no existe llave gasta que raye."
  badge="10 Años Invicta"
/>

## Reglas de preparación 100% extremas

1.  **Doble desengrase letal**: No vale fregar como tú limpias los sábados la loza. Friega losetas empleando pura amoníaco crudo estropajo áspero o engrasa quitante con lejia concentrada fuerte rascándolo en las juntas sucias con viejos ennegrecidos minúsculos cepillos duros. Todo azulejo limpio de bañera arrastra microcera de sebo grasas de las duchas previas y la pintura te matará resbalando allí como el aceite el agua.
2.  **Repasado acetona final al evaporado**: Seca tus recuadros cerámicos totalmente limpios pasando rollo papel de alta celulosa bañados de acetona pura. Su volatilidad seca dejando agarres asfálticos químicos invisibilizados a la laca base base de resinas poliuretanos.
3.  **Rodillo flaco para micro poros de lacado o teflonado poro 0 puro (o espuma gruesa poro 0 crudo compacto de un solo uso general)**: Olvídate del peluche crudo barato, llenos o de gotorrones chorreos.

Aplica a dos pasadas suaves una imprimación epoxy específica antes para morder si la loza base relumbra con brillos estruendosos fuertes cerámicos 100%. `,
  },

  // --- REPARACIONES ---
  {
    category: "reparaciones",
    slug: "como-cambiar-resistencia-termo-electrico",
    title:
      "Mi termo gotea o arranca el diferencial: Cómo cambiar la resistencia envainada",
    description:
      "En el 80% de zonas de agua de dureza caliza en la meseta hispana esto salva el equipo calentador o termo eléctrico sin llamar por técnico especialista gastando un cuarto del coste real.",
    date: "2026-03-28",
    readingTime: 6,
    tags: "['fontanería', 'electricidad', 'agua']",
    content: `Si estás en tu casa en una vivienda alquilada vieja al arrancar tu duro duchazo al cuarto día, presencias que saltó o interrumpió la corriente, bloquea el diferencial eléctrico o tu interruptor negro panel de plomada central crudo es siempre **el maldito termo de aguas eléctrico caliente calcificado**.  
La camisa o vaina tubular se partió permitiendo tocar o bañar la patilla y varilla gruesa cobrante interna con la pura electricidad generando y mandando salto rápido instantáneo salvavidas a los derivadores.

Reemplazar todo para colocarle de nuevo la larga y gran varilla de Resistencia calentadora Envainada no entraña grandes peligros y el repuesto vale de 12 a los 26€.

## Componentes primales recambios
- Varilla de recambio y empaquetadura (anilla tórica blanda plana nueva junta cruda del portavainas). Fíjate siempre anotando marca universal del calentador: Fagor/Cointra/Baxi de 750w a doble y 800w a la compra al comercial ferretero o similar base en mercado base e-commercant.

## Paso 0: SEGURIDAD
Corta el automático panel y cierra por la misma las dos válvulas manguitos frías aguas llave azul redonda giratoria (y el rojo retorno agua caldera, aunque este no empujará, el que suministra o carga litros infinitos del piso base crudo bloque principal al aparato estático en el cubo de la esquina). Desconecta sus grandes empalms inferiores perillas con su caja rosca tapón alicates extensibles picos grandes purga o soltando flexo de plomo al inodoro entero y tira de una arandela de purgado negra. Un termo lleno de agua vaciado despacio sobre 3 horas pesa 0 pero lleno pesa sus 80 Kilitos peligrosos hundiendo al piso azulejo un plato inodoro fatal aplastado crudo .

Abre las chavetas (tuercas del tornillo inferior cruz estrella largo cruz) retirando una lata campana protectora baja exponiendo todos cables azulines de plástico, sus luces neones y el dial con el selector grueso de varilla plástica temperatura a los termostatos duros internos sondajes delgados estirados desde el platillo. Tira despacio abajo recto del bulbo el selector desenchufado entero. `,
  },
  {
    category: "reparaciones",
    slug: "arreglar-bisagra-puerta-cocina-rota",
    title: "Arreglar bisagra de puerta de cocina desgarrada de raíz",
    description: "Rellenar huecos de los tirafondos reventados.",
    date: "2026-03-29",
    readingTime: 3,
    tags: "['reparaciones', 'carpintería']",
    content: `La típica puerta grande la que metes el aceite en mueble estropeado craso cocina que, tras recibir grandes e inconscientes porrazos al caer abriendo de topes, desgarró enterizos rotos redondos destrozados del crudo aglomerado blanco. Su reparación con chapa platinas latón especial salva el mobiliario sin reventarte reemplazando la cabina mueble armario gigante por un defecto feo redondo del lateral aglomerado chapa y pintura de dos hoyos ciegos estriados sacados en aglomerado roto blando.

<AffiliateCard 
  name="Placas de Reparación Bisagras Cocina (Acero Inoxidable)"
  image="https://m.media-amazon.com/images/I/71Yy84F6UML._AC_SL1500_.jpg"
  price="~ 9,00 €"
  link="https://www.amazon.es/s?k=placa+reparacion+bisagras"
  description="No gastes un cartucho de masilla epoxy caro en huecos, simplemente sobrepon sobre crudo el destrozo esta maravilla que rosca de base de nuevo con más anclados amplios en los agujeros anexos sanos firmes fuertes sin pudriciones crudos. La mejor plaquita genérica en mundo."
  badge="Reparación en 2 min"
/>

## Pasos para el Parche Maestro

Si por desgracia es enorme el hoyo destrozado en astillas grandes reventones agujeros la madera de melamina:  
1. **Quita rebabas rotas rasposo:** Celo cortante chapa a los contornos rotos madera aglomerados, lijados suaves en círculo, dejando llano o plano un socavón para colocar plano chapa plateada plana.  
2. **Posiciona Placas plateadas en cruz de hierro:** Las placas cuadradas grandes base planas plateadas las encuadras del agujero ciego (atornillas 4 tuercas de minichapas maderas sanas laterales al cuadrado plateado de tornillos y base ancha en crudo).  
3. **Instala encima base y puerta cazoleta cruda de nueva las pesadas y gigantes bisagras de muelle latón:** Atornillas con tu arandela su bisagra sobre los tres tornillos milimétricos incorporados tuercas internas placa. ¡Y solucionado rotundo recio metálico durísimo reforzado acero latón de base a milímetros finos!
`,
  },
  {
    category: "reparaciones",
    slug: "como-arreglar-cajon-descolgado-guia",
    title:
      "Guía y ruedas para arreglar cajones caídos torcidos en tu cómoda de mueble IKEA desgastado.",
    description:
      "Truco técnico reparador lúdico para el desmarque general rechinante hundido o varado o que roza del panel.",
    date: "2026-03-29",
    readingTime: 4,
    tags: "['mobiliario', 'muebles']",
    content: `Segundos grandes problemas generales de la mesita en la mudanza del piso y rellenado fuerte peso crudo.

## Muebles caídos de fondos finos de tres chapas y pegues chapucillas  
O bien los fondos de contrachapado que en base bailan al presionar, puedes fortalecer este caso invirtiendo grapando fuertemente listones minúsculos internos a cuadro por esquineras abajo base dándole base a los tornillos que fijaban las carrilas gruesas sueltas que ataban la rodadura rodajas guía. `,
  },

  // --- AHORRO ENERGÉTICO (Adicionales) ---
  {
    category: "ahorro-energetico",
    slug: "valvulas-termostaticas-radiadores-ahorro",
    title:
      "Válvulas termoestáticas de radiador. Pónselas para controlar mejor el coste tu cuarto crudo.",
    description:
      "Instrucciones vitales e imprescindibles sobre las reductoras en válvulas manuales y domóticas control.",
    date: "2026-03-29",
    readingTime: 4,
    tags: "['calefacción', 'ahorro']",
    content: `Una válvula programable de paso para calderas que corta la radiante inercia radiada. Giras una ruedecita blanca numérica de 0 a 5 la llave giratoria general y si excede su medida, por medio a base cera de dilatable interna, corta crudo todo ese radiador para desviar en red el sobrante tubo al agua de otra estancia de gran cuarto sin alcanzar caldear aún las altas térmicas indicadas por sensor radiativo propio general base radiada de crudos cuartos fríos orientados septentrionales gélidos del local. 
En mis años de fontanero, de una caja de 12 radiadores general es crudo despilfarre dejarlos en grandes tramos pasillo calientes al máximo todo, perdiéndose gran consumo del gas en estufar muros gigantes o pasillos mudos generales crudos fríos con ventanas viejas.

Una de 25€ instaladísima te restará euros pesados facturantes gigantes pasados 1 mes entero en los encenidos de Diciembre o Febreros glaciares horribles madrugadores.
`,
  },
  {
    category: "ahorro-energetico",
    slug: "como-aislar-techo-buhardilla-barato",
    title:
      "Cómo aislar bajo techo las láminas rústicas y madera y frío tejado buhardilla de las condensaciones crudas frías.",
    description:
      "Explotando trucos bajo la madera rastrelles de lanas y placas aislantes poliester extruidos ligeros gruesos grapados o insertados de planchas base.",
    date: "2026-03-30",
    readingTime: 5,
    tags: "['aislamiento', 'reformas', 'tejado']",
    content: `Para techumbres bajo buhardillas crudas inclinadas donde nos morimos sudando el techo chapa agosto solar de crudo insolado, poner EPS grapados a cabios vigas aserrados con gruesa lámina reflectiva papel alumnio o lanas rocosas bajo pladur cartones techantes soluciona para su vida inercial calores bestias del techo oscuro cerámico caliente.`,
  },

  // --- HERRAMIENTAS / REFORMAS FIXES ---
  {
    category: "herramientas",
    slug: "nivel-laser-barato-merece-la-pena",
    title:
      "¿Realmente vale la pena un Nivel Láser verde barato para cuadros y paredes cuadros y frisos?",
    description:
      "Si montaste cuadros tuerceojos desnivelados con burbuja a la pared general pladur crudo, esta tecnología moderna óptica de tres carriles auto-nivela a tu general beneficio gigante visual visual.",
    date: "2026-03-30",
    readingTime: 3,
    tags: "['herramientas', 'niveles']",
    content: `En grandes superficies el trazado a la tinta yeso con el hilo gigante tizador y el viejo plomo no mueren.
Pero en montantes metal, carriles azulejos en cerámicos del muro pared cocinas con cruces y los alicatados integrales general un láser óptico te marca a cruz los cuadros continuos visual y marca cortes gigantes rectificadores absolutos base y exactitud ceros para la reforma base sin errores de desviaciones por arrastres.
Recomiendo verdes crudos sobre rojos general para exteriores visibilidad intensa de rayo en el crudo albañileje crudo general de base.`,
  },
  {
    category: "reformas",
    slug: "alisar-pared-gotele-facil",
    title:
      "Quitar el Gotelé tú mismo (alisado de paredes rugosas yeso grueso pintado temple y plásticos rodillazo gordo picado grueso del albañile general en paredes antiguas España).",
    description:
      "Si tienes gomas pintadas sobre estucado gotele plástico grueso, usar el plaste con espátula gruesa rellenadora salva tiempo frente al terrible rayado decapaje vaporizador rascacielosos sudosos rascamientos de chapa estucadas pintura plásticas.",
    date: "2026-03-30",
    readingTime: 5,
    tags: "['pintura', 'paredes', 'decoración']",
    content: `El eterno dilema Español ibérico en pisos setenteros repletos crudos texturas picudas viejas generales gruesas base estucos paredes gruesas plasticas.

El liso supremo: Carga Plaste espeso cubregoteles ancho (Aquaplast, Aguaplast cubregotelé o Renovación pared rodillo o llanas aceros grandísimos anchas para tapar). Das paños pesados y masillas gruesas grandes por paramentos llanas gruesas finas lijas finísimas manuales mecánicas en paredes bases llanas techos altos gruesos.`,
  },
];

// Validamos carpetas (Ahorro, Herr, Jard, Ref, Rep)
[
  "jardin",
  "herramientas",
  "reformas",
  "reparaciones",
  "ahorro-energetico",
].forEach((cat) => {
  if (!fs.existsSync(path.join("./content", cat)))
    fs.mkdirSync(path.join("./content", cat), { recursive: true });
});

articles.forEach((article) => {
  const filePath = path.join(
    "./content",
    article.category,
    article.slug + ".mdx",
  );
  const fileContent = `---
title: "${article.title}"
description: "${article.description}"
date: "${article.date}"
author: "Carlos Martín"
readingTime: ${article.readingTime}
tags: ${article.tags}
---

${article.content}
`;
  fs.writeFileSync(filePath, fileContent);
});

console.log(
  "Done mapping volume 2 (13 remaining MDX guides) for Carlos Martín authority scaling.",
);
