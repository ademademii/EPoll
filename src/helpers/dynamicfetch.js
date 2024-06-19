const dynamicFetch = async (url, method, postData = null) => {
    const options = {
        method,
        headers: {
            "Content-Type": "application/json",
        },
    };

    if (postData) {
        options.body = JSON.stringify(postData);
    }

    try {
        const response = await fetch(url, options);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const contentType = response.headers.get("Content-Type");
        if (contentType && contentType.includes("application/json")) {
            return await response.json(); // Parse response as JSON
        } else {
            throw new Error("Received response is not JSON");
        }
    } catch (error) {
        console.error("Fetch error:", error);
        throw error;
    }
};

export default dynamicFetch;
