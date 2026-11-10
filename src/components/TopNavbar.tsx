import React from 'react';
import { DocumentType } from '../types';
import {
  Printer,
  Plus,
  Save,
  Building2,
  FolderOpen,
  Sparkles,
  FileCheck2,
  Eye,
} from 'lucide-react';

interface TopNavbarProps {
  docType: DocumentType;
  onDocTypeChange: (type: DocumentType) => void;
  onNewDoc: () => void;
  onSaveDoc: () => void;
  onPrint: () => void;
  onOpenTemplates: () => void;
  onOpenCompanyModal: () => void;
  onOpenHistory: () => void;
  onOpenReference: () => void;
  isSaved?: boolean;
}

export const TopNavbar: React.FC<TopNavbarProps> = ({
  docType,
  onDocTypeChange,
  onNewDoc,
  onSaveDoc,
  onPrint,
  onOpenTemplates,
  onOpenCompanyModal,
  onOpenHistory,
  onOpenReference,
  isSaved,
}) => {
  return (
    <header className="no-print sticky top-0 z-40 bg-white border-b border-slate-200 shadow-xs">
      {/* Primary Top Bar Contract */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-6">
        
        {/* Zone 1: Single element brand title */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="w-9 h-9 rounded-lg bg-slate-900 text-white flex items-center justify-center font-bold text-sm tracking-wider shadow-xs">
            MD
          </div>
          <span className="text-base sm:text-lg font-extrabold tracking-tight text-slate-900 whitespace-nowrap">
            Maturana Decorhogar
          </span>
        </div>

        {/* Zone 2: Navigation actions */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2 text-xs font-semibold text-slate-700">
          <button
            onClick={onNewDoc}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg hover:bg-slate-100 hover:text-slate-950 transition-colors whitespace-nowrap"
          >
            <Plus className="w-3.5 h-3.5 text-slate-600" />
            Nueva Nota
          </button>
          <button
            onClick={onSaveDoc}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg hover:bg-slate-100 hover:text-slate-950 transition-colors whitespace-nowrap"
          >
            <Save className="w-3.5 h-3.5 text-slate-600" />
            {isSaved ? 'Guardado' : 'Guardar'}
          </button>
          <button
            onClick={onOpenTemplates}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg hover:bg-slate-100 hover:text-slate-950 transition-colors whitespace-nowrap"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            Plantillas
          </button>
          <button
            onClick={onOpenCompanyModal}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg hover:bg-slate-100 hover:text-slate-950 transition-colors whitespace-nowrap"
          >
            <Building2 className="w-3.5 h-3.5 text-slate-600" />
            Empresa
          </button>
          <button
            onClick={onOpenHistory}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg hover:bg-slate-100 hover:text-slate-950 transition-colors whitespace-nowrap"
          >
            <FolderOpen className="w-3.5 h-3.5 text-slate-600" />
            Historial
          </button>
          <button
            onClick={onOpenReference}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-900 transition-colors whitespace-nowrap"
            title="Ver fotografía del papel original"
          >
            <Eye className="w-3.5 h-3.5" />
            Formato Original
          </button>
        </nav>

        {/* Zone 3: Document Switcher & Primary CTA (Imprimir / PDF) */}
        <div className="flex items-center gap-3 shrink-0">
          
          {/* Segmented Document Type Switcher */}
          <div className="flex items-center p-1 bg-slate-100 rounded-lg border border-slate-200">
            <button
              onClick={() => onDocTypeChange('NOTA DE ENTREGA')}
              className={`px-3 py-1.5 text-xs font-bold rounded-md transition-all whitespace-nowrap ${
                docType === 'NOTA DE ENTREGA'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Nota de Entrega
            </button>
            <button
              onClick={() => onDocTypeChange('PRESUPUESTO')}
              className={`px-3 py-1.5 text-xs font-bold rounded-md transition-all whitespace-nowrap ${
                docType === 'PRESUPUESTO'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Presupuesto
            </button>
          </div>

          {/* Primary Action Button */}
          <button
            onClick={onPrint}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-lg shadow-xs transition-colors whitespace-nowrap shrink-0"
          >
            <Printer className="w-4 h-4" />
            <span>Imprimir / PDF</span>
          </button>
        </div>

      </div>

      {/* Sub-bar for mobile navigation buttons */}
      <div className="lg:hidden flex items-center justify-between px-4 py-2 border-t border-slate-100 bg-slate-50 text-xs overflow-x-auto gap-2">
        <button
          onClick={onNewDoc}
          className="px-2.5 py-1 text-slate-700 font-semibold hover:bg-slate-200 rounded whitespace-nowrap"
        >
          Nueva
        </button>
        <button
          onClick={onSaveDoc}
          className="px-2.5 py-1 text-slate-700 font-semibold hover:bg-slate-200 rounded whitespace-nowrap"
        >
          Guardar
        </button>
        <button
          onClick={onOpenTemplates}
          className="px-2.5 py-1 text-amber-700 font-semibold hover:bg-slate-200 rounded whitespace-nowrap"
        >
          Plantillas
        </button>
        <button
          onClick={onOpenCompanyModal}
          className="px-2.5 py-1 text-slate-700 font-semibold hover:bg-slate-200 rounded whitespace-nowrap"
        >
          Empresa
        </button>
        <button
          onClick={onOpenHistory}
          className="px-2.5 py-1 text-slate-700 font-semibold hover:bg-slate-200 rounded whitespace-nowrap"
        >
          Historial
        </button>
      </div>
    </header>
  );
};
