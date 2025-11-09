document.addEventListener('DOMContentLoaded', function() {
    const amountInput = document.getElementById('amount');
    const apyInput = document.getElementById('apy');
    const compoundingCheckbox = document.getElementById('compounding');

    // Function to calculate and update (standard compounding formula)
    function updateRewards() {
        const amount = parseFloat(amountInput.value) || 0;
        const apy = parseFloat(apyInput.value) || 0;
        const useCompounding = compoundingCheckbox.checked;
        
        if (amount <= 0 || apy <= 0) {
            // Reset if invalid
            ['daily', 'weekly', 'monthly', 'yearly'].forEach(period => {
                document.getElementById(`${period}Reward`).textContent = '0.0000';
                document.getElementById(`${period}Total`).textContent = '0.0000';
            });
            return;
        }
        
        const r = apy / 100;  // Rate as decimal
        const n = 365;  // Daily compounding
        
        // Time fractions for each period
        const times = {
            daily: 1 / 365,
            weekly: 7 / 365,
            monthly: 1 / 12,
            yearly: 1
        };
        
        // Calculate for each period
        Object.keys(times).forEach(period => {
            const t = times[period];
            let reward, total;
            
            if (!useCompounding) {
                // Simple interest
                reward = amount * r * t;
                total = amount + reward;
            } else {
                // Compound interest (standard formula)
                total = amount * Math.pow(1 + r / n, n * t);
                reward = total - amount;
            }
            
            document.getElementById(`${period}Reward`).textContent = reward.toFixed(4);
            document.getElementById(`${period}Total`).textContent = total.toFixed(4);
        });
    }

    // Real-time listeners
    amountInput.addEventListener('input', updateRewards);
    apyInput.addEventListener('input', updateRewards);
    compoundingCheckbox.addEventListener('change', updateRewards);

    // Initial calculation with defaults
    updateRewards();
});
