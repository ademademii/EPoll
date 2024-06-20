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
        if (contentType) {
            if (contentType.includes("application/json")) {
                return await response.json(); // Parse response as JSON
            } else if (contentType.includes("text")) {
                return await response.text(); // Parse response as text
            } else {
                throw new Error(`Unsupported response type: ${contentType}`);
            }
        } else {
            throw new Error("Content-Type header is missing in the response");
        }
    } catch (error) {
        console.error("Fetch error:", error);
        throw error;
    }
};

export default dynamicFetch;
