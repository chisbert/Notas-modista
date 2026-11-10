@echo off
title Notas de Modista - Impresion de Plantillas A5

cd /d "%~dp0"

echo ==============================================================
echo        NOTAS DE MODISTA - IMPRESION DE PLANTILLAS A5
echo                 Maturana Decorhogar
echo ==============================================================
echo.

where node >nul 2>nul
if %errorlevel% neq 0 (
    echo [ERROR] No se ha encontrado Node.js en este ordenador.
    echo.
    echo Para ejecutar este programa necesitas tener instalado Node.js.
    echo Puedes descargarlo gratis desde: https://nodejs.org/
    echo.
    echo Una vez instalado Node.js, vuelve a hacer doble clic en este archivo.
    echo ==============================================================
    pause
    exit /b
)

if not exist "node_modules\\" (
    echo [1/2] Instalando paquetes necesarios por primera vez...
    echo Esto solo se realiza la primera vez y tardara un momento...
    echo.
    call npm install
    if %errorlevel% neq 0 (
        echo.
        echo [ERROR] Ha ocurrido un error al instalar dependencias con npm.
        pause
        exit /b
    )
)

echo.
echo [2/2] Iniciando el servidor local...
echo.
echo ==============================================================
echo   El programa se abrira automaticamente en tu navegador web:
echo   http://localhost:3000
echo.
echo   * Para cerrar el programa: cierra esta ventana.
echo ==============================================================
echo.

start "" cmd /c "timeout /t 3 /nobreak >nul && start http://localhost:3000"

call npm run dev

pause
