#!/usr/bin/env pwsh
<#
  phoneview.start.ps1
  Small helper for Windows to serve the current folder and open phoneview.html

  Usage: Right-click -> Run with PowerShell, or run from PowerShell prompt:
    .\phoneview.start.ps1
#>
Set-StrictMode -Version Latest
$root = Split-Path -Parent $MyInvocation.MyCommand.Path
Push-Location -Path $root

function Start-Server {
  $py = Get-Command python -ErrorAction SilentlyContinue
  if (-not $py) { $py = Get-Command python3 -ErrorAction SilentlyContinue }
  if (-not $py) {
    Write-Host 'Python not detected in PATH. Install Python or run a static file server manually (e.g., Live Server extension).' -ForegroundColor Yellow
    return $null
  }

  $args = '-m','http.server','8000'
  $psi = New-Object System.Diagnostics.ProcessStartInfo
  # resolve an executable path for the python command
  $exe = $py.Path
  if (-not $exe) { $exe = $py.Source }
  if (-not $exe) { $exe = $py.Definition }
  $psi.FileName = $exe
  $psi.Arguments = $args -join ' '
  $psi.WorkingDirectory = $root
  $psi.RedirectStandardOutput = $false
  $psi.RedirectStandardError = $false
  $psi.UseShellExecute = $true
  $psi.CreateNoWindow = $true

  $proc = [System.Diagnostics.Process]::Start($psi)
  Start-Sleep -Milliseconds 600
  return $proc
}

$proc = Start-Server
if ($proc) {
  Start-Process "http://127.0.0.1:8000/phoneview.html"
  Write-Host "Server started at http://127.0.0.1:8000 - press Enter to stop server and exit" -ForegroundColor Green
  Read-Host | Out-Null

  try { $proc.Kill() } catch {}
}

Pop-Location
