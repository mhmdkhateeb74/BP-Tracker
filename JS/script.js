document.addEventListener("DOMContentLoaded", function () {
    const userSelect = document.getElementById("user");
    const userHistorySelect = document.getElementById("userSelect");

    if (userSelect || userHistorySelect) {
        fetch("/U/users") 
            .then(response => {
                if (!response.ok) {
                    throw new Error("Failed to fetch users");
                }
                return response.json();
            })
            .then(data => {
                console.log("Fetched users:", data);

                if (data.data && Array.isArray(data.data)) {
                    data.data.forEach(user => {
                        let option = new Option(user.name, user.id);
                        if (userSelect) userSelect.appendChild(option.cloneNode(true));
                        if (userHistorySelect) userHistorySelect.appendChild(option.cloneNode(true));
                    });
                } else {
                    console.error("Invalid user data format:", data);
                }
            })
            .catch(error => console.error("Error fetching users:", error));
    }
});
