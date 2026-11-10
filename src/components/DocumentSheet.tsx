import React, { useRef, useState, useEffect } from 'react';
import { DeliveryDocument, LineItem } from '../types';
import { CurtainLogo } from './CurtainLogo';
import { Plus, Trash2, Globe, Mail, Phone, Eraser, CheckCircle2 } from 'lucide-react';

interface DocumentSheetProps {
  doc: DeliveryDocument;
  onChange: (updated: DeliveryDocument) => void;
  onAddItem: () => void;
  onRemoveItem: (id: string) => void;
  isEditable?: boolean;
}

export const DocumentSheet: React.FC<DocumentSheetProps> = ({
  doc,
  onChange,
  onAddItem,
  onRemoveItem,
  isEditable = true,
}) => {
  const signatureCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasSignature, setHasSignature] = useState(false);

  // Calculate totals
  const subtotal = doc.items.reduce((sum, item) => sum + (Number(item.total) || 0), 0);
  const taxAmount = doc.includeTax ? (subtotal * doc.taxRate) / 100 : 0;
  const grandTotal = subtotal + taxAmount;

  // Handle line item update
  const handleItemChange = (id: string, field: keyof LineItem, value: string) => {
    const updatedItems = doc.items.map((item) => {
      if (item.id !== id) return item;

      const updated = { ...item, [field]: value };
      if (field === 'quantity' || field === 'unitPrice') {
        const qty = parseFloat(field === 'quantity' ? value : item.quantity) || 0;
        const price = parseFloat(field === 'unitPrice' ? value : item.unitPrice) || 0;
        updated.total = Math.round(qty * price * 100) / 100;
      }
      return updated;
    });

    onChange({
      ...doc,
      items: updatedItems,
      updatedAt: new Date().toISOString(),
    });
  };

  // Signature canvas setup
  const clearSignature = () => {
    const canvas = signatureCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasSignature(false);
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = signatureCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    setIsDrawing(true);
    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

    ctx.beginPath();
    ctx.moveTo(clientX - rect.left, clientY - rect.top);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = signatureCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.strokeStyle = '#0f172a';
    ctx.lineTo(clientX - rect.left, clientY - rect.top);
    ctx.stroke();
    setHasSignature(true);
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  // Number of minimum ruled rows to mimic the traditional lined pad
  const minimumRows = Math.max(14, doc.items.length);
  const emptyRowsNeeded = Math.max(0, minimumRows - doc.items.length);

  return (
    <div className="w-full flex justify-center py-4 px-2 print:p-0">
      {/* A4 Sheet Container */}
      <div className="print-sheet relative bg-white text-slate-900 shadow-xl border border-slate-300 w-full max-w-[850px] min-h-[1130px] p-6 sm:p-10 font-sans print:shadow-none print:border-none print:w-full print:max-w-none print:p-2">
        
        {/* Left vertical border text: exactly matching the physical document */}
        <div className="absolute left-1 top-28 bottom-28 w-6 flex items-center justify-center select-none pointer-events-none">
          <div
            className="transform -rotate-90 whitespace-nowrap text-[10px] sm:text-[11px] font-bold tracking-widest text-slate-700 uppercase"
            style={{ transformOrigin: 'center center' }}
          >
            {doc.company.ownerName} &nbsp; C.I.F.: {doc.company.nif}
          </div>
        </div>

        {/* Main Document Content inside margin */}
        <div className="pl-6 sm:pl-7">

          {/* TOP HEADER: 3-column reproduction of Maturana Decorhogar */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center pb-4 border-b border-slate-400">
            
            {/* Col 1: Stylized Curtain Logo & Brand (4 cols) */}
            <div className="md:col-span-4 flex flex-col items-center justify-center text-center">
              <CurtainLogo
                className="w-40 sm:w-48 h-auto"
                brandName="MATURANA"
                slogan={doc.company.slogan}
              />
            </div>

            {/* Col 2: Central Business Coordinates (4 cols) */}
            <div className="md:col-span-4 text-center text-xs text-slate-800 space-y-1 py-1">
              <div className="font-bold text-sm text-slate-900 tracking-wide">
                {doc.company.address}
              </div>
              <div className="font-semibold text-slate-700">
                {doc.company.cityPostal}
              </div>
              <div className="flex items-center justify-center gap-1 font-bold text-slate-900 pt-0.5">
                <Phone className="w-3.5 h-3.5 text-slate-700" />
                <span>Tels.: {doc.company.phones}</span>
              </div>
              <div className="flex items-center justify-center gap-1 text-[11px] text-slate-700">
                <Globe className="w-3 h-3 text-slate-500" />
                <span>{doc.company.website}</span>
              </div>
              <div className="flex items-center justify-center gap-1 text-[11px] text-slate-700">
                <Mail className="w-3 h-3 text-slate-500" />
                <span>{doc.company.email}</span>
              </div>
              {doc.company.social ? (
                <div className="text-[10px] text-slate-600 font-medium">
                  {doc.company.social}
                </div>
              ) : null}
            </div>

            {/* Col 3: Services & Specialties block (4 cols) */}
            <div className="md:col-span-4 text-center text-[10.5px] font-bold text-slate-800 leading-tight space-y-0.5 border-l border-slate-300 md:pl-2">
              {doc.company.servicesTagline.map((line, idx) => (
                <div
                  key={idx}
                  className={idx === 0 ? 'text-slate-950 font-black' : idx === doc.company.servicesTagline.length - 1 ? 'pt-1 font-black tracking-widest text-slate-950' : 'text-slate-700'}
                >
                  {line}
                </div>
              ))}
            </div>
          </div>

          {/* DOCUMENT TITLE & DATE ROW */}
          <div className="flex flex-col sm:flex-row items-end justify-between gap-4 pt-3 pb-2">
            
            {/* Quick document switcher indicator */}
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase tracking-wider text-slate-500 font-medium">
                Estado:
              </span>
              <span className="inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-800 border border-slate-300">
                <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                {doc.type === 'NOTA DE ENTREGA' ? 'Albarán Oficial de Entrega' : 'Presupuesto Comercial'}
              </span>
            </div>

            {/* Boxed Document Number and Date area */}
            <div className="flex flex-col items-end gap-1.5">
              <div className="flex items-center gap-2">
                <span className="text-base sm:text-lg font-black tracking-wider uppercase text-slate-900">
                  {doc.type} Nº.:
                </span>
                {/* Rectangular box just like the paper format */}
                <div className="border-2 border-slate-900 px-3 py-1 bg-white min-w-[150px] text-center shadow-inner">
                  <input
                    type="text"
                    value={doc.number}
                    onChange={(e) =>
                      onChange({ ...doc, number: e.target.value, updatedAt: new Date().toISOString() })
                    }
                    className="w-full text-center font-mono font-bold text-base sm:text-lg tracking-wider text-slate-900 bg-transparent focus:outline-none"
                    placeholder="NE-2026-001"
                  />
                </div>
              </div>

              {/* Date line with dots */}
              <div className="flex items-center gap-1 text-sm font-semibold text-slate-800">
                <span className="italic">Fecha:</span>
                <input
                  type="text"
                  value={doc.date}
                  onChange={(e) =>
                    onChange({ ...doc, date: e.target.value, updatedAt: new Date().toISOString() })
                  }
                  className="font-mono text-sm font-bold border-b border-dashed border-slate-700 focus:outline-none text-center px-2 py-0.5 min-w-[120px]"
                  placeholder="DD/MM/AAAA"
                />
              </div>
            </div>
          </div>

          {/* CUSTOMER INFORMATION FIELDS (Classic dotted-line format) */}
          <div className="space-y-2 py-3 border-t border-b border-slate-400 my-2">
            {/* Line 1: Cliente & Tel. */}
            <div className="flex flex-col sm:flex-row items-baseline gap-2 w-full">
              <div className="flex items-baseline gap-2 flex-1">
                <label className="text-sm font-bold italic text-slate-800 whitespace-nowrap">
                  Cliente:
                </label>
                <input
                  type="text"
                  value={doc.customer.name}
                  onChange={(e) =>
                    onChange({
                      ...doc,
                      customer: { ...doc.customer, name: e.target.value },
                      updatedAt: new Date().toISOString(),
                    })
                  }
                  className="w-full text-sm font-semibold text-slate-900 border-b border-dashed border-slate-500 focus:outline-none focus:border-slate-900 bg-transparent py-0.5 px-1"
                  placeholder="Nombre y apellidos del cliente..."
                />
              </div>
              <div className="flex items-baseline gap-2 min-w-[200px]">
                <label className="text-sm font-bold italic text-slate-800 whitespace-nowrap">
                  Tel.:
                </label>
                <input
                  type="text"
                  value={doc.customer.phone}
                  onChange={(e) =>
                    onChange({
                      ...doc,
                      customer: { ...doc.customer, phone: e.target.value },
                      updatedAt: new Date().toISOString(),
                    })
                  }
                  className="w-full text-sm font-semibold font-mono text-slate-900 border-b border-dashed border-slate-500 focus:outline-none focus:border-slate-900 bg-transparent py-0.5 px-1"
                  placeholder="600 000 000"
                />
              </div>
            </div>

            {/* Line 2: Domicilio */}
            <div className="flex items-baseline gap-2 w-full">
              <label className="text-sm font-bold italic text-slate-800 whitespace-nowrap">
                Domicilio:
              </label>
              <input
                type="text"
                value={doc.customer.address}
                onChange={(e) =>
                  onChange({
                    ...doc,
                    customer: { ...doc.customer, address: e.target.value },
                    updatedAt: new Date().toISOString(),
                  })
                }
                className="w-full text-sm font-semibold text-slate-900 border-b border-dashed border-slate-500 focus:outline-none focus:border-slate-900 bg-transparent py-0.5 px-1"
                placeholder="Dirección completa de entrega, piso, letra y población..."
              />
            </div>
          </div>

          {/* MAIN RULED TABLE: Cant. | C O N C E P T O | Precio Unitario | T O T A L */}
          <div className="mt-2 border-2 border-slate-900 rounded-none overflow-hidden bg-white shadow-xs">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="bg-slate-100 text-slate-900 text-xs sm:text-sm font-black border-b-2 border-slate-900">
                  <th className="w-[12%] py-1.5 px-2 text-center border-r-2 border-slate-900 uppercase tracking-wider">
                    Cant.
                  </th>
                  <th className="w-[56%] py-1.5 px-3 text-center border-r-2 border-slate-900 uppercase tracking-widest font-black">
                    C O N C E P T O
                  </th>
                  <th className="w-[16%] py-1.5 px-2 text-center border-r-2 border-slate-900 uppercase tracking-wider">
                    Precio Unitario
                  </th>
                  <th className="w-[16%] py-1.5 px-2 text-center uppercase tracking-widest font-black">
                    T O T A L
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-xs sm:text-sm">
                {doc.items.map((item, index) => (
                  <tr
                    key={item.id}
                    className="hover:bg-slate-50/70 transition-colors group relative"
                  >
                    {/* Cantidad */}
                    <td className="p-1 border-r-2 border-slate-900 text-center align-top">
                      <input
                        type="text"
                        value={item.quantity}
                        onChange={(e) => handleItemChange(item.id, 'quantity', e.target.value)}
                        className="w-full text-center font-mono font-bold text-slate-900 bg-transparent focus:outline-none"
                        placeholder="1"
                      />
                    </td>

                    {/* Concepto */}
                    <td className="p-1.5 border-r-2 border-slate-900 align-top">
                      <div className="flex items-start justify-between gap-2">
                        <textarea
                          rows={1}
                          value={item.concept}
                          onChange={(e) => handleItemChange(item.id, 'concept', e.target.value)}
                          className="w-full text-xs sm:text-sm font-medium text-slate-900 bg-transparent focus:outline-none resize-none leading-relaxed"
                          placeholder="Descripción detallada del material o servicio..."
                        />
                        {/* Delete row button (only in screen mode) */}
                        <button
                          type="button"
                          onClick={() => onRemoveItem(item.id)}
                          title="Eliminar fila"
                          className="no-print opacity-0 group-hover:opacity-100 text-rose-500 hover:text-rose-700 transition-opacity p-0.5 rounded"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>

                    {/* Precio Unitario */}
                    <td className="p-1 border-r-2 border-slate-900 text-right align-top">
                      <div className="flex items-center justify-end px-1">
                        <input
                          type="text"
                          value={item.unitPrice}
                          onChange={(e) => handleItemChange(item.id, 'unitPrice', e.target.value)}
                          className="w-full text-right font-mono tabular-nums font-semibold text-slate-900 bg-transparent focus:outline-none"
                          placeholder="0.00"
                        />
                        <span className="text-slate-500 text-xs ml-0.5">€</span>
                      </div>
                    </td>

                    {/* TOTAL */}
                    <td className="p-1 text-right align-top font-mono tabular-nums font-bold text-slate-950 pr-2">
                      {item.total > 0 ? item.total.toFixed(2) + ' €' : '-'}
                    </td>
                  </tr>
                ))}

                {/* Empty ruled lines to maintain the authentic blank-sheet layout of the pad */}
                {Array.from({ length: emptyRowsNeeded }).map((_, idx) => (
                  <tr key={`empty_${idx}`} className="h-7 border-b border-slate-800">
                    <td className="border-r-2 border-slate-900"></td>
                    <td className="border-r-2 border-slate-900"></td>
                    <td className="border-r-2 border-slate-900"></td>
                    <td></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Quick Add Row Button (Hidden during print) */}
          <div className="no-print flex justify-between items-center py-2">
            <button
              type="button"
              onClick={onAddItem}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-700 hover:text-blue-900 bg-blue-50 hover:bg-blue-100 border border-blue-200 px-3 py-1.5 rounded transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              Añadir Línea de Concepto
            </button>
            <span className="text-[11px] text-slate-500">
              {doc.items.length} concepto{doc.items.length !== 1 ? 's' : ''} cargado{doc.items.length !== 1 ? 's' : ''}
            </span>
          </div>

          {/* LOWER SECTION: TOTALS & RECEPCIÓN CONFORME */}
          <div className="mt-3 border-2 border-slate-900 p-3 bg-white avoid-break">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
              
              {/* Left Column: Recepción Conforme del Cliente (7 cols) */}
              <div className="md:col-span-7 flex flex-col justify-between border-b md:border-b-0 md:border-r border-slate-300 pb-3 md:pb-0 md:pr-4">
                <div>
                  <div className="flex items-center justify-between pb-1">
                    <span className="text-xs font-black uppercase tracking-wider text-slate-900">
                      Firma de Recepción Conforme
                    </span>
                    <span className="text-[10px] text-slate-500 italic">
                      Conforme el cliente
                    </span>
                  </div>
                  <p className="text-[10.5px] text-slate-700 leading-tight">
                    El cliente declara recibir a su total satisfacción los materiales y/o servicios especificados en esta {doc.type.toLowerCase()}.
                  </p>
                </div>

                {/* Receiver Info Inputs */}
                <div className="grid grid-cols-2 gap-2 my-2 text-xs">
                  <div>
                    <label className="text-[10px] uppercase font-bold text-slate-600 block">
                      Receptor / D.N.I.:
                    </label>
                    <input
                      type="text"
                      value={doc.receiverDni || ''}
                      onChange={(e) =>
                        onChange({ ...doc, receiverDni: e.target.value, updatedAt: new Date().toISOString() })
                      }
                      className="w-full text-xs font-semibold border-b border-slate-400 focus:outline-none focus:border-slate-900 bg-transparent py-0.5"
                      placeholder="Nombre o DNI..."
                    />
                  </div>
                  <div>
                    <label className="text-[10px] uppercase font-bold text-slate-600 block">
                      Fecha de Entrega:
                    </label>
                    <input
                      type="text"
                      value={doc.receptionDate || doc.date}
                      onChange={(e) =>
                        onChange({ ...doc, receptionDate: e.target.value, updatedAt: new Date().toISOString() })
                      }
                      className="w-full text-xs font-semibold border-b border-slate-400 focus:outline-none focus:border-slate-900 bg-transparent py-0.5"
                      placeholder="DD/MM/AAAA"
                    />
                  </div>
                </div>

                {/* Digital / Physical Signature Box */}
                <div className="mt-1 relative border border-dashed border-slate-400 bg-slate-50/50 rounded p-1">
                  <div className="flex items-center justify-between text-[10px] text-slate-500 px-1">
                    <span>Recuadro de Firma del Cliente:</span>
                    <div className="no-print flex items-center gap-1">
                      {hasSignature && (
                        <button
                          type="button"
                          onClick={clearSignature}
                          className="text-rose-600 hover:text-rose-800 text-[10px] font-medium flex items-center gap-0.5"
                        >
                          <Eraser className="w-3 h-3" /> Borrar trazo
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Canvas for signature or printable blank space */}
                  <canvas
                    ref={signatureCanvasRef}
                    width={360}
                    height={80}
                    onMouseDown={startDrawing}
                    onMouseMove={draw}
                    onMouseUp={stopDrawing}
                    onMouseLeave={stopDrawing}
                    onTouchStart={startDrawing}
                    onTouchMove={draw}
                    onTouchEnd={stopDrawing}
                    className="w-full h-20 touch-none cursor-crosshair bg-transparent"
                  />
                  <div className="text-center border-t border-slate-400 text-[9.5px] text-slate-600 pt-0.5">
                    Firma del Cliente / Receptor
                  </div>
                </div>
              </div>

              {/* Right Column: Financial Totals breakdown (5 cols) */}
              <div className="md:col-span-5 flex flex-col justify-between pl-0 md:pl-2">
                <div className="space-y-1.5 text-xs">
                  
                  {/* Subtotal / Base Imponible */}
                  <div className="flex justify-between items-center py-1 border-b border-slate-200">
                    <span className="font-bold text-slate-700 uppercase">
                      Subtotal (Base):
                    </span>
                    <span className="font-mono tabular-nums font-bold text-slate-900 text-sm">
                      {subtotal.toFixed(2)} €
                    </span>
                  </div>

                  {/* IVA Configuration */}
                  <div className="flex justify-between items-center py-1 border-b border-slate-200">
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-slate-700 uppercase">
                        I.V.A.:
                      </span>
                      <select
                        value={doc.includeTax ? doc.taxRate : 0}
                        onChange={(e) => {
                          const rate = parseFloat(e.target.value);
                          onChange({
                            ...doc,
                            includeTax: rate > 0,
                            taxRate: rate,
                            updatedAt: new Date().toISOString(),
                          });
                        }}
                        className="no-print text-xs font-semibold bg-slate-100 border border-slate-300 rounded px-1 py-0.5 focus:outline-none"
                      >
                        <option value="21">21% General</option>
                        <option value="10">10% Reducido</option>
                        <option value="0">0% Exento</option>
                      </select>
                      <span className="print-only text-xs font-bold text-slate-800">
                        {doc.includeTax ? `${doc.taxRate}%` : 'Exento'}
                      </span>
                    </div>
                    <span className="font-mono tabular-nums font-semibold text-slate-800 text-sm">
                      {taxAmount.toFixed(2)} €
                    </span>
                  </div>

                  {/* GRAND TOTAL BOX */}
                  <div className="mt-2 bg-slate-900 text-white p-2.5 rounded-none flex items-baseline justify-between shadow-xs">
                    <span className="font-black text-sm uppercase tracking-wider">
                      TOTAL:
                    </span>
                    <span className="font-mono tabular-nums font-black text-xl tracking-tight text-white">
                      {grandTotal.toFixed(2)} €
                    </span>
                  </div>
                </div>

                {/* Company seal / signature footer */}
                <div className="pt-4 text-center">
                  <div className="h-10 flex items-center justify-center">
                    <span className="text-[10px] text-slate-400 italic">
                      [ Sello y Firma {doc.company.brandName} ]
                    </span>
                  </div>
                  <div className="border-t border-slate-400 pt-1 text-[10px] font-bold text-slate-800 uppercase tracking-wider">
                    Por la empresa instaladora
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* Legal micro-footer */}
          <div className="mt-2 text-center text-[9px] text-slate-500 leading-tight">
            Documento emitido conforme a la legislación mercantil vigente. Los artículos son propiedad del suministrador hasta el total pago del importe.
          </div>

        </div>
      </div>
    </div>
  );
};
