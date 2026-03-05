# scripts/antigravity-diagnostic.ps1
# Antigravity Language Server Diagnostic
#
# Checks whether language_server_windows_x64.exe or any Antigravity-related
# processes are running on the current machine. This is the same process check
# used by the Toolkit extension internally.
#
# Usage:
#   powershell -NoProfile -ExecutionPolicy Bypass -File "scripts\antigravity-diagnostic.ps1"

$processNames = @(
    "language_server_windows_x64",
    "Antigravity"
)

$found = $false

foreach ($name in $processNames) {
    $procs = Get-Process -Name $name -ErrorAction SilentlyContinue
    if ($procs) {
        $found = $true
        Write-Output "Found process: $name (PID(s): $($procs.Id -join ', '))"
    }
}

if (-not $found) {
    Write-Output "no language_server_windows_x64.exe or Antigravity-related processes found."
    Write-Output "Reason: no_process"
    Write-Output "The Antigravity language server / Antigravity IDE is not running on this machine."
    Write-Output "Start Antigravity IDE (or the app that launches language_server_windows_x64.exe) to enable Toolkit connection."
    exit 1
}

exit 0
