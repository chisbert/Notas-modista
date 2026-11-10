# Sistema Profesional de Notas de Entrega y Presupuestos (Maturana Decorhogar)

Aplicación web profesional para la emisión, gestión e impresión de **Notas de Entrega** (conmutables a **Presupuesto**) respetando al milímetro la estructura, cabecera y membrete de **Maturana Decorhogar**, con cálculo automático, edición en vivo y recuadro oficial de recepción conforme.

---

### Decisiones Críticas y Preferencias Confirmadas

> [!IMPORTANT]
> Se han incorporado las directrices exactas confirmadas en la fase de clarificación:
> 1. **Tipo de Documento**: Modalidad predeterminada en **Nota de Entrega**, con selector inmediato para cambiar a **Presupuesto**.
> 2. **Identidad Comercial**: Datos iniciales precargados con la información real de **Maturana Decorhogar** (Avda. Palomeras 129, Madrid, teléfonos, web, email y NIF de María Maturana Asensio), con panel para editar o personalizar los datos en cualquier momento.
> 3. **Cierre de Entrega**: Recuadro limpio y profesional de **Firma de recepción conforme** (con campo de fecha, DNI/Nombre del receptor y espacio de firma).

---

## 1. Visión General y Concepto Central

- **Propósito**: Digitalizar el talonario físico tradicional de notas de entrega y presupuestos de Maturana Decorhogar en un entorno interactivo y preparado para impresión A4 / exportación PDF impecable, evitando cálculos manuales y pérdidas de información.
- **Público Objetivo**: Responsables de taller y comerciales de confección e instalación de cortinas, estores, edredones y tapicería para entregas a domicilio y presupuestos a clientes.
- **Valor Principal**:
  - Réplica fiel del formato gráfico original (distribución en 3 bloques de cabecera, tipografía técnica sobria, bordes definidos, NIF vertical).
  - Cálculo instantáneo de cantidades, precios unitarios, subtotales, IVA configurable (0%, 10%, 21%) y total en euros.
  - Vista previa en tiempo real estilo hoja de papel A4 y modo de impresión directa (Ctrl+P / Imprimir) sin elementos superfluos de la interfaz.

---

## 2. Experiencia de Usuario y Diseño Visual

### Flujos Clave de Usuario
1. **Edición Rápida del Documento**:
   - Selector de tipo: `Nota de Entrega` o `Presupuesto`.
   - Asignación de Número de documento (ej. `NE-2026-0042` o `P-2026-0018`) y fecha.
   - Datos del cliente: Nombre completo, Teléfono, Dirección de entrega / domicilio y Población.
   - Tabla de conceptos interactiva: Añadir filas, reordenar, ingresar Cantidad, Concepto detallado (ej. "Confección e instalación de estores noche y día salón"), Precio Unitario y cálculo reactivo del Total.
2. **Cierre y Conformidad**:
   - Recuadro estricto de recepción conforme: "Recibí / Conforme el Cliente", con campos para fecha de recepción, firma y observaciones de entrega (ej. "Material instalado a satisfacción").
   - Opciones de impuestos (con desglose de Base Imponible, % IVA y Total Neto).
3. **Impresión y Exportación**:
   - Botón directo de **Imprimir / Guardar como PDF** que activa `@media print` optimizado a tamaño folio/A4 exacto, ocultando barras de herramientas.
4. **Historial y Guardado Local**:
   - Guardado automático en el navegador (localStorage) para no perder borradores.
   - Listado de notas emitidas para consultar, duplicar o editar con un clic.

### Identidad Visual y Estilo
- **Paleta de Color**:
  - Lienzo de trabajo: Gris neutro suave (`#F8FAFC` / `bg-slate-100`) para resaltar la hoja de papel blanca.
  - Documento: Blanco puro (`#FFFFFF`) con bordes en negro tinta (`#0F172A`) de 1px a 1.5px según el rayado original.
  - Acentos de interfaz: Azul marino profesional (`#1E3A8A` / `#2563EB`) para botones de acción primaria (Nuevo, Guardar, Imprimir).
- **Tipografía**:
  - Títulos y rótulos del documento: `Plus Jakarta Sans` y fuente condensada de alta legibilidad que reproduce la sobriedad del talonario impreso.
  - Cifras monetarias y cantidades: Fuente con cifras tabulares (`tabular-nums`) para alineación decimal perfecta.
- **Estructura Fiel al Original**:
  - **Margen izquierdo vertical**: "MARIA MATURANA ASENSIO N.I.F.: 51.899.462-P" girado 90°.
  - **Cabecera Izquierda**: Logotipo estilizado de cortinas y texto "MATURANA DECORHOGAR - VESTIMOS SU HOGAR".
  - **Cabecera Central**: Dirección (Avda. Palomeras, 129, 28018 Madrid), teléfonos con icono de WhatsApp, web y email.
  - **Cabecera Derecha**: Lista de especialidades ("CONFECCIONAMOS E INSTALAMOS CORTINAS, EDREDONES, ESTORES...").
  - **Caja de Número**: Recuadro superior derecho con el rótulo "NOTA DE ENTREGA Nº:" (o "PRESUPUESTO Nº:").
  - **Datos del Cliente**: Líneas punteadas elegantes para Cliente, Tel. y Domicilio.
  - **Cuerpo**: Tabla cuadriculada con columnas Cant., C O N C E P T O, Precio Unitario y TOTAL.

---

## 3. Decisiones Técnicas y de Producto

```
┌────────────────────────────────────────────────────────┐
│                   INTERFAZ PRINCIPAL                   │
├───────────────────────┬────────────────────────────────┤
│   BARRA LATERAL       │       HOJA DE DOCUMENTO        │
│   (Controles &        │         (VISTA PREVIA A4)      │
│    Historial)         ├────────────────────────────────┤
│                       │  [Membrete Maturana Decorhogar] │
│ • Tipo: Entrega/Ppto  │  [Nº Doc y Fecha]              │
│ • Datos del Emisor    │  [Datos Cliente y Domicilio]   │
│ • Cargar Plantilla    │  [Tabla de Conceptos & Precios]│
│ • Guardar / Duplicar  │  [Totales & Desglose IVA]      │
│ • Imprimir PDF        │  [Recuadro Recepción Conforme] │
└───────────────────────┴────────────────────────────────┘
```

1. **Enfoque de Diseño Híbrido (Editor + Hoja Viva)**:
   - Los campos pueden editarse directamente sobre la hoja o mediante un panel lateral accesible, permitiendo que el usuario vea exactamente cómo saldrá impreso mientras escribe.
2. **Impresión CSS Nativa vs Generación de PDF**:
   - Usar reglas CSS `@media print` de precisión milimétrica (márgenes cero de página, `@page { size: A4 portrait; margin: 12mm; }`), lo que garantiza que `window.print()` genere un PDF vectorial sin borrosidad ni dependencias externas pesadas.
3. **Persistencia de Datos**:
   - Almacenamiento en `localStorage` con soporte para historial de notas, autoincremento de número de nota y carga de ejemplos prediseñados de decoración (cortinas, rieles, estores).

---

## 4. Plan de Ejecución por Fases

1. **Fase 1: Configuración Base y Activos Gráficos**:
   - Actualización de metadatos del proyecto (`metadata.json`, `index.html`).
   - Recreación vectorial SVG del isotipo de cortinas/dosel de Maturana Decorhogar para máxima nitidez en impresión y pantalla.
2. **Fase 2: Modelo de Datos y Estado**:
   - Definición de tipos TypeScript para `DeliveryNote`, `CompanyData`, `LineItem`, `CustomerInfo`.
   - Carga inicial de datos de Maturana Decorhogar y plantilla de ejemplo realista de confección de cortinas.
3. **Fase 3: Componente del Documento (Hoja A4)**:
   - Cabecera proporcional idéntica al documento físico, texto NIF vertical, caja de número, líneas de cliente punteadas.
   - Tabla dinámica de partidas con inserción, borrado, formato de moneda en euros y cálculos automáticos.
   - Bloque de cierre con recuadro oficial de recepción conforme ("Recibí / Conforme el Cliente").
4. **Fase 4: Barra de Herramientas y Gestión**:
   - Selector interactivo entre Nota de Entrega y Presupuesto.
   - Modal para editar datos comerciales (dirección, teléfonos, NIF).
   - Historial de documentos guardados con búsqueda y opciones de duplicar/nueva nota.
   - Acciones de impresión directa y exportación.
5. **Fase 5: Verificación y Calidad**:
   - Comprobación de compilación, linter y fidelidad visual en modo pantalla e impresión.
