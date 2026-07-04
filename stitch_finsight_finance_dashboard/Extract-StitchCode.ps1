# ==========================================
# Extract All Stitch code.html Files
# ==========================================

$rootFolder = Get-Location
$outputFile = Join-Path $rootFolder "FullAppCode.txt"

# Find all code.html files
$htmlFiles = Get-ChildItem -Path $rootFolder -Recurse -File -Filter "code.html"

$totalFiles = $htmlFiles.Count
$currentFile = 0

# Clear old output file if it exists
if (Test-Path $outputFile) {
    Remove-Item $outputFile
}

# Header
Add-Content -Path $outputFile -Value "STITCH APP SOURCE CODE EXPORT"
Add-Content -Path $outputFile -Value "Generated: $(Get-Date)"
Add-Content -Path $outputFile -Value ("=" * 100)
Add-Content -Path $outputFile -Value ""

foreach ($file in $htmlFiles) {

    $currentFile++

    $percent = [math]::Round(($currentFile / $totalFiles) * 100)

    Write-Progress `
        -Activity "Extracting code.html files" `
        -Status "$currentFile of $totalFiles processed" `
        -PercentComplete $percent

    $screenName = Split-Path $file.DirectoryName -Leaf

    $content = Get-Content $file.FullName -Raw

    Add-Content -Path $outputFile -Value ""
    Add-Content -Path $outputFile -Value ("#" * 100)
    Add-Content -Path $outputFile -Value "SCREEN: $screenName"
    Add-Content -Path $outputFile -Value "SOURCE: $($file.FullName)"
    Add-Content -Path $outputFile -Value ("#" * 100)
    Add-Content -Path $outputFile -Value ""
    Add-Content -Path $outputFile -Value $content
    Add-Content -Path $outputFile -Value ""
    Add-Content -Path $outputFile -Value ("-" * 100)
    Add-Content -Path $outputFile -Value ""
}

Write-Progress `
    -Activity "Extracting code.html files" `
    -Completed

Write-Host ""
Write-Host "Extraction completed successfully!" -ForegroundColor Green
Write-Host "Output file: $outputFile" -ForegroundColor Cyan
Write-Host "Screens processed: $totalFiles" -ForegroundColor Yellow