$baseUrl = "http://localhost:3000"
$allPassed = $true

Write-Host "--- Starting E2E & API Automated Tests ---" -ForegroundColor Cyan

# Test 1: Homepage availability
try {
    $r1 = Invoke-WebRequest -Uri "$baseUrl/" -UseBasicParsing -TimeoutSec 10
    if ($r1.StatusCode -eq 200) {
        Write-Host "[PASS] TC-01: Homepage returned 200 OK" -ForegroundColor Green
    } else {
        Write-Host "[FAIL] TC-01: Homepage returned $($r1.StatusCode)" -ForegroundColor Red
        $allPassed = $false
    }
} catch {
    Write-Host "[FAIL] TC-01: Homepage error: $_" -ForegroundColor Red
    $allPassed = $false
}

# Test 2: Admissions GET API
try {
    $r2 = Invoke-RestMethod -Uri "$baseUrl/api/admissions" -Method GET -TimeoutSec 10
    if ($r2.success -eq $true) {
        Write-Host "[PASS] TC-02: GET /api/admissions returns success=true (Total records: $($r2.count))" -ForegroundColor Green
    } else {
        Write-Host "[FAIL] TC-02: GET /api/admissions returned invalid response" -ForegroundColor Red
        $allPassed = $false
    }
} catch {
    Write-Host "[FAIL] TC-02: API error: $_" -ForegroundColor Red
    $allPassed = $false
}

# Test 3: Admissions POST API (Valid submission)
try {
    $testPayload = @{
        name = "QA Automated Test User"
        email = "qatest@diu-test.edu"
        phone = "01899001122"
        program = "B.Sc. in Software Engineering"
        sscGpa = 5.0
        hscGpa = 4.90
    } | ConvertTo-Json

    $r3 = Invoke-RestMethod -Uri "$baseUrl/api/admissions" -Method POST -Body $testPayload -ContentType "application/json"
    if ($r3.success -eq $true -and $r3.applicationId -match "^APP-") {
        Write-Host "[PASS] TC-03: POST /api/admissions created new record with ID: $($r3.applicationId)" -ForegroundColor Green
    } else {
        Write-Host "[FAIL] TC-03: POST failed to generate expected ID" -ForegroundColor Red
        $allPassed = $false
    }
} catch {
    Write-Host "[FAIL] TC-03: POST error: $_" -ForegroundColor Red
    $allPassed = $false
}

# Test 4: Admissions POST API (Invalid empty submission - negative testing)
try {
    $badPayload = @{ name = "" } | ConvertTo-Json
    $r4 = Invoke-WebRequest -Uri "$baseUrl/api/admissions" -Method POST -Body $badPayload -ContentType "application/json" -UseBasicParsing
    Write-Host "[FAIL] TC-04: Expected 400 Bad Request, got $($r4.StatusCode)" -ForegroundColor Red
    $allPassed = $false
} catch {
    if ($_.Exception.Response.StatusCode.value__ -eq 400) {
        Write-Host "[PASS] TC-04: Negative test passed: 400 Bad Request rejected invalid submission correctly" -ForegroundColor Green
    } else {
        Write-Host "[FAIL] TC-04: Unexpected error code: $_" -ForegroundColor Red
        $allPassed = $false
    }
}

Write-Host "--- Test Suite Completed: $(if($allPassed){'ALL TESTS PASSED'}else{'SOME TESTS FAILED'}) ---" -ForegroundColor $(if($allPassed){'Green'}else{'Red'})
