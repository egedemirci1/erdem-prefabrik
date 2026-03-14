@echo off
setlocal enabledelayedexpansion

echo.
echo === Page Title Extraction ===
echo.

REM Home page
echo [1/10] Home Page
curl.exe -s -L "http://localhost:3000/" > temp.html
findstr "<title>" temp.html
echo.

REM Projeler
echo [2/10] Projeler
curl.exe -s -L "http://localhost:3000/projeler" > temp.html
findstr "<title>" temp.html
echo.

REM Konteyner
echo [3/10] Konteyner
curl.exe -s -L "http://localhost:3000/konteyner" > temp.html
findstr "<title>" temp.html
echo.

REM Moduler
echo [4/10] Moduler
curl.exe -s -L "http://localhost:3000/moduler" > temp.html
findstr "<title>" temp.html
echo.

REM Prefabrik Celik
echo [5/10] Prefabrik Celik
curl.exe -s -L "http://localhost:3000/prefabrik-celik" > temp.html
findstr "<title>" temp.html
echo.

REM Hakkimizda
echo [6/10] Hakkimizda
curl.exe -s -L "http://localhost:3000/hakkimizda" > temp.html
findstr "<title>" temp.html
echo.

REM Iletisim
echo [7/10] Iletisim
curl.exe -s -L "http://localhost:3000/iletisim" > temp.html
findstr "<title>" temp.html
echo.

REM Gizlilik
echo [8/10] Gizlilik
curl.exe -s -L "http://localhost:3000/gizlilik" > temp.html
findstr "<title>" temp.html
echo.

REM Kullanim Kosullari
echo [9/10] Kullanim Kosullari
curl.exe -s -L "http://localhost:3000/kullanim-kosullari" > temp.html
findstr "<title>" temp.html
echo.

REM 404 page
echo [10/10] 404 Test Page
curl.exe -s -L "http://localhost:3000/nonexistent-page" > temp.html
findstr "<title>" temp.html
echo.

del temp.html 2>nul
echo === Complete ===
