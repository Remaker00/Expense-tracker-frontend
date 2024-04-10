async function premiumuser() {
    try {
        const response = await fetch('https://expense-tracker-app-backend-ashen.vercel.app/premium', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });

        if (response.ok) {
            response.json()
                .then(data => {
                    let premium = data.premiumuser;
                    if (premium === true) {
                        // document.getElementById('rzp-button1').style.display="none";
                        // document.getElementById('premium').textContent="You Are A Premium User Now";
                    }else {
                        console.log("Be our Premium Member");
                    }
                })
                .catch(error => {
                    console.error("Error:", error);
                });
            
        } else {
            console.error('Error fetching premium user data');
        }
    } catch (err) {
        console.error(err);
    }
}


premiumuser();
