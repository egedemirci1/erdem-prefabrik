@echo off
setlocal enabledelayedexpansion

echo.
echo === Detailed Page Analysis ===
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
        echo ========================================
        echo Page: %%a
        echo URL: %%b
        echo ========================================
        
        curl.exe -s -L --max-time 10 "%%b" > temp_page_%%i.html
        
        if !errorlevel! equ 0 (
            echo   Status: OK
            
            REM Extract title
            findstr /C:"<title>" temp_page_%%i.html > temp_title.txt
            if !errorlevel! equ 0 (
                echo   Title found: Yes
                type temp_title.txt
            ) else (
                echo   Title found: No
            )
            
            REM Check for common errors
            findstr /I /C:"error occurred" /C:"hydration" /C:"500" /C:"undefined" temp_page_%%i.html > nul
            if !errorlevel! equ 0 (
                echo   WARNING: Possible errors in content
            ) else (
                echo   Content errors: None detected
            )
            
            REM Check for main content elements
            findstr /I /C:"<main" /C:"<article" /C:"<section" temp_page_%%i.html > nul
            if !errorlevel! equ 0 (
                echo   Content structure: OK
            ) else (
                echo   Content structure: WARNING - No main/article/section found
            )
            
            del temp_page_%%i.html 2>nul
            del temp_title.txt 2>nul
        ) else (
            echo   Status: FAILED
        )
        echo.
    )
)

echo === Analysis Complete ===
