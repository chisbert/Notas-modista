@echo off
chcp 65001 >nul
title Notas de Modista - Impresión de Plantillas A5

:: Situarse en la carpeta donde está este archivo .bat
cd /d "%~dp0"

echo ==============================================================
echo        NOTAS DE MODISTA - IMPRESIÓN DE PLANTILLAS A5
echo                 Maturana Decorhogar
echo ==============================================================
echo.

:: 1. Comprobar si Node.js está instalado en el ordenador
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo [ERROR] No se ha encontrado Node.js en este ordenador.
    echo.
    echo Para ejecutar este programa necesitas tener instalado Node.js.
    echo Puedes descargarlo de forma gratuita desde:
    echo https://nodejs.org/
    echo.
    echo Una vez instalado Node.js, vuelve a hacer doble clic en este archivo.
    echo ==============================================================
    pause
    exit /b
)

:: 2. Si no existen las dependencias (node_modules), instalarlas automáticamente
if not exist "node_modules\" (
    echo [1/2] Instalando paquetes necesarios por primera vez...
    echo Esto solo se realiza la primera vez y tardará un momento.
    echo.
    call npm install
    if %errorlevel% neq 0 (
        echo.
        echo [ERROR] Ha ocurrido un error al instalar las dependencias.
        pause
        exit /b
    )
)

:: 3. Iniciar el servidor y abrir el navegador web automáticamente
echo.
echo [2/2] Iniciando el servidor local...
echo.
echo ==============================================================
echo   El programa se abrirá automáticamente en tu navegador web:
echo   http://localhost:3000
echo.
echo   * Para usar el programa: interactúa con tu navegador.
echo   * Para cerrar el programa: cierra esta ventana negra.
echo ==============================================================
echo.

:: Esperar 2 segundos para dar tiempo a que arranque Vite y abrir el navegador
start "" cmd /c "timeout /t 2 /nobreak >nul && start http://localhost:3000"

:: Ejecutar el servidor de la aplicación
call npm run dev

pause
