document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('calculatorForm');
    const amountInput = document.getElementById('amount');
    const apyInput = document.getElementById('apy');
    const compoundingCheckbox = document.getElementById('compounding');
    const results = document.getElementById('results');

    // Function to calculate and update
    function updateRewards() {
        const amount = parseFloat(amountInput.value);
        const apy = parseFloat(apyInput.value);
        const useCompounding = compoundingCheckbox.checked;
        
        if (isNaN(amount) || isNaN(apy) || amount <= 0 || apy <= 0) {
            // Reset to zeros if invalid
            document.getElementById('dailyReward').textContent = '0.0000';
            document.getElementById('weeklyReward').textContent = '0.0000';
            document.getElementById('monthlyReward').textContent = '0.0000';
            document.getElementById('yearlyReward').textContent = '0.0000';
            return;
        }
        
        const r = apy / 100;  // Annual rate as decimal
        const n = 365;  // Daily compounding frequency
        
        // Calculate rewards based on mode
        let daily, weekly, monthly, yearly;
        
        if (!useCompounding) {
            // Simple interest
            daily = (amount * r) / 365;
            weekly = (amount * r) / 52;
            monthly = (amount * r) / 12;
            yearly = amount * r;
        } else {
            // Compound interest: Reward = [P * (1 + r/n)^(n*t)] - P
            // Daily: t = 1/365
            daily = amount * (Math.pow(1 + r / n, n * (1 / 365)) - 1);
            
            // Weekly: t = 7/365
            weekly = amount * (Math.pow(1 + r / n, n * (7 / 365)) - 1);
            
            // Monthly: t = 1/12 (approx 30.4167 days)
            monthly = amount * (Math.pow(1 + r / n, n * (1 / 12)) - 1);
            
            // Yearly: t = 1
            yearly = amount * (Math.pow(1 + r / n, n * 1) - 1);
        }
        
        // Update table
        document.getElementById('dailyReward').textContent = daily.toFixed(4);
        document.getElementById('weeklyReward').textContent = weekly.toFixed(4);
        document.getElementById('monthlyReward').textContent = monthly.toFixed(4);
        document.getElementById('yearlyReward').textContent = yearly.toFixed(4);
    }

    // Real-time listeners
    amountInput.addEventListener('input', updateRewards);
    apyInput.addEventListener('input', updateRewards);
    compoundingCheckbox.addEventListener('change', updateRewards);

    // Optional button submit (for legacy)
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        updateRewards();
    });

    // Initial calc if defaults filled (optional)
    updateRewards();
});
