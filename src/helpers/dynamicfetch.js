const dynamicFetch = async (url, method, postData = null) => {
    const token = localStorage.getItem("token"); // or sessionStorage

    const headers = {
        "Content-Type": "application/json",
    };

    if (token) {
        headers["Authorization"] = `Bearer ${token}`;
    }

    const options = {
        method,
        headers,
    };

    if (postData) {
        options.body = JSON.stringify(postData);
    }

    try {
        const response = await fetch(url, options);

        if (response.status === 401) {
            // Optional: auto logout or redirect to login
            console.warn("Unauthorized - token missing or expired");
        }

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const contentType = response.headers.get("Content-Type");

        if (contentType?.includes("application/json")) {
            return await response.json();
        }

        if (contentType?.includes("text")) {
            return await response.text();
        }

        return null;
    } catch (error) {
        console.error("Fetch error:", error);
        throw error;
    }
};

export default dynamicFetch;
