@echo off
setlocal
cd /d "%~dp0"
title LabNova Web Admin

where node >nul 2>nul
if errorlevel 1 (
  echo Node.js 20 or newer is required. Install it from https://nodejs.org and run this again.
  pause
  exit /b 1
)

if not exist node_modules (
  echo Installing packages ^(first run only^)...
  call npm install
  if errorlevel 1 ( echo npm install failed. & pause & exit /b 1 )
)

rem "npm run dev" first checks the Supabase settings and, if they are missing,
rem asks for them once and saves .env.local automatically.
call npm run dev
pause
