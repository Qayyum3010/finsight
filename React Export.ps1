# ============================================
# REACT CORE EXPORTER
# Exports:
#   - src/
#   - public/ (text files only)
#   - index.html
#   - package.json
#   - vite.config.*
#   - tsconfig*.json
#   - .env*
# Skips:
#   - Binary files
#   - Unreadable files
# ============================================

# ===== CONFIG =====
$projectRoot = $PSScriptRoot
$outputFile = Join-Path $projectRoot "REACT_CORE_DUMP.txt"

# ===== FUNCTION =====
function Write-FileContent {
    param(
        [string]$filePath,
        [int]$index,
        [int]$total
    )

    $relativePath = $filePath.Substring($projectRoot.Length).TrimStart("\")

    $percent = [math]::Round(($index / $total) * 100, 2)
    Write-Host "[$index/$total][$percent%] $relativePath"

    $binaryExtensions = @(
        ".png", ".jpg", ".jpeg", ".gif", ".webp", ".bmp", ".ico",
        ".mp4", ".avi", ".mov", ".mkv", ".wmv",
        ".mp3", ".wav", ".ogg", ".aac", ".flac",
        ".ttf", ".otf", ".woff", ".woff2",
        ".exe", ".dll", ".so", ".bin",
        ".zip", ".rar", ".7z", ".tar", ".gz",
        ".pdf"
    )

    $extension = [System.IO.Path]::GetExtension($filePath).ToLower()

    if ($binaryExtensions -contains $extension) {
        Write-Host "  -> Skipped binary file"
        return
    }

    try {

        $stream = [System.IO.File]::OpenRead($filePath)

        try {
            $buffer = New-Object byte[] 512
            $bytesRead = $stream.Read($buffer, 0, $buffer.Length)
        }
        finally {
            $stream.Close()
        }

        if ($bytesRead -gt 0 -and ($buffer[0..($bytesRead - 1)] -contains 0)) {
            Write-Host "  -> Skipped binary content"
            return
        }

        $content = Get-Content $filePath -Raw -ErrorAction Stop

        Add-Content $outputFile "`r`n===== FILE: $relativePath ====="
        Add-Content $outputFile $content

    }
    catch {
        Write-Host "  -> Skipped unreadable file"
    }
}

# ===== START =====

New-Item -ItemType File -Path $outputFile -Force | Out-Null

Add-Content $outputFile "========== REACT CORE EXPORT =========="
Add-Content $outputFile "Project Root: $projectRoot"
Add-Content $outputFile "Generated On: $(Get-Date)"
Add-Content $outputFile "======================================="

# ===== COLLECT FILES =====

$allFiles = @()

# src folder
$srcPath = Join-Path $projectRoot "src"

if (Test-Path $srcPath) {
    $allFiles += Get-ChildItem $srcPath -Recurse -File -Force
}

# public folder (text files only)
$publicPath = Join-Path $projectRoot "public"

if (Test-Path $publicPath) {
    $allFiles += Get-ChildItem $publicPath -Recurse -File -Force |
        Where-Object {
            $_.Extension.ToLower() -in @(
                ".json",
                ".txt",
                ".yaml",
                ".yml",
                ".xml",
                ".svg",
                ".csv",
                ".md",
                ".html",
                ".css",
                ".js",
                ".ts"
            )
        }
}

# index.html
$indexHtml = Join-Path $projectRoot "index.html"

if (Test-Path $indexHtml) {
    $allFiles += Get-Item $indexHtml
}

# package.json
$packageJson = Join-Path $projectRoot "package.json"

if (Test-Path $packageJson) {
    $allFiles += Get-Item $packageJson
}

# vite.config.*
Get-ChildItem $projectRoot -File -Force |
Where-Object {
    $_.Name -match "^vite\.config\.(js|ts|mjs|cjs)$"
} | ForEach-Object {
    $allFiles += $_
}

# tsconfig*.json
Get-ChildItem $projectRoot -File -Force |
Where-Object {
    $_.Name -like "tsconfig*.json"
} | ForEach-Object {
    $allFiles += $_
}

# .env files
Get-ChildItem $projectRoot -File -Force |
Where-Object {
    $_.Name -like ".env*"
} | ForEach-Object {
    $allFiles += $_
}

# Remove duplicates and sort
$allFiles = $allFiles |
    Sort-Object FullName -Unique

$totalFiles = $allFiles.Count

Write-Host ""
Write-Host "======================================"
Write-Host "React Core Export Starting..."
Write-Host "Files Found: $totalFiles"
Write-Host "======================================"
Write-Host ""

# ===== PROCESS FILES =====

$index = 0

foreach ($file in $allFiles) {
    $index++

    Write-FileContent `
        -filePath $file.FullName `
        -index $index `
        -total $totalFiles
}

# ===== COMPLETE =====

Write-Host ""
Write-Host "======================================"
Write-Host "DONE ✅"
Write-Host "Export saved to:"
Write-Host $outputFile
Write-Host "======================================"