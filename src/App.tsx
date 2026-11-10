import React, { useState, useEffect } from 'react';
import { DEFAULT_COMPANY } from './constants/initialData';
import { CompanyInfo } from './types';
import { A5BlankSheet } from './components/A5BlankSheet';
import { CompanyModal } from './components/CompanyModal';
import { OriginalDocumentModal } from './components/OriginalDocumentModal';
import {
  Printer,
  FileText,
  Sliders,
  Scissors,
  Building2,
  Eye,
  CheckCircle2,
} from 'lucide-react';

export default function App() {
  const [docTitle, setDocTitle] = useState<'NOTAS DE MODISTA' | 'PRESUPUESTO'>('NOTAS DE MODISTA');
  const [printMode, setPrintMode] = useState<'a5' | '2up'>('a5');
  const [rowCount, setRowCount] = useState<number>(13);
  const [company, setCompany] = useState<CompanyInfo>(() => {
    try {
      const saved = localStorage.getItem('maturana_company_v4');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return DEFAULT_COMPANY;
  });

  const [isCompanyModalOpen, setIsCompanyModalOpen] = useState(false);
  const [isReferenceOpen, setIsReferenceOpen] = useState(false);

  // Sync body class for print styling
  useEffect(() => {
    document.body.classList.remove('print-mode-a5', 'print-mode-2up');
    document.body.classList.add(printMode === 'a5' ? 'print-mode-a5' : 'print-mode-2up');
  }, [printMode]);

  const handlePrint = () => {
    window.print();
  };

  const handleSaveCompany = (updated: CompanyInfo) => {
    setCompany(updated);
    try {
      localStorage.setItem('maturana_company_v4', JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="min-h-screen bg-slate-200 text-slate-900 flex flex-col font-sans">
      
      {/* Dynamic @page print CSS rules (margin: 0 prevents uncontrollable browser page breaks) */}
      <style>{`
        @page {
          size: ${printMode === 'a5' ? 'A5 portrait' : 'A4 portrait'};
          margin: 0;
        }
      `}</style>

      {/* TOP CONTROL PANEL FOR MASS PRINTING (Hidden in print) */}
      <header className="no-print bg-white border-b border-slate-300 shadow-sm sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 py-3 sm:px-6 flex flex-wrap items-center justify-between gap-4">
          
          {/* Brand mark */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-slate-900 text-white flex items-center justify-center font-bold text-sm">
              MD
            </div>
            <div>
              <h1 className="text-sm sm:text-base font-extrabold text-slate-900 leading-tight">
                Plantilla Vacía A5 · Maturana Decorhogar
              </h1>
              <p className="text-[11px] text-slate-500 font-medium">
                Diseñada para impresión en masa y rellenado manual
              </p>
            </div>
          </div>

          {/* Quick Configuration Controls */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs">
            
            {/* Title Selector */}
            <div className="flex items-center p-0.5 bg-slate-100 rounded-lg border border-slate-300">
              <button
                type="button"
                onClick={() => setDocTitle('NOTAS DE MODISTA')}
                className={`px-3 py-1.5 font-bold rounded-md transition-all ${
                  docTitle === 'NOTAS DE MODISTA'
                    ? 'bg-white text-slate-950 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Notas de Modista
              </button>
              <button
                type="button"
                onClick={() => setDocTitle('PRESUPUESTO')}
                className={`px-3 py-1.5 font-bold rounded-md transition-all ${
                  docTitle === 'PRESUPUESTO'
                    ? 'bg-white text-slate-950 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Presupuesto
              </button>
            </div>

            {/* Print Mode Selector */}
            <div className="flex items-center p-0.5 bg-slate-100 rounded-lg border border-slate-300">
              <button
                type="button"
                onClick={() => setPrintMode('a5')}
                className={`px-3 py-1.5 font-bold rounded-md transition-all flex items-center gap-1.5 ${
                  printMode === 'a5'
                    ? 'bg-white text-slate-950 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                title="Imprimir directamente en hojas tamaño A5"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Hoja A5 (1x)</span>
              </button>
              <button
                type="button"
                onClick={() => setPrintMode('2up')}
                className={`px-3 py-1.5 font-bold rounded-md transition-all flex items-center gap-1.5 ${
                  printMode === '2up'
                    ? 'bg-white text-slate-950 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                title="Imprimir 2 plantillas A5 en cada hoja A4 para cortar por la mitad"
              >
                <Scissors className="w-3.5 h-3.5 text-blue-600" />
                <span>2 en Hoja A4 (Ahorro)</span>
              </button>
            </div>

            {/* Row Count Selector */}
            <div className="flex items-center gap-1.5 px-2.5 py-1 bg-slate-50 border border-slate-300 rounded-lg text-slate-700">
              <span className="font-semibold text-[11px]">Filas:</span>
              <select
                value={rowCount}
                onChange={(e) => setRowCount(Number(e.target.value))}
                className="bg-transparent font-bold focus:outline-none cursor-pointer"
              >
                <option value="11">11 filas (anchas)</option>
                <option value="13">13 filas (estándar)</option>
                <option value="15">15 filas (compactas)</option>
              </select>
            </div>

            {/* Company Data button */}
            <button
              type="button"
              onClick={() => setIsCompanyModalOpen(true)}
              className="px-2.5 py-1.5 text-slate-700 hover:text-slate-950 bg-slate-50 hover:bg-slate-100 border border-slate-300 rounded-lg font-semibold flex items-center gap-1 transition-colors"
              title="Editar datos de empresa"
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>Datos</span>
            </button>

            {/* View Original Scanned Image button */}
            <button
              type="button"
              onClick={() => setIsReferenceOpen(true)}
              className="px-2.5 py-1.5 text-slate-700 hover:text-slate-950 bg-slate-50 hover:bg-slate-100 border border-slate-300 rounded-lg font-semibold flex items-center gap-1 transition-colors"
              title="Ver el archivo original escaneado"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Ver Original</span>
            </button>

            {/* PRIMARY PRINT BUTTON */}
            <button
              type="button"
              onClick={handlePrint}
              className="inline-flex items-center gap-2 px-5 py-2 font-black text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 rounded-lg shadow-md transition-colors text-xs whitespace-nowrap"
            >
              <Printer className="w-4 h-4" />
              <span>IMPRIMIR EN MASA</span>
            </button>

          </div>
        </div>
      </header>

      {/* Helpful banner for printing instructions (hidden in print) */}
      <aside className="no-print max-w-4xl mx-auto w-full px-4 pt-3 pb-1 text-xs">
        <div className="bg-blue-50 border border-blue-200 text-blue-900 rounded-lg p-2.5 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
            <span>
              {printMode === 'a5' ? (
                <>Modo <strong>Hoja A5 Directa</strong> activado (148 x 210 mm). Carga papel tamaño A5 en la impresora y pulsa <strong>Imprimir en Masa</strong>.</>
              ) : (
                <>Modo <strong>2 en Hoja A4</strong> activado. Salen 2 notas de entrega A5 en cada folio A4 con línea de corte punteada central para guillotinar.</>
              )}
            </span>
          </div>
          <button
            type="button"
            onClick={handlePrint}
            className="text-blue-800 hover:text-blue-950 font-bold underline shrink-0 cursor-pointer"
          >
            Lanzar impresión ahora
          </button>
        </div>
      </aside>

      {/* MAIN SHEET PREVIEW AREA */}
      <main className="flex-1 flex justify-center items-start p-4 sm:p-8 overflow-y-auto">
        
        {printMode === 'a5' ? (
          /* SINGLE A5 SHEET VIEW */
          <div className="w-fit transition-transform">
            <A5BlankSheet
              title={docTitle}
              company={company}
              rowCount={rowCount}
              scale="normal"
            />
          </div>
        ) : (
          /* 2x A5 ON SINGLE A4 SHEET (CUT BY HALF) */
          <div className="a4-sheet-container bg-white border border-slate-300 shadow-xl p-2 sm:p-4 w-[210mm] max-h-[284mm] flex flex-col justify-between print:shadow-none print:border-none print:p-0">
            
            {/* Top A5 Note */}
            <div className="h-[137mm] max-h-[137mm] overflow-hidden">
              <A5BlankSheet
                title={docTitle}
                company={company}
                rowCount={11}
                scale="compact"
              />
            </div>

            {/* Central cut line indicator */}
            <div className="py-1 border-t-2 border-dashed border-slate-400 text-center select-none text-[9px] font-mono text-slate-500 uppercase tracking-widest flex items-center justify-center gap-2 print:border-slate-800">
              <Scissors className="w-3 h-3 text-slate-600" />
              <span>Línea de corte central (tamaño A5 cada mitad)</span>
              <Scissors className="w-3 h-3 text-slate-600 rotate-180" />
            </div>

            {/* Bottom A5 Note */}
            <div className="h-[137mm] max-h-[137mm] overflow-hidden">
              <A5BlankSheet
                title={docTitle}
                company={company}
                rowCount={11}
                scale="compact"
              />
            </div>

          </div>
        )}

      </main>

      {/* Company Modal */}
      <CompanyModal
        isOpen={isCompanyModalOpen}
        onClose={() => setIsCompanyModalOpen(false)}
        company={company}
        onSave={handleSaveCompany}
      />

      {/* Reference Scanned Image Modal */}
      <OriginalDocumentModal
        isOpen={isReferenceOpen}
        onClose={() => setIsReferenceOpen(false)}
      />

    </div>
  );
}
