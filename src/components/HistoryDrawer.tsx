import React from 'react';
import { DeliveryDocument } from '../types';
import { X, FileText, Calendar, User, Trash2, Copy, ArrowRight, FolderOpen } from 'lucide-react';

interface HistoryDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  documents: DeliveryDocument[];
  currentDocId: string;
  onSelectDoc: (doc: DeliveryDocument) => void;
  onDeleteDoc: (id: string) => void;
  onDuplicateDoc: (doc: DeliveryDocument) => void;
}

export const HistoryDrawer: React.FC<HistoryDrawerProps> = ({
  isOpen,
  onClose,
  documents,
  currentDocId,
  onSelectDoc,
  onDeleteDoc,
  onDuplicateDoc,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/50 backdrop-blur-xs">
      <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-200">
        
        {/* Drawer Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50">
          <div className="flex items-center gap-2">
            <FolderOpen className="w-5 h-5 text-slate-800" />
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Historial de Documentos
              </h3>
              <p className="text-xs text-slate-500">
                {documents.length} documento{documents.length !== 1 ? 's' : ''} guardado{documents.length !== 1 ? 's' : ''} en este dispositivo
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

        {/* Documents List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {documents.length === 0 ? (
            <div className="text-center py-12 px-4 text-slate-500">
              <FileText className="w-10 h-10 mx-auto text-slate-300 mb-2" />
              <p className="text-sm font-semibold text-slate-700">No hay documentos guardados</p>
              <p className="text-xs text-slate-500 mt-1">
                Pulsa en &ldquo;Guardar&rdquo; en la barra superior para almacenar notas y presupuestos.
              </p>
            </div>
          ) : (
            documents.map((doc) => {
              const isCurrent = doc.id === currentDocId;
              const totalAmount = doc.items.reduce((acc, i) => acc + (Number(i.total) || 0), 0) * (doc.includeTax ? 1 + doc.taxRate / 100 : 1);

              return (
                <div
                  key={doc.id}
                  className={`p-3.5 rounded-xl border transition-all ${
                    isCurrent
                      ? 'border-blue-600 bg-blue-50/40 shadow-xs'
                      : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-xs'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-[11px] font-bold px-2 py-0.5 rounded ${
                          doc.type === 'NOTA DE ENTREGA'
                            ? 'bg-amber-100 text-amber-900 border border-amber-200'
                            : 'bg-indigo-100 text-indigo-900 border border-indigo-200'
                        }`}
                      >
                        {doc.type}
                      </span>
                      <span className="font-mono text-xs font-bold text-slate-900">
                        {doc.number || 'Sin Nº'}
                      </span>
                    </div>

                    <span className="font-mono text-sm font-bold text-slate-950">
                      {totalAmount.toFixed(2)} €
                    </span>
                  </div>

                  {/* Customer and Date Details */}
                  <div className="mt-2 space-y-1 text-xs text-slate-600">
                    <div className="flex items-center gap-1.5 font-medium text-slate-900">
                      <User className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span className="truncate">{doc.customer.name || 'Sin cliente asignado'}</span>
                    </div>
                    <div className="flex items-center justify-between text-[11px] text-slate-500">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-slate-400" />
                        <span>{doc.date}</span>
                      </div>
                      <span>{doc.items.length} partidas</span>
                    </div>
                  </div>

                  {/* Card Actions */}
                  <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => onDuplicateDoc(doc)}
                        title="Duplicar como nueva nota"
                        className="p-1.5 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded text-xs inline-flex items-center gap-1 font-medium transition-colors"
                      >
                        <Copy className="w-3.5 h-3.5" />
                        <span>Duplicar</span>
                      </button>
                      <button
                        onClick={() => onDeleteDoc(doc.id)}
                        title="Eliminar documento"
                        className="p-1.5 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <button
                      onClick={() => {
                        onSelectDoc(doc);
                        onClose();
                      }}
                      className="inline-flex items-center gap-1 text-xs font-bold text-blue-700 hover:text-blue-900 transition-colors"
                    >
                      {isCurrent ? 'Editando' : 'Abrir'}
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              );
            })
          )}
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
