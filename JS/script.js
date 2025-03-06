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

function fetchMeasurements() {
    let user_id = document.getElementById("userSelect").value;
    let start_date = document.getElementById("startDate").value;
    let end_date = document.getElementById("endDate").value;

    if (!user_id || !start_date || !end_date) {
        alert("Please select a user and date range.");
        return;
    }

    const requestData = {
        user_id: parseInt(user_id),
        start_date: start_date,
        end_date: end_date
    };

    fetch("/M/measurements/daterange", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestData)
    })
        .then(response => response.json())
        .then(data => {
            let tableBody = document.getElementById("historyTable");
            tableBody.innerHTML = "";

            if (data.data && data.data.length > 0) {
                data.data.forEach(m => {
                    let row = `<tr>
                        <td>${m.date}</td>
                        <td>${m.systolic}</td>
                        <td>${m.diastolic}</td>
                        <td>${m.pulse}</td>
                        <td><button onclick="deleteMeasurement(${m.id})">Delete</button></td>
                    </tr>`;
                    tableBody.innerHTML += row;
                });
            } else {
                tableBody.innerHTML = "<tr><td colspan='5'>No data available.</td></tr>";
            }
        })
        .catch(error => console.error("Error fetching measurements:", error));
}

async function deleteMeasurement(measurementId) {
    let url = "/M/measurements";
    try {
        let res = await fetch(url, {
            method: 'DELETE',
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify({ id: measurementId })
        });

        let data = await res.json();

        await fetchMeasurements();

        if (data.msg === "ok") {
            setTimeout(() => { alert("Measurement deleted successfully!"); }, 500);
        } else {
            setTimeout(() => { alert("Failed to delete measurement: " + data.message); }, 500);
        }
    } catch (error) {
        console.error("Error deleting measurement:", error);
        alert("Error deleting measurement.");
    }
}

function fetchStats() {
    const monthInput = document.getElementById("month").value;

    if (!monthInput) {
        alert("Please select a month.");
        return;
    }

    const user_id = document.getElementById("userSelect").value;

    if (!user_id) {
        alert("Please select a user.");
        return;
    }

    const requestData = {
        user_id: parseInt(user_id),
        month: monthInput
    };

    console.log("📤 Fetching Statistics with:", requestData);

    fetch("/measurements/monthly-averages", { 
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestData)
    })
        .then(response => response.json())
        .then(data => {
            console.log("📥 Server Response:", data);

            let tableBody = document.getElementById("statsTable");
            tableBody.innerHTML = "";  

            if (data.data && data.data.length > 0) {
                data.data.forEach(stat => {
                    let row = `<tr>
                    <td>${stat.user}</td>
                    <td>${stat.avg_systolic}</td>
                    <td>${stat.avg_diastolic}</td>
                    <td>${stat.abnormal_readings}</td>
                </tr>`;
                    tableBody.innerHTML += row;
                });
            } else {
                tableBody.innerHTML = "<tr><td colspan='4'>No statistics available for this month.</td></tr>";
            }
        })
        .catch(error => console.error("Error fetching statistics:", error));
}



