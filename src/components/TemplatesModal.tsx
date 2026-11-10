import React from 'react';
import { SAMPLE_TEMPLATES } from '../constants/initialData';
import { LineItem } from '../types';
import { X, Sparkles, Check, ArrowRight } from 'lucide-react';

interface TemplatesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTemplate: (templateName: string, items: Omit<LineItem, 'id'>[]) => void;
}

export const TemplatesModal: React.FC<TemplatesModalProps> = ({
  isOpen,
  onClose,
  onSelectTemplate,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
      <div className="bg-white rounded-xl shadow-2xl border border-slate-200 w-full max-w-xl max-h-[85vh] flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-600" />
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                Plantillas Rápidas de Confección e Instalación
              </h3>
              <p className="text-xs text-slate-500">
                Carga conceptos habituales de cortinas, estores y tapicería en tu documento
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Templates list */}
        <div className="p-6 overflow-y-auto space-y-4">
          {SAMPLE_TEMPLATES.map((tmpl, idx) => {
            const templateTotal = tmpl.items.reduce((s, it) => s + it.total, 0);

            return (
              <div
                key={idx}
                className="border border-slate-200 rounded-xl p-4 hover:border-slate-300 hover:shadow-xs transition-all bg-white"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">
                      {tmpl.name}
                    </h4>
                    <p className="text-xs text-slate-600 mt-0.5">
                      {tmpl.description}
                    </p>
                  </div>
                  <span className="font-mono text-xs font-bold text-slate-900 bg-slate-100 px-2 py-1 rounded">
                    {templateTotal.toFixed(2)} €
                  </span>
                </div>

                {/* Items summary */}
                <div className="mt-3 bg-slate-50 rounded-lg p-2.5 text-xs text-slate-700 space-y-1">
                  {tmpl.items.map((item, itemIdx) => (
                    <div key={itemIdx} className="flex justify-between items-baseline gap-2">
                      <span className="truncate">
                        • {item.quantity}x {item.concept}
                      </span>
                      <span className="font-mono text-[11px] text-slate-500 shrink-0">
                        {item.total.toFixed(2)} €
                      </span>
                    </div>
                  ))}
                </div>

                {/* Apply button */}
                <div className="mt-3 flex justify-end">
                  <button
                    onClick={() => {
                      onSelectTemplate(tmpl.name, tmpl.items);
                      onClose();
                    }}
                    className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-bold text-slate-900 bg-slate-100 hover:bg-slate-900 hover:text-white rounded-lg transition-colors"
                  >
                    <span>Cargar en la Nota</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 text-right">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-200 rounded-lg transition-colors"
          >
            Cerrar
          </button>
        </div>

      </div>
    </div>
  );
};
