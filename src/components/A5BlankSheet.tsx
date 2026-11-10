import React from 'react';
import { CompanyInfo } from '../types';
import { CurtainLogo } from './CurtainLogo';
import { Phone, Globe, Mail } from 'lucide-react';

interface A5BlankSheetProps {
  title: string; // e.g. "NOTA DE ENTREGA" or "PRESUPUESTO"
  company: CompanyInfo;
  rowCount?: number;
  scale?: 'normal' | 'compact';
}

const DotLine: React.FC<{ className?: string; heightClass?: string }> = ({
  className = 'flex-1',
  heightClass = 'h-5',
}) => (
  <span className={`${className} ${heightClass} inline-flex items-end pb-1 overflow-hidden align-baseline select-none`}>
    <svg className="w-full h-[2px]" preserveAspectRatio="none">
      <line
        x1="1"
        y1="1"
        x2="100%"
        y2="1"
        stroke="#000000"
        strokeWidth="1.8"
        strokeDasharray="1.5 5"
        strokeLinecap="round"
      />
    </svg>
  </span>
);

export const A5BlankSheet: React.FC<A5BlankSheetProps> = ({
  title = 'NOTAS DE MODISTA',
  company,
  rowCount = 18,
  scale = 'normal',
}) => {
  const isCompact = scale === 'compact';
  const [markedInstalacion, setMarkedInstalacion] = React.useState(false);
  const [markedModistaInstalacion, setMarkedModistaInstalacion] = React.useState(false);
  const [markedModistaConfeccion, setMarkedModistaConfeccion] = React.useState(false);

  return (
    <div
      className={`a5-page bg-white text-black border border-slate-300 shadow-lg mx-auto relative select-none font-sans print:shadow-none print:border-none ${
        isCompact
          ? 'w-[148mm] h-[142mm] p-2 text-[10px]'
          : 'w-[148mm] h-[208mm] max-h-[208mm] p-3 sm:p-4 text-xs'
      }`}
      style={{
        width: '148mm',
        boxSizing: 'border-box',
      }}
    >
      {/* Left Margin Vertical CIF text (Dhogar PB - C.I.F.: E26670000) */}
      <div className="absolute left-1 top-20 bottom-16 w-4 flex items-center justify-center pointer-events-none">
        <div
          className="transform -rotate-90 whitespace-nowrap text-[9px] font-bold tracking-widest text-black uppercase"
          style={{ transformOrigin: 'center center' }}
        >
          {company.ownerName} &nbsp; C.I.F.: {company.nif}
        </div>
      </div>

      {/* Main Content inside the margin */}
      <div className="pl-4 sm:pl-5 pr-1 flex flex-col h-full min-h-0">
        
        {/* TOP HEADER: 3 Blocks replicating Maturana Decorhogar */}
        <div className="shrink-0">
          <div className="grid grid-cols-12 gap-1 items-center pb-2 border-b border-black">
            
            {/* Col 1: Stylized Drapery Logo (4 cols) */}
            <div className="col-span-4 flex flex-col items-center justify-center text-center">
              <CurtainLogo
                className={isCompact ? 'w-24 h-auto' : 'w-28 sm:w-32 h-auto'}
                brandName="MATURANA"
                slogan={company.slogan}
              />
            </div>

            {/* Col 2: Central Coordinates (4 cols) */}
            <div className="col-span-4 text-center text-[9px] leading-tight text-black space-y-0.5">
              <div className="font-extrabold text-[10px] tracking-tight">
                {company.address}
              </div>
              <div className="font-bold">
                {company.cityPostal}
              </div>
              <div className="font-bold pt-0.5">
                Tels.: {company.phones}
              </div>
              <div className="text-[8.5px]">
                {company.website}
              </div>
              <div className="text-[8.5px]">
                {company.email}
              </div>
              {company.social ? (
                <div className="text-[8px] font-semibold">
                  {company.social}
                </div>
              ) : null}
            </div>

            {/* Col 3: Services and specialties (4 cols) */}
            <div className="col-span-4 text-center text-[8px] font-bold text-black leading-tight border-l border-black pl-1 space-y-0.5">
              {company.servicesTagline.map((line, idx) => (
                <div
                  key={idx}
                  className={
                    idx === 0 || idx === company.servicesTagline.length - 1
                      ? 'font-black text-black tracking-tight'
                      : 'text-neutral-900'
                  }
                >
                  {line}
                </div>
              ))}
            </div>
          </div>

          {/* DOCUMENT TITLE, NUMBER BOX & DATE (Centered title and spacious date) */}
          <div className="flex items-center justify-between pt-1.5 pb-1 gap-2">
            {/* Left placeholder for symmetrical centering */}
            <div className="w-[28%]"></div>

            {/* Center: Title and number box */}
            <div className="flex-1 flex items-center justify-center gap-1.5">
              <span className="text-xs sm:text-sm font-black tracking-wider uppercase text-black whitespace-nowrap">
                {title} Nº.:
              </span>
              {/* Empty bordered box for stamping or writing document number */}
              <div className="border border-black w-24 sm:w-28 h-6 sm:h-7 bg-white shrink-0"></div>
            </div>

            {/* Right: Date with plenty of space */}
            <div className="w-[32%] text-right text-[10px] sm:text-[10.5px] font-bold text-black tracking-wider whitespace-nowrap">
              Fecha: &nbsp; ........ / ........ / 20........
            </div>
          </div>

          {/* CUSTOMER INFORMATION SECTION (Spacious and comfortable for handwriting) */}
          <div className="border-t border-b border-black py-3 sm:py-4 my-1.5 shrink-0">
            {title === 'NOTAS DE MODISTA' ? (
              <div className="flex items-baseline gap-2.5 text-xs sm:text-[12.5px] font-bold text-black w-full min-h-[26px]">
                <span className="italic shrink-0 tracking-wide text-sm font-semibold">Cliente:</span>
                <DotLine className="flex-1" heightClass="h-6" />
              </div>
            ) : (
              <div className="space-y-3.5">
                <div className="flex items-baseline justify-between text-xs sm:text-[12px] font-bold text-black gap-3">
                  <div className="flex-1 flex items-baseline gap-2">
                    <span className="italic shrink-0 font-semibold">Cliente:</span>
                    <DotLine className="flex-1" heightClass="h-5" />
                  </div>
                  <div className="w-44 flex items-baseline gap-2 pl-2">
                    <span className="italic shrink-0 font-semibold">Tel.:</span>
                    <DotLine className="flex-1" heightClass="h-5" />
                  </div>
                </div>
                <div className="flex items-baseline gap-2 text-xs sm:text-[12px] font-bold text-black">
                  <span className="italic shrink-0 font-semibold">Domicilio:</span>
                  <DotLine className="flex-1" heightClass="h-5" />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* RULED TABLE: Fills the entire space down to the bottom box */}
        <div className="flex-1 min-h-0 border border-black overflow-hidden bg-white my-1 flex flex-col">
          <table className="w-full h-full border-collapse ruled-table text-left text-[10px] table-fixed">
            <thead className="shrink-0">
              <tr className="bg-neutral-100 text-black font-black border-b border-black text-[9.5px] h-6">
                <th className="w-[12%] py-1 px-1 text-center border-r border-black uppercase tracking-wider">
                  Cant.
                </th>
                <th className="w-[58%] py-1 px-2 text-center border-r border-black uppercase tracking-widest font-black">
                  C O N C E P T O
                </th>
                <th className="w-[15%] py-1 px-1 text-center border-r border-black uppercase tracking-wider">
                  Precio Unit.
                </th>
                <th className="w-[15%] py-1 px-1 text-center uppercase tracking-widest font-black">
                  T O T A L
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black h-full">
              {Array.from({ length: rowCount }).map((_, idx) => (
                <tr key={idx} style={{ height: `${100 / rowCount}%` }}>
                  <td className="border-r border-black"></td>
                  <td className="border-r border-black"></td>
                  <td className="border-r border-black"></td>
                  <td></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* BOTTOM SECTION: FIRMAS DE RECEPCIÓN Y EMPRESA */}
        <div className="shrink-0 mt-1 border border-black p-1.5 sm:p-2 bg-white">
          {title === 'NOTAS DE MODISTA' ? (
            /* NOTAS DE MODISTA: Con Observaciones y casillas de Instalación / Confección */
            <div className="grid grid-cols-12 gap-2 items-stretch">
              {/* Left: Firma de Recepción Conforme del Cliente (6 cols) */}
              <div className="col-span-6 border-r border-black pr-2 flex flex-col justify-between">
                <div>
                  <div className="text-[9px] font-black uppercase text-black">
                    RECEPCIÓN CONFORME DEL CLIENTE
                  </div>
                  <div className="text-[8px] text-neutral-800 leading-tight">
                    Recibí los géneros a mi entera satisfacción.
                  </div>
                </div>

                {/* Box for handwritten customer signature */}
                <div className="mt-2 border border-dotted border-black h-12 flex items-end justify-center pb-0.5">
                  <span className="text-[7.5px] text-neutral-600 uppercase tracking-wider">
                    Firma del Cliente
                  </span>
                </div>
              </div>

              {/* Right: Observaciones con casillas de Instalación y Confección (6 cols) */}
              <div className="col-span-6 pl-2 flex flex-col justify-between">
                <div>
                  <div className="text-[9px] font-black uppercase text-black tracking-tight">
                    OBSERVACIONES
                  </div>

                  {/* Dos recuadros para marcar con 'X': Instalación y Confección */}
                  <div className="mt-1.5 flex items-center gap-3">
                    {/* Casilla 1: Instalación */}
                    <div
                      onClick={() => setMarkedModistaInstalacion(!markedModistaInstalacion)}
                      className="flex items-center gap-1.5 cursor-pointer select-none"
                      title="Clic para marcar/desmarcar Instalación"
                    >
                      <div className="w-4 h-4 min-w-4 border-2 border-black bg-white flex items-center justify-center font-black text-xs leading-none">
                        {markedModistaInstalacion ? 'X' : ''}
                      </div>
                      <span className="text-[8.5px] font-bold text-black uppercase">
                        Instalación
                      </span>
                    </div>

                    {/* Casilla 2: Confección */}
                    <div
                      onClick={() => setMarkedModistaConfeccion(!markedModistaConfeccion)}
                      className="flex items-center gap-1.5 cursor-pointer select-none"
                      title="Clic para marcar/desmarcar Confección"
                    >
                      <div className="w-4 h-4 min-w-4 border-2 border-black bg-white flex items-center justify-center font-black text-xs leading-none">
                        {markedModistaConfeccion ? 'X' : ''}
                      </div>
                      <span className="text-[8.5px] font-bold text-black uppercase">
                        Confección
                      </span>
                    </div>
                  </div>
                </div>

                {/* Línea inferior para observaciones o notas */}
                <div className="mt-1.5 flex items-baseline gap-1 text-[8px] text-neutral-800">
                  <span className="font-bold text-black shrink-0">Obs.:</span>
                  <DotLine heightClass="h-4" />
                </div>
              </div>
            </div>
          ) : (
            /* PRESUPUESTO: Solo recuadro para marcar Instalación (eliminado confección) */
            <div className="grid grid-cols-12 gap-2 items-stretch">
              {/* Left: Firma de Recepción Conforme del Cliente (6 cols) */}
              <div className="col-span-6 border-r border-black pr-2 flex flex-col justify-between">
                <div>
                  <div className="text-[9px] font-black uppercase text-black">
                    RECEPCIÓN CONFORME DEL CLIENTE
                  </div>
                  <div className="text-[8px] text-neutral-800 leading-tight">
                    Recibí los géneros e instalaciones a mi entera satisfacción.
                  </div>
                </div>

                {/* Box for handwritten customer signature */}
                <div className="mt-2 border border-dotted border-black h-12 flex items-end justify-center pb-0.5">
                  <span className="text-[7.5px] text-neutral-600 uppercase tracking-wider">
                    Firma del Cliente
                  </span>
                </div>
              </div>

              {/* Right: Casilla de Instalación por el cliente (6 cols) - Solo Instalación */}
              <div className="col-span-6 pl-2 flex flex-col justify-between">
                <div>
                  <div className="text-[9px] font-black uppercase text-black tracking-tight">
                    INSTALACIÓN / COLGADO POR EL CLIENTE
                  </div>

                  {/* Único recuadro para marcar: Instalación (eliminada confección) */}
                  <div className="mt-1.5 flex items-center gap-3">
                    <div
                      onClick={() => setMarkedInstalacion(!markedInstalacion)}
                      className="flex items-center gap-1.5 cursor-pointer select-none"
                      title="Clic para marcar/desmarcar Instalación"
                    >
                      <div className="w-4 h-4 min-w-4 border-2 border-black bg-white flex items-center justify-center font-black text-xs leading-none">
                        {markedInstalacion ? 'X' : ''}
                      </div>
                      <span className="text-[8.5px] font-bold text-black uppercase">
                        Instalación
                      </span>
                    </div>
                  </div>

                  <div className="mt-1 text-[8px] text-neutral-800 leading-tight">
                    El cliente sabe y declara que él mismo realiza el servicio de instalación.
                  </div>
                </div>

                {/* Línea inferior para observaciones o conformidad */}
                <div className="mt-1.5 flex items-baseline gap-1 text-[8px] text-neutral-800">
                  <span className="font-bold text-black shrink-0">Obs.:</span>
                  <DotLine heightClass="h-4" />
                </div>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
