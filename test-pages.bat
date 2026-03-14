@echo off
setlocal enabledelayedexpansion

echo.
echo === Page Testing Results ===
echo.

set "pages[0]=Home|http://localhost:3000/"
set "pages[1]=Projeler|http://localhost:3000/projeler"
set "pages[2]=Konteyner|http://localhost:3000/konteyner"
set "pages[3]=Moduler|http://localhost:3000/moduler"
set "pages[4]=Prefabrik-Celik|http://localhost:3000/prefabrik-celik"
set "pages[5]=Hakkimizda|http://localhost:3000/hakkimizda"
set "pages[6]=Iletisim|http://localhost:3000/iletisim"
set "pages[7]=Gizlilik|http://localhost:3000/gizlilik"
set "pages[8]=Kullanim-Kosullari|http://localhost:3000/kullanim-kosullari"
set "pages[9]=404-Test|http://localhost:3000/nonexistent-page"

for /L %%i in (0,1,9) do (
    for /F "tokens=1,2 delims=|" %%a in ("!pages[%%i]!") do (
        echo Testing: %%a
        echo URL: %%b
        
        curl.exe -s -L -w "  Status: %%{http_code}\n  Size: %%{size_download} bytes\n  Time: %%{time_total}s\n" -o nul --max-time 10 "%%b"
        
        if !errorlevel! neq 0 (
            echo   ERROR: Request failed
        )
        echo.
    )
)

echo === Test Complete ===
