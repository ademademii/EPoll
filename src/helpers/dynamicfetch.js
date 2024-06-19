export const dynamicFetch = async (url, method, postData) => {
    const response = await fetch(url, {
        method,
        headers: {
            "Content-Type": "application/json" // This header is crucial for JSON data
        },
        body: JSON.stringify(postData)
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const contentType = response.headers.get("Content-Type");
    if (contentType && contentType.includes("application/json")) {
        return await response.json(); // Parse response as JSON
    } else {
        throw new Error("Received response is not JSON");
    }
};
