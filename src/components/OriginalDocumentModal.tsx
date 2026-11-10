import React from 'react';
import { X, ExternalLink, Image as ImageIcon } from 'lucide-react';

interface OriginalDocumentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const OriginalDocumentModal: React.FC<OriginalDocumentModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/70 backdrop-blur-xs p-4">
      <div className="bg-white rounded-xl shadow-2xl border border-slate-200 w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50">
          <div className="flex items-center gap-2">
            <ImageIcon className="w-5 h-5 text-slate-800" />
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                Formato Original Físico (Maturana Decorhogar)
              </h3>
              <p className="text-xs text-slate-500">
                Archivo de referencia utilizado para digitalizar la nota de entrega
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

        {/* Image preview */}
        <div className="flex-1 overflow-y-auto p-4 flex items-center justify-center bg-slate-100">
          <img
            src="/public/assets/aistudio/Sin_t_tulo_3999ea63.jpg"
            alt="Talonario original Maturana Decorhogar"
            className="max-h-[70vh] w-auto shadow-md border border-slate-300 object-contain"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-slate-200 bg-slate-50 flex items-center justify-between text-xs text-slate-600">
          <span>Talonario original impreso en Madrid</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-100 transition-colors"
          >
            Volver a la Nota
          </button>
        </div>
      </div>
    </div>
  );
};
