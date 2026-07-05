STITCH APP SOURCE CODE EXPORT
Generated: 07/04/2026 22:55:49
====================================================================================================

####################################################################################################
SCREEN: finsight_dashboard
SOURCE: C:\Projects\FINSIGHT\stitch_finsight_finance_dashboard\finsight_dashboard\code.html
####################################################################################################

<!DOCTYPE html>

<html class="light" lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>FinSight — Modern Financial Dashboard</title>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<script id="tailwind-config">
        tailwind.config = {
            darkMode: "class",
            theme: {
                extend: {
                    "colors": {
                        "secondary-fixed": "#7df5f4",
                        "on-tertiary-container": "#ffeedd",
                        "tertiary-fixed-dim": "#ffb95f",
                        "error": "#ba1a1a",
                        "surface-bright": "#faf8ff",
                        "on-secondary-fixed": "#002020",
                        "secondary": "#006a69",
                        "on-tertiary-fixed-variant": "#653e00",
                        "on-primary-fixed-variant": "#003ea8",
                        "on-tertiary": "#ffffff",
                        "on-surface": "#131b2e",
                        "inverse-surface": "#283044",
                        "surface": "#faf8ff",
                        "secondary-container": "#7df5f4",
                        "inverse-primary": "#b4c5ff",
                        "on-error": "#ffffff",
                        "surface-container-high": "#e2e7ff",
                        "on-tertiary-fixed": "#2a1700",
                        "on-error-container": "#93000a",
                        "secondary-fixed-dim": "#5ed9d7",
                        "on-primary-container": "#eeefff",
                        "outline": "#737686",
                        "primary-fixed": "#dbe1ff",
                        "primary-container": "#2563eb",
                        "surface-container-low": "#f2f3ff",
                        "surface-tint": "#0053db",
                        "surface-dim": "#d2d9f4",
                        "on-primary": "#ffffff",
                        "surface-container-highest": "#dae2fd",
                        "surface-variant": "#dae2fd",
                        "outline-variant": "#c3c6d7",
                        "primary": "#004ac6",
                        "on-surface-variant": "#434655",
                        "inverse-on-surface": "#eef0ff",
                        "background": "#faf8ff",
                        "surface-container-lowest": "#ffffff",
                        "error-container": "#ffdad6",
                        "on-primary-fixed": "#00174b",
                        "tertiary-fixed": "#ffddb8",
                        "primary-fixed-dim": "#b4c5ff",
                        "on-background": "#131b2e",
                        "tertiary": "#784b00",
                        "surface-container": "#eaedff",
                        "tertiary-container": "#996100",
                        "on-secondary-fixed-variant": "#00504f",
                        "on-secondary-container": "#007070",
                        "on-secondary": "#ffffff"
                    },
                    "borderRadius": {
                        "DEFAULT": "0.25rem",
                        "lg": "0.5rem",
                        "xl": "0.75rem",
                        "full": "9999px"
                    },
                    "spacing": {
                        "base": "4px",
                        "xs": "4px",
                        "gutter": "16px",
                        "sm": "8px",
                        "xl": "32px",
                        "2xl": "48px",
                        "margin-desktop": "40px",
                        "lg": "24px",
                        "md": "16px",
                        "margin-mobile": "16px"
                    },
                    "fontFamily": {
                        "label": ["Inter"],
                        "small": ["Inter"],
                        "h2": ["Inter"],
                        "h1": ["Inter"],
                        "h1-mobile": ["Inter"],
                        "h3": ["Inter"],
                        "body": ["Inter"]
                    },
                    "fontSize": {
                        "label": ["13px", {"lineHeight": "1.2", "letterSpacing": "0.01em", "fontWeight": "500"}],
                        "small": ["13px", {"lineHeight": "1.5", "letterSpacing": "0", "fontWeight": "400"}],
                        "h2": ["24px", {"lineHeight": "1.3", "letterSpacing": "-0.01em", "fontWeight": "600"}],
                        "h1": ["32px", {"lineHeight": "1.2", "letterSpacing": "-0.02em", "fontWeight": "700"}],
                        "h1-mobile": ["24px", {"lineHeight": "1.2", "letterSpacing": "-0.01em", "fontWeight": "700"}],
                        "h3": ["18px", {"lineHeight": "1.4", "letterSpacing": "0", "fontWeight": "600"}],
                        "body": ["15px", {"lineHeight": "1.6", "letterSpacing": "0", "fontWeight": "400"}]
                    }
                },
            },
        }
    </script>
<style>
        body {
            font-family: 'Inter', sans-serif;
            background-color: #F8FAFC;
        }
        .material-symbols-outlined {
            font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
            vertical-align: middle;
        }
        .custom-shadow {
            box-shadow: 0 1px 3px rgba(0,0,0,0.08);
        }
        .chart-container {
            position: relative;
        }
        .donut-segment {
            transition: stroke-dashoffset 0.3s ease;
        }
    </style>
</head>
<body class="bg-background text-on-surface min-h-screen flex flex-col">
<!-- TopAppBar Component Implementation -->
<header class="bg-surface dark:bg-surface-container-lowest border-b border-outline-variant dark:border-outline docked full-width top-0 h-[72px] flex justify-between items-center w-full px-margin-desktop max-w-full sticky z-50">
<div class="flex items-center gap-md">
<div class="w-10 h-10 bg-primary-container rounded-lg flex items-center justify-center text-on-primary">
<span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">account_balance_wallet</span>
</div>
<h1 class="font-h3 text-h3 font-semibold text-on-surface dark:text-on-surface-variant tracking-tight">FinSight</h1>
</div>
<div class="flex items-center gap-lg">
<button class="flex items-center gap-sm bg-surface-container-low px-md py-sm rounded-full font-label text-label text-on-surface-variant hover:bg-surface-container-high transition-colors">
<span>This Month</span>
<span class="material-symbols-outlined text-[18px]">expand_more</span>
</button>
<div class="flex items-center gap-sm">
<button class="w-10 h-10 flex items-center justify-center rounded-full text-on-surface-variant hover:bg-surface-container-low transition-colors">
<span class="material-symbols-outlined" data-icon="light_mode">light_mode</span>
</button>
<button class="w-10 h-10 flex items-center justify-center rounded-full text-on-surface-variant hover:bg-surface-container-low transition-colors">
<span class="material-symbols-outlined" data-icon="calendar_month">calendar_month</span>
</button>
</div>
</div>
</header>
<main class="flex-grow px-margin-desktop py-xl max-w-[1440px] mx-auto w-full space-y-xl">
<!-- Summary Row -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-lg">
<!-- Balance -->
<div class="bg-surface-container-lowest p-lg rounded-xl custom-shadow border border-outline-variant flex flex-col gap-sm">
<span class="font-label text-label text-on-surface-variant">Total Balance</span>
<div class="flex items-end justify-between">
<span class="font-h1 text-h1 text-on-surface tracking-tighter">$12,480.32</span>
<span class="bg-secondary-container/20 text-secondary font-label text-[12px] px-sm py-[2px] rounded-full flex items-center gap-xs">
<span class="material-symbols-outlined text-[14px]">trending_up</span>
                        +4.2%
                    </span>
</div>
</div>
<!-- Income -->
<div class="bg-surface-container-lowest p-lg rounded-xl custom-shadow border border-outline-variant flex flex-col gap-sm">
<span class="font-label text-label text-on-surface-variant">Monthly Income</span>
<div class="flex items-end justify-between">
<span class="font-h1 text-h1 text-on-surface tracking-tighter">$6,200.00</span>
<div class="w-8 h-8 rounded-full bg-primary-container/10 flex items-center justify-center text-primary">
<span class="material-symbols-outlined text-[20px]">trending_up</span>
</div>
</div>
</div>
<!-- Expenses -->
<div class="bg-surface-container-lowest p-lg rounded-xl custom-shadow border border-outline-variant flex flex-col gap-sm">
<span class="font-label text-label text-on-surface-variant">Monthly Expenses</span>
<div class="flex items-end justify-between">
<span class="font-h1 text-h1 text-on-surface tracking-tighter">$3,940.15</span>
<div class="w-8 h-8 rounded-full bg-error-container/30 flex items-center justify-center text-error">
<span class="material-symbols-outlined text-[20px]">trending_down</span>
</div>
</div>
</div>
<!-- Savings -->
<div class="bg-surface-container-lowest p-lg rounded-xl custom-shadow border border-outline-variant flex flex-col gap-sm">
<span class="font-label text-label text-on-surface-variant">Net Savings</span>
<div class="flex items-end justify-between">
<span class="font-h1 text-h1 text-on-surface tracking-tighter">$2,259.85</span>
<span class="bg-secondary-container/20 text-secondary font-label text-[12px] px-sm py-[2px] rounded-full flex items-center gap-xs">
<span class="material-symbols-outlined text-[14px]">trending_up</span>
                        +8.1%
                    </span>
</div>
</div>
</div>
<!-- Charts Row -->
<div class="grid grid-cols-1 lg:grid-cols-10 gap-lg">
<!-- Income vs Expenses (60%) -->
<div class="lg:col-span-6 bg-surface-container-lowest p-lg rounded-xl custom-shadow border border-outline-variant flex flex-col gap-lg">
<div class="flex items-center justify-between">
<h2 class="font-h3 text-h3 text-on-surface">Income vs Expenses</h2>
<div class="flex gap-md">
<div class="flex items-center gap-xs">
<span class="w-3 h-3 rounded-full bg-primary"></span>
<span class="font-label text-label text-on-surface-variant">Income</span>
</div>
<div class="flex items-center gap-xs">
<span class="w-3 h-3 rounded-full bg-tertiary"></span>
<span class="font-label text-label text-on-surface-variant">Expenses</span>
</div>
</div>
</div>
<div class="h-64 w-full flex items-end gap-2 px-sm">
<!-- Simple CSS bar chart visualization for demonstration -->
<div class="flex-1 flex flex-col justify-end gap-1 h-full">
<div class="flex items-end gap-[2px] h-full">
<div class="w-1/2 bg-primary rounded-t-sm" style="height: 60%"></div>
<div class="w-1/2 bg-tertiary rounded-t-sm" style="height: 45%"></div>
</div>
<span class="font-small text-small text-on-surface-variant text-center">Jan</span>
</div>
<div class="flex-1 flex flex-col justify-end gap-1 h-full">
<div class="flex items-end gap-[2px] h-full">
<div class="w-1/2 bg-primary rounded-t-sm" style="height: 75%"></div>
<div class="w-1/2 bg-tertiary rounded-t-sm" style="height: 50%"></div>
</div>
<span class="font-small text-small text-on-surface-variant text-center">Feb</span>
</div>
<div class="flex-1 flex flex-col justify-end gap-1 h-full">
<div class="flex items-end gap-[2px] h-full">
<div class="w-1/2 bg-primary rounded-t-sm" style="height: 65%"></div>
<div class="w-1/2 bg-tertiary rounded-t-sm" style="height: 55%"></div>
</div>
<span class="font-small text-small text-on-surface-variant text-center">Mar</span>
</div>
<div class="flex-1 flex flex-col justify-end gap-1 h-full">
<div class="flex items-end gap-[2px] h-full">
<div class="w-1/2 bg-primary rounded-t-sm" style="height: 85%"></div>
<div class="w-1/2 bg-tertiary rounded-t-sm" style="height: 40%"></div>
</div>
<span class="font-small text-small text-on-surface-variant text-center">Apr</span>
</div>
<div class="flex-1 flex flex-col justify-end gap-1 h-full">
<div class="flex items-end gap-[2px] h-full">
<div class="w-1/2 bg-primary rounded-t-sm" style="height: 70%"></div>
<div class="w-1/2 bg-tertiary rounded-t-sm" style="height: 60%"></div>
</div>
<span class="font-small text-small text-on-surface-variant text-center">May</span>
</div>
<div class="flex-1 flex flex-col justify-end gap-1 h-full">
<div class="flex items-end gap-[2px] h-full">
<div class="w-1/2 bg-primary rounded-t-sm" style="height: 90%"></div>
<div class="w-1/2 bg-tertiary rounded-t-sm" style="height: 48%"></div>
</div>
<span class="font-small text-small text-on-surface-variant text-center">Jun</span>
</div>
</div>
</div>
<!-- Spending by Category (40%) -->
<div class="lg:col-span-4 bg-surface-container-lowest p-lg rounded-xl custom-shadow border border-outline-variant flex flex-col gap-lg">
<h2 class="font-h3 text-h3 text-on-surface">Spending by Category</h2>
<div class="flex flex-col md:flex-row items-center gap-xl h-full">
<div class="relative w-40 h-40 flex-shrink-0">
<svg class="w-full h-full -rotate-90" viewbox="0 0 36 36">
<circle cx="18" cy="18" fill="transparent" r="15.915" stroke="#eaedff" stroke-width="4"></circle>
<!-- Housing 38% -->
<circle cx="18" cy="18" fill="transparent" r="15.915" stroke="#2563eb" stroke-dasharray="38 62" stroke-dashoffset="0" stroke-width="4"></circle>
<!-- Food 22% -->
<circle cx="18" cy="18" fill="transparent" r="15.915" stroke="#006a69" stroke-dasharray="22 78" stroke-dashoffset="-38" stroke-width="4"></circle>
<!-- Transport 15% -->
<circle cx="18" cy="18" fill="transparent" r="15.915" stroke="#784b00" stroke-dasharray="15 85" stroke-dashoffset="-60" stroke-width="4"></circle>
</svg>
<div class="absolute inset-0 flex flex-col items-center justify-center">
<span class="font-label text-label text-on-surface-variant">Total</span>
<span class="font-h3 text-h3 text-on-surface">$3,940</span>
</div>
</div>
<div class="flex flex-col gap-sm w-full">
<div class="flex items-center justify-between">
<div class="flex items-center gap-sm">
<span class="w-2 h-2 rounded-full bg-primary"></span>
<span class="font-body text-body text-on-surface">Housing</span>
</div>
<span class="font-label text-label text-on-surface">38%</span>
</div>
<div class="flex items-center justify-between">
<div class="flex items-center gap-sm">
<span class="w-2 h-2 rounded-full bg-secondary"></span>
<span class="font-body text-body text-on-surface">Food</span>
</div>
<span class="font-label text-label text-on-surface">22%</span>
</div>
<div class="flex items-center justify-between">
<div class="flex items-center gap-sm">
<span class="w-2 h-2 rounded-full bg-tertiary"></span>
<span class="font-body text-body text-on-surface">Transport</span>
</div>
<span class="font-label text-label text-on-surface">15%</span>
</div>
<div class="flex items-center justify-between">
<div class="flex items-center gap-sm">
<span class="w-2 h-2 rounded-full bg-outline"></span>
<span class="font-body text-body text-on-surface">Other</span>
</div>
<span class="font-label text-label text-on-surface">25%</span>
</div>
</div>
</div>
</div>
</div>
<!-- Transactions Section -->
<section class="bg-surface-container-lowest rounded-xl custom-shadow border border-outline-variant overflow-hidden">
<div class="p-lg flex flex-col md:flex-row md:items-center justify-between gap-md border-b border-outline-variant">
<h2 class="font-h3 text-h3 text-on-surface">Recent Transactions</h2>
<div class="flex flex-col md:flex-row gap-sm items-center">
<div class="relative w-full md:w-64">
<span class="material-symbols-outlined absolute left-sm top-1/2 -translate-y-1/2 text-outline text-[20px]">search</span>
<input class="w-full pl-xl pr-md py-sm border border-outline-variant rounded-lg font-body text-body bg-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all" placeholder="Search merchant..." type="text"/>
</div>
<button class="w-full md:w-auto px-md py-sm border border-outline-variant rounded-lg font-label text-label text-on-surface-variant flex items-center justify-center gap-sm hover:bg-surface-container-low transition-colors">
<span class="material-symbols-outlined text-[20px]">filter_list</span>
                        Category
                    </button>
</div>
</div>
<div class="overflow-x-auto">
<table class="w-full">
<thead class="bg-surface-container-low">
<tr>
<th class="px-lg py-md text-left font-label text-label text-on-surface-variant uppercase tracking-wider">Merchant</th>
<th class="px-lg py-md text-left font-label text-label text-on-surface-variant uppercase tracking-wider">Category</th>
<th class="px-lg py-md text-left font-label text-label text-on-surface-variant uppercase tracking-wider">Date</th>
<th class="px-lg py-md text-right font-label text-label text-on-surface-variant uppercase tracking-wider">Amount</th>
</tr>
</thead>
<tbody class="divide-y divide-outline-variant">
<tr class="hover:bg-surface-container-low transition-colors cursor-pointer group">
<td class="px-lg py-md">
<div class="flex items-center gap-md">
<div class="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center text-primary-container">
<span class="material-symbols-outlined">shopping_basket</span>
</div>
<span class="font-body text-body font-semibold text-on-surface">Whole Foods Market</span>
</div>
</td>
<td class="px-lg py-md">
<span class="bg-secondary-container/10 text-on-secondary-container font-label text-[12px] px-sm py-[2px] rounded-full">Food</span>
</td>
<td class="px-lg py-md font-body text-body text-on-surface-variant">Jun 28, 2024</td>
<td class="px-lg py-md text-right font-body text-body font-bold text-error">-$84.32</td>
</tr>
<tr class="hover:bg-surface-container-low transition-colors cursor-pointer group">
<td class="px-lg py-md">
<div class="flex items-center gap-md">
<div class="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center text-primary-container">
<span class="material-symbols-outlined">home</span>
</div>
<span class="font-body text-body font-semibold text-on-surface">Landlord LLC</span>
</div>
</td>
<td class="px-lg py-md">
<span class="bg-primary-container/10 text-primary font-label text-[12px] px-sm py-[2px] rounded-full">Housing</span>
</td>
<td class="px-lg py-md font-body text-body text-on-surface-variant">Jun 1, 2024</td>
<td class="px-lg py-md text-right font-body text-body font-bold text-error">-$1,450.00</td>
</tr>
<tr class="hover:bg-surface-container-low transition-colors cursor-pointer group">
<td class="px-lg py-md">
<div class="flex items-center gap-md">
<div class="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center text-primary-container">
<span class="material-symbols-outlined">payments</span>
</div>
<span class="font-body text-body font-semibold text-on-surface">Acme Corp Payroll</span>
</div>
</td>
<td class="px-lg py-md">
<span class="bg-secondary-container/10 text-on-secondary-container font-label text-[12px] px-sm py-[2px] rounded-full">Income</span>
</td>
<td class="px-lg py-md font-body text-body text-on-surface-variant">Jun 15, 2024</td>
<td class="px-lg py-md text-right font-body text-body font-bold text-secondary">+$3,100.00</td>
</tr>
</tbody>
</table>
</div>
<div class="p-lg border-t border-outline-variant flex items-center justify-between">
<span class="font-label text-label text-on-surface-variant">Showing 3 of 42 transactions</span>
<div class="flex items-center gap-xs">
<button class="w-8 h-8 flex items-center justify-center rounded border border-outline-variant text-on-surface-variant hover:bg-surface-container-low transition-colors">
<span class="material-symbols-outlined text-[18px]">chevron_left</span>
</button>
<button class="w-8 h-8 flex items-center justify-center rounded bg-primary text-on-primary font-label text-label">1</button>
<button class="w-8 h-8 flex items-center justify-center rounded border border-outline-variant text-on-surface-variant hover:bg-surface-container-low transition-colors">2</button>
<button class="w-8 h-8 flex items-center justify-center rounded border border-outline-variant text-on-surface-variant hover:bg-surface-container-low transition-colors">
<span class="material-symbols-outlined text-[18px]">chevron_right</span>
</button>
</div>
</div>
</section>
<!-- Savings Goals Section -->
<section class="space-y-lg">
<div class="flex items-center justify-between">
<h2 class="font-h3 text-h3 text-on-surface">Savings Goals</h2>
<button class="text-primary font-label text-label flex items-center gap-xs hover:underline transition-all">
                    View all goals <span class="material-symbols-outlined text-[18px]">arrow_forward</span>
</button>
</div>
<div class="grid grid-cols-1 md:grid-cols-3 gap-lg">
<!-- Goal 1 -->
<div class="bg-surface-container-lowest p-lg rounded-xl custom-shadow border border-outline-variant flex flex-col gap-lg">
<div class="flex items-center gap-md">
<div class="w-10 h-10 rounded-lg bg-surface-container-low flex items-center justify-center text-primary">
<span class="material-symbols-outlined">emergency_home</span>
</div>
<div>
<h3 class="font-body text-body font-bold text-on-surface">Emergency Fund</h3>
<p class="font-small text-small text-on-surface-variant">Target: $10,000</p>
</div>
</div>
<div class="space-y-sm">
<div class="flex items-center justify-between font-label text-label">
<span class="text-primary">64% complete</span>
<span class="text-on-surface-variant">$6,400 saved</span>
</div>
<div class="h-2 w-full bg-surface-container-low rounded-full overflow-hidden">
<div class="h-full bg-primary rounded-full transition-all duration-1000" style="width: 64%"></div>
</div>
<p class="font-small text-small text-on-surface-variant mt-xs italic">Est. completion: Oct 2024</p>
</div>
</div>
<!-- Goal 2 -->
<div class="bg-surface-container-lowest p-lg rounded-xl custom-shadow border border-outline-variant flex flex-col gap-lg">
<div class="flex items-center gap-md">
<div class="w-10 h-10 rounded-lg bg-surface-container-low flex items-center justify-center text-secondary">
<span class="material-symbols-outlined">flight_takeoff</span>
</div>
<div>
<h3 class="font-body text-body font-bold text-on-surface">Vacation to Japan</h3>
<p class="font-small text-small text-on-surface-variant">Target: $4,500</p>
</div>
</div>
<div class="space-y-sm">
<div class="flex items-center justify-between font-label text-label">
<span class="text-secondary">28% complete</span>
<span class="text-on-surface-variant">$1,260 saved</span>
</div>
<div class="h-2 w-full bg-surface-container-low rounded-full overflow-hidden">
<div class="h-full bg-secondary rounded-full transition-all duration-1000" style="width: 28%"></div>
</div>
<p class="font-small text-small text-on-surface-variant mt-xs italic">Est. completion: Mar 2025</p>
</div>
</div>
<!-- Goal 3 -->
<div class="bg-surface-container-lowest p-lg rounded-xl custom-shadow border border-outline-variant flex flex-col gap-lg">
<div class="flex items-center gap-md">
<div class="w-10 h-10 rounded-lg bg-surface-container-low flex items-center justify-center text-tertiary">
<span class="material-symbols-outlined">laptop_mac</span>
</div>
<div>
<h3 class="font-body text-body font-bold text-on-surface">New Laptop</h3>
<p class="font-small text-small text-on-surface-variant">Target: $2,400</p>
</div>
</div>
<div class="space-y-sm">
<div class="flex items-center justify-between font-label text-label">
<span class="text-tertiary">85% complete</span>
<span class="text-on-surface-variant">$2,040 saved</span>
</div>
<div class="h-2 w-full bg-surface-container-low rounded-full overflow-hidden">
<div class="h-full bg-tertiary rounded-full transition-all duration-1000" style="width: 85%"></div>
</div>
<p class="font-small text-small text-on-surface-variant mt-xs italic">Est. completion: Next month</p>
</div>
</div>
</div>
</section>
</main>
<!-- Footer Component Implementation -->
<footer class="bg-surface dark:bg-surface-container-lowest text-on-surface-variant dark:text-outline border-t border-outline-variant dark:border-outline docked full-width bottom-0 flex justify-center items-center w-full py-lg">
<div class="flex flex-col items-center gap-sm">
<span class="font-label text-label font-bold text-on-surface tracking-wide uppercase opacity-50">FinSight — Demo Dashboard</span>
<div class="flex gap-lg font-small text-small">
<a class="hover:text-primary transition-colors" href="#">Privacy Policy</a>
<a class="hover:text-primary transition-colors" href="#">Terms of Service</a>
<a class="hover:text-primary transition-colors" href="#">Support</a>
</div>
</div>
</footer>
<script>
        // Simple dark mode toggle logic
        const themeToggle = document.querySelector('[data-icon="light_mode"]')?.parentElement;
        themeToggle?.addEventListener('click', () => {
            document.documentElement.classList.toggle('dark');
            const icon = themeToggle.querySelector('span');
            if (document.documentElement.classList.contains('dark')) {
                icon.textContent = 'dark_mode';
            } else {
                icon.textContent = 'light_mode';
            }
        });

        // Hover effect for transactions
        document.querySelectorAll('tbody tr').forEach(row => {
            row.addEventListener('mouseenter', () => {
                row.classList.add('bg-surface-container-low');
            });
            row.addEventListener('mouseleave', () => {
                row.classList.remove('bg-surface-container-low');
            });
        });
    </script>

</body></html>

---

####################################################################################################
SCREEN: savings_goals
SOURCE: C:\Projects\FINSIGHT\stitch_finsight_finance_dashboard\savings_goals\code.html
####################################################################################################

<!DOCTYPE html>

<html class="light" lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>Savings Goals | FinSight</title>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<script id="tailwind-config">
        tailwind.config = {
            darkMode: "class",
            theme: {
                extend: {
                    "colors": {
                        "secondary-fixed": "#7df5f4",
                        "on-tertiary-container": "#ffeedd",
                        "tertiary-fixed-dim": "#ffb95f",
                        "error": "#ba1a1a",
                        "surface-bright": "#faf8ff",
                        "on-secondary-fixed": "#002020",
                        "secondary": "#006a69",
                        "on-tertiary-fixed-variant": "#653e00",
                        "on-primary-fixed-variant": "#003ea8",
                        "on-tertiary": "#ffffff",
                        "on-surface": "#131b2e",
                        "inverse-surface": "#283044",
                        "surface": "#faf8ff",
                        "secondary-container": "#7df5f4",
                        "inverse-primary": "#b4c5ff",
                        "on-error": "#ffffff",
                        "surface-container-high": "#e2e7ff",
                        "on-tertiary-fixed": "#2a1700",
                        "on-error-container": "#93000a",
                        "secondary-fixed-dim": "#5ed9d7",
                        "on-primary-container": "#eeefff",
                        "outline": "#737686",
                        "primary-fixed": "#dbe1ff",
                        "primary-container": "#2563eb",
                        "surface-container-low": "#f2f3ff",
                        "surface-tint": "#0053db",
                        "surface-dim": "#d2d9f4",
                        "on-primary": "#ffffff",
                        "surface-container-highest": "#dae2fd",
                        "surface-variant": "#dae2fd",
                        "outline-variant": "#c3c6d7",
                        "primary": "#004ac6",
                        "on-surface-variant": "#434655",
                        "inverse-on-surface": "#eef0ff",
                        "background": "#faf8ff",
                        "surface-container-lowest": "#ffffff",
                        "error-container": "#ffdad6",
                        "on-primary-fixed": "#00174b",
                        "tertiary-fixed": "#ffddb8",
                        "primary-fixed-dim": "#b4c5ff",
                        "on-background": "#131b2e",
                        "tertiary": "#784b00",
                        "surface-container": "#eaedff",
                        "tertiary-container": "#996100",
                        "on-secondary-fixed-variant": "#00504f",
                        "on-secondary-container": "#007070",
                        "on-secondary": "#ffffff"
                    },
                    "borderRadius": {
                        "DEFAULT": "0.25rem",
                        "lg": "0.5rem",
                        "xl": "0.75rem",
                        "full": "9999px"
                    },
                    "spacing": {
                        "base": "4px",
                        "xs": "4px",
                        "gutter": "16px",
                        "sm": "8px",
                        "xl": "32px",
                        "2xl": "48px",
                        "margin-desktop": "40px",
                        "lg": "24px",
                        "md": "16px",
                        "margin-mobile": "16px"
                    },
                    "fontFamily": {
                        "label": ["Inter"],
                        "small": ["Inter"],
                        "h2": ["Inter"],
                        "h1": ["Inter"],
                        "h1-mobile": ["Inter"],
                        "h3": ["Inter"],
                        "body": ["Inter"]
                    },
                    "fontSize": {
                        "label": ["13px", {"lineHeight": "1.2", "letterSpacing": "0.01em", "fontWeight": "500"}],
                        "small": ["13px", {"lineHeight": "1.5", "letterSpacing": "0", "fontWeight": "400"}],
                        "h2": ["24px", {"lineHeight": "1.3", "letterSpacing": "-0.01em", "fontWeight": "600"}],
                        "h1": ["32px", {"lineHeight": "1.2", "letterSpacing": "-0.02em", "fontWeight": "700"}],
                        "h1-mobile": ["24px", {"lineHeight": "1.2", "letterSpacing": "-0.01em", "fontWeight": "700"}],
                        "h3": ["18px", {"lineHeight": "1.4", "letterSpacing": "0", "fontWeight": "600"}],
                        "body": ["15px", {"lineHeight": "1.6", "letterSpacing": "0", "fontWeight": "400"}]
                    }
                },
            },
        }
    </script>
<style>
        body {
            background-color: #F8FAFC;
            font-family: 'Inter', sans-serif;
            color: #131b2e;
        }
        .glass-card {
            background: #FFFFFF;
            border: 1px solid #E2E8F0;
            box-shadow: 0 1px 3px rgba(0,0,0,0.08);
            border-radius: 12px;
            transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .glass-card:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(0,0,0,0.05);
        }
        .progress-container {
            background: #F1F5F9;
            height: 8px;
            border-radius: 999px;
            overflow: hidden;
        }
        .material-symbols-outlined {
            font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }
        .chart-bar {
            transition: height 1s ease-out;
        }
    </style>
</head>
<body class="min-h-screen flex flex-col">
<!-- TopAppBar -->
<header class="bg-surface dark:bg-surface-container-lowest border-b border-outline-variant dark:border-outline fixed top-0 w-full h-[72px] z-50 flex justify-between items-center px-margin-desktop">
<div class="flex items-center gap-xl">
<span class="font-h3 text-h3 font-semibold text-on-surface dark:text-on-surface-variant">FinSight</span>
<nav class="hidden md:flex gap-lg items-center h-full">
<a class="text-on-surface-variant dark:text-outline font-label text-label hover:bg-surface-container-low transition-colors py-2 px-3 rounded-lg" href="#">Dashboard</a>
<a class="text-primary dark:text-primary-fixed font-bold border-b-2 border-primary font-label text-label py-2 px-3" href="#">Savings Goals</a>
<a class="text-on-surface-variant dark:text-outline font-label text-label hover:bg-surface-container-low transition-colors py-2 px-3 rounded-lg" href="#">Transactions</a>
<a class="text-on-surface-variant dark:text-outline font-label text-label hover:bg-surface-container-low transition-colors py-2 px-3 rounded-lg" href="#">Reports</a>
</nav>
</div>
<div class="flex items-center gap-md">
<button class="p-2 rounded-full hover:bg-surface-container-low transition-colors">
<span class="material-symbols-outlined text-on-surface-variant">light_mode</span>
</button>
<button class="p-2 rounded-full hover:bg-surface-container-low transition-colors">
<span class="material-symbols-outlined text-on-surface-variant">calendar_month</span>
</button>
<div class="w-8 h-8 rounded-full bg-primary-container flex items-center justify-center text-white font-bold text-xs">
                JD
            </div>
</div>
</header>
<main class="flex-grow pt-[104px] pb-2xl px-margin-desktop max-w-[1440px] mx-auto w-full">
<!-- Page Title Row -->
<div class="flex justify-between items-end mb-xl">
<div>
<h1 class="font-h1 text-h1 text-on-surface mb-xs">Savings Goals</h1>
<p class="font-body text-body text-on-surface-variant">3 active goals · <span class="font-semibold text-on-surface">$8,700 saved total</span></p>
</div>
<button class="h-[44px] px-lg rounded-xl bg-outline-variant text-on-surface-variant opacity-60 cursor-not-allowed flex items-center gap-sm font-label text-label">
<span class="material-symbols-outlined text-[20px]">add</span>
                New Goal
            </button>
</div>
<!-- Goals Grid -->
<div class="grid grid-cols-1 md:grid-cols-3 gap-lg mb-2xl">
<!-- Card 1: Emergency Fund -->
<div class="glass-card p-lg flex flex-col">
<div class="flex justify-between items-start mb-md">
<div class="w-12 h-12 rounded-xl bg-primary-container/10 flex items-center justify-center text-primary">
<span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">shield</span>
</div>
<button class="text-on-surface-variant hover:text-on-surface">
<span class="material-symbols-outlined">more_horiz</span>
</button>
</div>
<h3 class="font-h3 text-h3 mb-xs">Emergency Fund</h3>
<div class="flex items-baseline gap-xs mb-md">
<span class="font-h2 text-h2 text-on-surface">$3,200</span>
<span class="font-body text-body text-on-surface-variant">of $5,000</span>
</div>
<div class="mb-lg">
<div class="flex justify-between items-center mb-sm">
<span class="font-label text-label text-on-surface-variant">Progress</span>
<span class="font-label text-label font-bold text-primary">64%</span>
</div>
<div class="progress-container">
<div class="bg-primary h-full rounded-full" style="width: 64%"></div>
</div>
</div>
<div class="grid grid-cols-2 gap-md pt-md border-t border-outline-variant">
<div>
<p class="font-small text-small text-on-surface-variant mb-xs">Monthly</p>
<p class="font-label text-label text-on-surface">$267/mo</p>
</div>
<div>
<p class="font-small text-small text-on-surface-variant mb-xs">Target Date</p>
<p class="font-label text-label text-on-surface">Nov 2026</p>
</div>
</div>
</div>
<!-- Card 2: Vacation to Japan -->
<div class="glass-card p-lg flex flex-col">
<div class="flex justify-between items-start mb-md">
<div class="w-12 h-12 rounded-xl bg-secondary-container/20 flex items-center justify-center text-secondary">
<span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">flight_takeoff</span>
</div>
<button class="text-on-surface-variant hover:text-on-surface">
<span class="material-symbols-outlined">more_horiz</span>
</button>
</div>
<h3 class="font-h3 text-h3 mb-xs">Vacation to Japan</h3>
<div class="flex items-baseline gap-xs mb-md">
<span class="font-h2 text-h2 text-on-surface">$2,100</span>
<span class="font-body text-body text-on-surface-variant">of $4,000</span>
</div>
<div class="mb-lg">
<div class="flex justify-between items-center mb-sm">
<span class="font-label text-label text-on-surface-variant">Progress</span>
<span class="font-label text-label font-bold text-secondary">52%</span>
</div>
<div class="progress-container">
<div class="bg-secondary h-full rounded-full" style="width: 52%"></div>
</div>
</div>
<div class="grid grid-cols-2 gap-md pt-md border-t border-outline-variant">
<div>
<p class="font-small text-small text-on-surface-variant mb-xs">Monthly</p>
<p class="font-label text-label text-on-surface">$175/mo</p>
</div>
<div>
<p class="font-small text-small text-on-surface-variant mb-xs">Target Date</p>
<p class="font-label text-label text-on-surface">Feb 2027</p>
</div>
</div>
</div>
<!-- Card 3: New Laptop -->
<div class="glass-card p-lg flex flex-col border-secondary">
<div class="flex justify-between items-start mb-md">
<div class="w-12 h-12 rounded-xl bg-[#DCFCE7] flex items-center justify-center text-[#166534]">
<span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">laptop_mac</span>
</div>
<span class="inline-flex items-center rounded-full bg-[#DCFCE7] px-2.5 py-0.5 text-xs font-semibold text-[#166534]">
                        Goal Reached! 🎉
                    </span>
</div>
<h3 class="font-h3 text-h3 mb-xs">New Laptop</h3>
<div class="flex items-baseline gap-xs mb-md">
<span class="font-h2 text-h2 text-on-surface">$3,400</span>
<span class="font-body text-body text-on-surface-variant">of $3,400</span>
</div>
<div class="mb-lg">
<div class="flex justify-between items-center mb-sm">
<span class="font-label text-label text-on-surface-variant">Progress</span>
<span class="font-label text-label font-bold text-[#166534]">100%</span>
</div>
<div class="progress-container">
<div class="bg-[#22C55E] h-full rounded-full" style="width: 100%"></div>
</div>
</div>
<div class="grid grid-cols-2 gap-md pt-md border-t border-outline-variant">
<div class="col-span-2">
<p class="font-small text-small text-on-surface-variant mb-xs">Achievement Date</p>
<p class="font-label text-label text-on-surface">Completed on Aug 14, 2024</p>
</div>
</div>
</div>
</div>
<!-- Goal History Section -->
<section class="glass-card p-xl">
<div class="flex justify-between items-center mb-xl">
<h3 class="font-h3 text-h3 text-on-surface">Contribution History</h3>
<div class="flex items-center gap-sm">
<span class="w-3 h-3 rounded-full bg-primary"></span>
<span class="font-label text-label text-on-surface-variant">Monthly Totals</span>
</div>
</div>
<div class="relative h-[300px] w-full flex items-end justify-between px-md gap-lg">
<!-- Grid Lines Background -->
<div class="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-50">
<div class="border-t border-outline-variant w-full h-0"></div>
<div class="border-t border-outline-variant w-full h-0"></div>
<div class="border-t border-outline-variant w-full h-0"></div>
<div class="border-t border-outline-variant w-full h-0"></div>
</div>
<!-- Bars -->
<div class="flex flex-col items-center flex-1 z-10">
<div class="chart-bar w-full max-w-[60px] bg-primary rounded-t-lg hover:brightness-110 transition-all cursor-pointer relative group" style="height: 60%">
<div class="absolute -top-8 left-1/2 -translate-x-1/2 bg-on-surface text-white px-2 py-1 rounded text-[10px] opacity-0 group-hover:opacity-100 transition-opacity">$1,100</div>
</div>
<span class="font-label text-label text-on-surface-variant mt-md">Mar</span>
</div>
<div class="flex flex-col items-center flex-1 z-10">
<div class="chart-bar w-full max-w-[60px] bg-primary rounded-t-lg hover:brightness-110 transition-all cursor-pointer relative group" style="height: 45%">
<div class="absolute -top-8 left-1/2 -translate-x-1/2 bg-on-surface text-white px-2 py-1 rounded text-[10px] opacity-0 group-hover:opacity-100 transition-opacity">$850</div>
</div>
<span class="font-label text-label text-on-surface-variant mt-md">Apr</span>
</div>
<div class="flex flex-col items-center flex-1 z-10">
<div class="chart-bar w-full max-w-[60px] bg-primary rounded-t-lg hover:brightness-110 transition-all cursor-pointer relative group" style="height: 85%">
<div class="absolute -top-8 left-1/2 -translate-x-1/2 bg-on-surface text-white px-2 py-1 rounded text-[10px] opacity-0 group-hover:opacity-100 transition-opacity">$1,550</div>
</div>
<span class="font-label text-label text-on-surface-variant mt-md">May</span>
</div>
<div class="flex flex-col items-center flex-1 z-10">
<div class="chart-bar w-full max-w-[60px] bg-primary rounded-t-lg hover:brightness-110 transition-all cursor-pointer relative group" style="height: 70%">
<div class="absolute -top-8 left-1/2 -translate-x-1/2 bg-on-surface text-white px-2 py-1 rounded text-[10px] opacity-0 group-hover:opacity-100 transition-opacity">$1,300</div>
</div>
<span class="font-label text-label text-on-surface-variant mt-md">Jun</span>
</div>
<div class="flex flex-col items-center flex-1 z-10">
<div class="chart-bar w-full max-w-[60px] bg-primary rounded-t-lg hover:brightness-110 transition-all cursor-pointer relative group" style="height: 55%">
<div class="absolute -top-8 left-1/2 -translate-x-1/2 bg-on-surface text-white px-2 py-1 rounded text-[10px] opacity-0 group-hover:opacity-100 transition-opacity">$1,000</div>
</div>
<span class="font-label text-label text-on-surface-variant mt-md">Jul</span>
</div>
<div class="flex flex-col items-center flex-1 z-10">
<div class="chart-bar w-full max-w-[60px] bg-primary-container rounded-t-lg hover:brightness-110 transition-all cursor-pointer relative group" style="height: 95%">
<div class="absolute -top-8 left-1/2 -translate-x-1/2 bg-on-surface text-white px-2 py-1 rounded text-[10px] opacity-0 group-hover:opacity-100 transition-opacity">$1,800</div>
</div>
<span class="font-label text-label font-bold text-on-surface mt-md">Aug</span>
</div>
</div>
</section>
</main>
<!-- Footer -->
<footer class="bg-surface dark:bg-surface-container-lowest border-t border-outline-variant dark:border-outline py-lg flex justify-center items-center w-full">
<div class="flex flex-col items-center gap-xs">
<span class="font-label text-label font-bold text-on-surface">FinSight</span>
<span class="font-small text-small text-on-surface-variant dark:text-outline">FinSight — Demo Dashboard</span>
<div class="flex gap-md mt-sm">
<a class="font-small text-small text-on-surface-variant hover:text-primary transition-colors" href="#">Privacy Policy</a>
<a class="font-small text-small text-on-surface-variant hover:text-primary transition-colors" href="#">Terms of Service</a>
<a class="font-small text-small text-on-surface-variant hover:text-primary transition-colors" href="#">Help Center</a>
</div>
</div>
</footer>
<script>
        // Micro-interaction for bar entrance animation
        document.addEventListener('DOMContentLoaded', () => {
            const bars = document.querySelectorAll('.chart-bar');
            bars.forEach((bar, index) => {
                const finalHeight = bar.style.height;
                bar.style.height = '0%';
                setTimeout(() => {
                    bar.style.height = finalHeight;
                }, 100 + (index * 100));
            });
        });
    </script>
</body></html>

---

####################################################################################################
SCREEN: transactions_history
SOURCE: C:\Projects\FINSIGHT\stitch_finsight_finance_dashboard\transactions_history\code.html
####################################################################################################

<!DOCTYPE html>

<html class="light" lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>Transactions | FinSight</title>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<script id="tailwind-config">
      tailwind.config = {
        darkMode: "class",
        theme: {
          extend: {
            "colors": {
                    "secondary-fixed": "#7df5f4",
                    "on-tertiary-container": "#ffeedd",
                    "tertiary-fixed-dim": "#ffb95f",
                    "error": "#ba1a1a",
                    "surface-bright": "#faf8ff",
                    "on-secondary-fixed": "#002020",
                    "secondary": "#006a69",
                    "on-tertiary-fixed-variant": "#653e00",
                    "on-primary-fixed-variant": "#003ea8",
                    "on-tertiary": "#ffffff",
                    "on-surface": "#131b2e",
                    "inverse-surface": "#283044",
                    "surface": "#faf8ff",
                    "secondary-container": "#7df5f4",
                    "inverse-primary": "#b4c5ff",
                    "on-error": "#ffffff",
                    "surface-container-high": "#e2e7ff",
                    "on-tertiary-fixed": "#2a1700",
                    "on-error-container": "#93000a",
                    "secondary-fixed-dim": "#5ed9d7",
                    "on-primary-container": "#eeefff",
                    "outline": "#737686",
                    "primary-fixed": "#dbe1ff",
                    "primary-container": "#2563eb",
                    "surface-container-low": "#f2f3ff",
                    "surface-tint": "#0053db",
                    "surface-dim": "#d2d9f4",
                    "on-primary": "#ffffff",
                    "surface-container-highest": "#dae2fd",
                    "surface-variant": "#dae2fd",
                    "outline-variant": "#c3c6d7",
                    "primary": "#004ac6",
                    "on-surface-variant": "#434655",
                    "inverse-on-surface": "#eef0ff",
                    "background": "#faf8ff",
                    "surface-container-lowest": "#ffffff",
                    "error-container": "#ffdad6",
                    "on-primary-fixed": "#00174b",
                    "tertiary-fixed": "#ffddb8",
                    "primary-fixed-dim": "#b4c5ff",
                    "on-background": "#131b2e",
                    "tertiary": "#784b00",
                    "surface-container": "#eaedff",
                    "tertiary-container": "#996100",
                    "on-secondary-fixed-variant": "#00504f",
                    "on-secondary-container": "#007070",
                    "on-secondary": "#ffffff"
            },
            "borderRadius": {
                    "DEFAULT": "0.25rem",
                    "lg": "0.5rem",
                    "xl": "0.75rem",
                    "full": "9999px"
            },
            "spacing": {
                    "base": "4px",
                    "xs": "4px",
                    "gutter": "16px",
                    "sm": "8px",
                    "xl": "32px",
                    "2xl": "48px",
                    "margin-desktop": "40px",
                    "lg": "24px",
                    "md": "16px",
                    "margin-mobile": "16px"
            },
            "fontFamily": {
                    "label": ["Inter"],
                    "small": ["Inter"],
                    "h2": ["Inter"],
                    "h1": ["Inter"],
                    "h1-mobile": ["Inter"],
                    "h3": ["Inter"],
                    "body": ["Inter"]
            },
            "fontSize": {
                    "label": ["13px", {"lineHeight": "1.2", "letterSpacing": "0.01em", "fontWeight": "500"}],
                    "small": ["13px", {"lineHeight": "1.5", "letterSpacing": "0", "fontWeight": "400"}],
                    "h2": ["24px", {"lineHeight": "1.3", "letterSpacing": "-0.01em", "fontWeight": "600"}],
                    "h1": ["32px", {"lineHeight": "1.2", "letterSpacing": "-0.02em", "fontWeight": "700"}],
                    "h3": ["18px", {"lineHeight": "1.4", "letterSpacing": "0", "fontWeight": "600"}],
                    "body": ["15px", {"lineHeight": "1.6", "letterSpacing": "0", "fontWeight": "400"}]
            }
          },
        },
      }
    </script>
<style>
        body {
            background-color: #F8FAFC; /* Level 0 Background per style guidance */
        }
        .card-shadow {
            box-shadow: 0 1px 3px rgba(0,0,0,0.08);
        }
        .material-symbols-outlined {
            font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }
        .transaction-row:hover {
            background-color: #f2f3ff; /* surface-container-low */
        }
    </style>
</head>
<body class="font-body text-on-surface antialiased">
<!-- TopAppBar -->
<header class="bg-surface sticky top-0 z-50 h-[72px] border-b border-outline-variant flex justify-between items-center w-full px-margin-desktop max-w-full">
<div class="flex items-center gap-xl">
<span class="font-h3 text-h3 font-semibold text-on-surface">FinSight</span>
<nav class="hidden md:flex items-center gap-lg">
<a class="font-label text-label text-on-surface-variant hover:bg-surface-container-low transition-colors px-md py-sm rounded-lg" href="#">Dashboard</a>
<a class="font-label text-label text-primary font-bold border-b-2 border-primary py-[24px]" href="#">Transactions</a>
<a class="font-label text-label text-on-surface-variant hover:bg-surface-container-low transition-colors px-md py-sm rounded-lg" href="#">Accounts</a>
<a class="font-label text-label text-on-surface-variant hover:bg-surface-container-low transition-colors px-md py-sm rounded-lg" href="#">Budgets</a>
</nav>
</div>
<div class="flex items-center gap-md">
<button class="p-sm rounded-full hover:bg-surface-container-low transition-colors text-on-surface-variant">
<span class="material-symbols-outlined" data-icon="light_mode">light_mode</span>
</button>
<button class="p-sm rounded-full hover:bg-surface-container-low transition-colors text-on-surface-variant">
<span class="material-symbols-outlined" data-icon="calendar_month">calendar_month</span>
</button>
<div class="w-8 h-8 rounded-full bg-primary-container flex items-center justify-center text-on-primary-container font-bold text-[12px]">
                JD
            </div>
</div>
</header>
<main class="max-w-[1440px] mx-auto px-margin-desktop py-xl">
<!-- Page Title Row -->
<div class="flex justify-between items-end mb-xl">
<div>
<h1 class="font-h1 text-h1 text-on-surface mb-xs">Transactions</h1>
<p class="font-body text-body text-on-surface-variant">84 transactions in this period</p>
</div>
<button class="flex items-center gap-sm px-lg h-[44px] border border-primary text-primary rounded-xl font-label text-label hover:bg-surface-container-low transition-all">
<span class="material-symbols-outlined text-[20px]" data-icon="download">download</span>
                Export CSV
            </button>
</div>
<!-- Filter Bar -->
<section class="bg-surface-container-lowest card-shadow border border-outline-variant rounded-xl p-lg mb-xl">
<div class="grid grid-cols-12 gap-lg items-center">
<div class="col-span-3">
<label class="block font-label text-label text-on-surface-variant mb-xs">Search</label>
<div class="relative">
<span class="material-symbols-outlined absolute left-md top-1/2 -translate-y-1/2 text-outline text-[20px]" data-icon="search">search</span>
<input class="w-full pl-[44px] pr-md py-sm rounded-xl border border-outline-variant focus:ring-2 focus:ring-primary focus:border-primary font-body text-body bg-transparent" placeholder="Merchant, category..." type="text"/>
</div>
</div>
<div class="col-span-2">
<label class="block font-label text-label text-on-surface-variant mb-xs">Category</label>
<select class="w-full px-md py-sm rounded-xl border border-outline-variant focus:ring-2 focus:ring-primary font-body text-body bg-transparent">
<option>All Categories</option>
<option>Transport</option>
<option>Entertainment</option>
<option>Food &amp; Drink</option>
<option>Shopping</option>
</select>
</div>
<div class="col-span-2">
<label class="block font-label text-label text-on-surface-variant mb-xs">Type</label>
<select class="w-full px-md py-sm rounded-xl border border-outline-variant focus:ring-2 focus:ring-primary font-body text-body bg-transparent">
<option>All Types</option>
<option>Expense</option>
<option>Income</option>
<option>Transfer</option>
</select>
</div>
<div class="col-span-3">
<label class="block font-label text-label text-on-surface-variant mb-xs">Amount Range</label>
<div class="flex items-center gap-sm">
<input class="w-1/2 px-md py-sm rounded-xl border border-outline-variant focus:ring-2 focus:ring-primary font-body text-body bg-transparent" placeholder="Min" type="number"/>
<span class="text-outline">to</span>
<input class="w-1/2 px-md py-sm rounded-xl border border-outline-variant focus:ring-2 focus:ring-primary font-body text-body bg-transparent" placeholder="Max" type="number"/>
</div>
</div>
<div class="col-span-2 flex items-end h-full">
<button class="font-label text-label text-primary hover:underline pb-sm">Clear Filters</button>
</div>
</div>
</section>
<!-- Transactions Table -->
<section class="bg-surface-container-lowest card-shadow border border-outline-variant rounded-xl overflow-hidden">
<table class="w-full text-left border-collapse">
<thead class="bg-surface-container-low border-b border-outline-variant">
<tr>
<th class="px-lg py-md font-label text-label text-on-surface-variant cursor-pointer group">
<div class="flex items-center gap-xs">
                                Merchant
                                <span class="material-symbols-outlined text-[16px] text-outline group-hover:text-primary" data-icon="unfold_more">unfold_more</span>
</div>
</th>
<th class="px-lg py-md font-label text-label text-on-surface-variant cursor-pointer group">
<div class="flex items-center gap-xs">
                                Category
                                <span class="material-symbols-outlined text-[16px] text-outline group-hover:text-primary" data-icon="unfold_more">unfold_more</span>
</div>
</th>
<th class="px-lg py-md font-label text-label text-primary cursor-pointer group">
<div class="flex items-center gap-xs">
                                Date
                                <span class="material-symbols-outlined text-[16px]" data-icon="arrow_downward">arrow_downward</span>
</div>
</th>
<th class="px-lg py-md font-label text-label text-on-surface-variant text-right cursor-pointer group">
<div class="flex items-center justify-end gap-xs">
                                Amount
                                <span class="material-symbols-outlined text-[16px] text-outline group-hover:text-primary" data-icon="unfold_more">unfold_more</span>
</div>
</th>
<th class="px-lg py-md w-[60px]"></th>
</tr>
</thead>
<tbody class="divide-y divide-outline-variant">
<!-- Row 1 -->
<tr class="transaction-row transition-colors">
<td class="px-lg py-md">
<div class="flex items-center gap-md">
<div class="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center text-primary">
<span class="material-symbols-outlined" data-icon="gas_meter">gas_meter</span>
</div>
<span class="font-body text-body font-medium">Shell Gas Station</span>
</div>
</td>
<td class="px-lg py-md">
<span class="px-sm py-xs rounded-full bg-secondary-container/10 text-secondary font-label text-[11px] uppercase tracking-wider">Transport</span>
</td>
<td class="px-lg py-md font-body text-body text-on-surface-variant">Oct 24, 2023</td>
<td class="px-lg py-md font-body text-body font-semibold text-right">-$54.20</td>
<td class="px-lg py-md text-right">
<button class="p-xs rounded-full hover:bg-surface-container-high transition-colors text-outline">
<span class="material-symbols-outlined" data-icon="more_vert">more_vert</span>
</button>
</td>
</tr>
<!-- Row 2 -->
<tr class="transaction-row transition-colors">
<td class="px-lg py-md">
<div class="flex items-center gap-md">
<div class="w-10 h-10 rounded-full bg-tertiary-container/10 flex items-center justify-center text-tertiary">
<span class="material-symbols-outlined" data-icon="movie">movie</span>
</div>
<span class="font-body text-body font-medium">Netflix</span>
</div>
</td>
<td class="px-lg py-md">
<span class="px-sm py-xs rounded-full bg-tertiary-container/10 text-tertiary font-label text-[11px] uppercase tracking-wider">Entertainment</span>
</td>
<td class="px-lg py-md font-body text-body text-on-surface-variant">Oct 23, 2023</td>
<td class="px-lg py-md font-body text-body font-semibold text-right">-$19.99</td>
<td class="px-lg py-md text-right">
<button class="p-xs rounded-full hover:bg-surface-container-high transition-colors text-outline">
<span class="material-symbols-outlined" data-icon="more_vert">more_vert</span>
</button>
</td>
</tr>
<!-- Row 3 -->
<tr class="transaction-row transition-colors">
<td class="px-lg py-md">
<div class="flex items-center gap-md">
<div class="w-10 h-10 rounded-full bg-primary-container/10 flex items-center justify-center text-primary">
<span class="material-symbols-outlined" data-icon="shopping_bag">shopping_bag</span>
</div>
<span class="font-body text-body font-medium">Apple Store</span>
</div>
</td>
<td class="px-lg py-md">
<span class="px-sm py-xs rounded-full bg-primary-container/10 text-primary font-label text-[11px] uppercase tracking-wider">Shopping</span>
</td>
<td class="px-lg py-md font-body text-body text-on-surface-variant">Oct 22, 2023</td>
<td class="px-lg py-md font-body text-body font-semibold text-right">-$1,299.00</td>
<td class="px-lg py-md text-right">
<button class="p-xs rounded-full hover:bg-surface-container-high transition-colors text-outline">
<span class="material-symbols-outlined" data-icon="more_vert">more_vert</span>
</button>
</td>
</tr>
<!-- Row 4 -->
<tr class="transaction-row transition-colors">
<td class="px-lg py-md">
<div class="flex items-center gap-md">
<div class="w-10 h-10 rounded-full bg-secondary-container/10 flex items-center justify-center text-secondary">
<span class="material-symbols-outlined" data-icon="restaurant">restaurant</span>
</div>
<span class="font-body text-body font-medium">Blue Bottle Coffee</span>
</div>
</td>
<td class="px-lg py-md">
<span class="px-sm py-xs rounded-full bg-secondary-container/10 text-secondary font-label text-[11px] uppercase tracking-wider">Food &amp; Drink</span>
</td>
<td class="px-lg py-md font-body text-body text-on-surface-variant">Oct 22, 2023</td>
<td class="px-lg py-md font-body text-body font-semibold text-right">-$6.50</td>
<td class="px-lg py-md text-right">
<button class="p-xs rounded-full hover:bg-surface-container-high transition-colors text-outline">
<span class="material-symbols-outlined" data-icon="more_vert">more_vert</span>
</button>
</td>
</tr>
<!-- Row 5 -->
<tr class="transaction-row transition-colors">
<td class="px-lg py-md">
<div class="flex items-center gap-md">
<div class="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-700">
<span class="material-symbols-outlined" data-icon="payments">payments</span>
</div>
<span class="font-body text-body font-medium">Salary Deposit</span>
</div>
</td>
<td class="px-lg py-md">
<span class="px-sm py-xs rounded-full bg-green-50 text-green-700 font-label text-[11px] uppercase tracking-wider">Income</span>
</td>
<td class="px-lg py-md font-body text-body text-on-surface-variant">Oct 21, 2023</td>
<td class="px-lg py-md font-body text-body font-semibold text-right text-green-600">+$4,500.00</td>
<td class="px-lg py-md text-right">
<button class="p-xs rounded-full hover:bg-surface-container-high transition-colors text-outline">
<span class="material-symbols-outlined" data-icon="more_vert">more_vert</span>
</button>
</td>
</tr>
<!-- Row 6 -->
<tr class="transaction-row transition-colors">
<td class="px-lg py-md">
<div class="flex items-center gap-md">
<div class="w-10 h-10 rounded-full bg-tertiary-container/10 flex items-center justify-center text-tertiary">
<span class="material-symbols-outlined" data-icon="fitness_center">fitness_center</span>
</div>
<span class="font-body text-body font-medium">Equinox Gym</span>
</div>
</td>
<td class="px-lg py-md">
<span class="px-sm py-xs rounded-full bg-tertiary-container/10 text-tertiary font-label text-[11px] uppercase tracking-wider">Health</span>
</td>
<td class="px-lg py-md font-body text-body text-on-surface-variant">Oct 20, 2023</td>
<td class="px-lg py-md font-body text-body font-semibold text-right">-$210.00</td>
<td class="px-lg py-md text-right">
<button class="p-xs rounded-full hover:bg-surface-container-high transition-colors text-outline">
<span class="material-symbols-outlined" data-icon="more_vert">more_vert</span>
</button>
</td>
</tr>
<!-- Row 7 -->
<tr class="transaction-row transition-colors">
<td class="px-lg py-md">
<div class="flex items-center gap-md">
<div class="w-10 h-10 rounded-full bg-secondary-container/10 flex items-center justify-center text-secondary">
<span class="material-symbols-outlined" data-icon="flight">flight</span>
</div>
<span class="font-body text-body font-medium">United Airlines</span>
</div>
</td>
<td class="px-lg py-md">
<span class="px-sm py-xs rounded-full bg-secondary-container/10 text-secondary font-label text-[11px] uppercase tracking-wider">Travel</span>
</td>
<td class="px-lg py-md font-body text-body text-on-surface-variant">Oct 19, 2023</td>
<td class="px-lg py-md font-body text-body font-semibold text-right">-$420.15</td>
<td class="px-lg py-md text-right">
<button class="p-xs rounded-full hover:bg-surface-container-high transition-colors text-outline">
<span class="material-symbols-outlined" data-icon="more_vert">more_vert</span>
</button>
</td>
</tr>
<!-- Row 8 -->
<tr class="transaction-row transition-colors">
<td class="px-lg py-md">
<div class="flex items-center gap-md">
<div class="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center text-primary">
<span class="material-symbols-outlined" data-icon="home">home</span>
</div>
<span class="font-body text-body font-medium">Home Depot</span>
</div>
</td>
<td class="px-lg py-md">
<span class="px-sm py-xs rounded-full bg-surface-container-high text-primary font-label text-[11px] uppercase tracking-wider">Home</span>
</td>
<td class="px-lg py-md font-body text-body text-on-surface-variant">Oct 18, 2023</td>
<td class="px-lg py-md font-body text-body font-semibold text-right">-$89.30</td>
<td class="px-lg py-md text-right">
<button class="p-xs rounded-full hover:bg-surface-container-high transition-colors text-outline">
<span class="material-symbols-outlined" data-icon="more_vert">more_vert</span>
</button>
</td>
</tr>
<!-- Row 9 -->
<tr class="transaction-row transition-colors">
<td class="px-lg py-md">
<div class="flex items-center gap-md">
<div class="w-10 h-10 rounded-full bg-primary-container/10 flex items-center justify-center text-primary">
<span class="material-symbols-outlined" data-icon="local_mall">local_mall</span>
</div>
<span class="font-body text-body font-medium">Amazon.com</span>
</div>
</td>
<td class="px-lg py-md">
<span class="px-sm py-xs rounded-full bg-primary-container/10 text-primary font-label text-[11px] uppercase tracking-wider">Shopping</span>
</td>
<td class="px-lg py-md font-body text-body text-on-surface-variant">Oct 17, 2023</td>
<td class="px-lg py-md font-body text-body font-semibold text-right">-$124.99</td>
<td class="px-lg py-md text-right">
<button class="p-xs rounded-full hover:bg-surface-container-high transition-colors text-outline">
<span class="material-symbols-outlined" data-icon="more_vert">more_vert</span>
</button>
</td>
</tr>
<!-- Row 10 -->
<tr class="transaction-row transition-colors">
<td class="px-lg py-md">
<div class="flex items-center gap-md">
<div class="w-10 h-10 rounded-full bg-secondary-container/10 flex items-center justify-center text-secondary">
<span class="material-symbols-outlined" data-icon="local_cafe">local_cafe</span>
</div>
<span class="font-body text-body font-medium">Starbucks</span>
</div>
</td>
<td class="px-lg py-md">
<span class="px-sm py-xs rounded-full bg-secondary-container/10 text-secondary font-label text-[11px] uppercase tracking-wider">Food &amp; Drink</span>
</td>
<td class="px-lg py-md font-body text-body text-on-surface-variant">Oct 17, 2023</td>
<td class="px-lg py-md font-body text-body font-semibold text-right">-$5.75</td>
<td class="px-lg py-md text-right">
<button class="p-xs rounded-full hover:bg-surface-container-high transition-colors text-outline">
<span class="material-symbols-outlined" data-icon="more_vert">more_vert</span>
</button>
</td>
</tr>
</tbody>
</table>
<!-- Pagination -->
<footer class="bg-surface px-lg py-md flex items-center justify-between border-t border-outline-variant">
<span class="font-small text-small text-on-surface-variant">Showing 1–10 of 84</span>
<div class="flex items-center gap-sm">
<button class="p-sm rounded-lg border border-outline-variant hover:bg-surface-container-low transition-colors disabled:opacity-30" disabled="">
<span class="material-symbols-outlined text-[20px]" data-icon="chevron_left">chevron_left</span>
</button>
<div class="flex items-center gap-xs">
<button class="w-8 h-8 flex items-center justify-center rounded-lg bg-primary text-on-primary font-label text-label transition-colors">1</button>
<button class="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-surface-container-low font-label text-label transition-colors text-on-surface-variant">2</button>
<button class="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-surface-container-low font-label text-label transition-colors text-on-surface-variant">3</button>
<span class="px-sm text-outline">...</span>
<button class="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-surface-container-low font-label text-label transition-colors text-on-surface-variant">9</button>
</div>
<button class="p-sm rounded-lg border border-outline-variant hover:bg-surface-container-low transition-colors">
<span class="material-symbols-outlined text-[20px]" data-icon="chevron_right">chevron_right</span>
</button>
</div>
</footer>
</section>
</main>
<!-- Footer -->
<footer class="bg-surface border-t border-outline-variant w-full py-lg flex justify-center items-center mt-2xl">
<div class="flex flex-col items-center gap-sm">
<span class="font-label text-label font-bold text-on-surface">FinSight</span>
<span class="font-small text-small text-on-surface-variant">FinSight — Demo Dashboard</span>
</div>
</footer>
<script>
        // Simple micro-interaction for rows
        document.querySelectorAll('.transaction-row').forEach(row => {
            row.addEventListener('click', () => {
                row.classList.add('opacity-80');
                setTimeout(() => row.classList.remove('opacity-80'), 100);
            });
        });
    </script>
</body></html>

---
