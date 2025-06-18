const FIREBASE_DOMAIN = process.env.REACT_APP_FIREBASE_API;

export async function getAllQuotes() {
    const response = await fetch(`${FIREBASE_DOMAIN}/quotes.json`)
    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Could not fetch all Quotes.")
    }


    const transformedQuotes = [];
    for (const key in data) {
        const quoteObj = {
            id: key,
            ...data[key]
        }
        transformedQuotes.push(quoteObj);
    }

    return transformedQuotes;
}

export async function getSingleQuote(quoteId) {
    const response = await fetch(`${FIREBASE_DOMAIN}/quotes/${quoteId}.json`)
    const data = await response.json()

    if (!response.ok) {
        throw new Error(data.message || "Could not fetch single Quote.")
    }

    const loadedQuote = {
        id: quoteId,
        ...data
    }

    return loadedQuote;
}

export async function addQuote(quoteData) {

    const response = await fetch(`${FIREBASE_DOMAIN}/quotes.json`, {
        method: "POST",
        body: JSON.stringify(quoteData),
        headers: {
            'Content-type': 'application/json'
        }
    })
    const data = await response.json()

    if (!response.ok) {
        throw new Error(data.message || "Could not add new Quote.")
    }

    return null;
}

export async function addComment(requestData) {
    const response = await fetch(`${FIREBASE_DOMAIN}/comments/${requestData.quoteId}.json`, {
        method: 'POST',
        body: JSON.stringify(requestData.commentData),
        headers: {
            'Content-type': 'application/json'
        }
    })

    const data = await response.json();
    console.log(data);
    if (!response.ok) {
        throw new Error(data.message || "Could not add comment.")
    }
    return {
        commentData: data.name
    }
}

export async function getAllComments(quoteId) {
    const response = await fetch(`${FIREBASE_DOMAIN}/comments/${quoteId}.json`)
    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Could not fetch all comments.")
    }

    const transformedComments = [];
    for (const key in data) {
        const commentObj = {
            id: key,
            ...data[key]
        }
        transformedComments.push(commentObj);
    }
    return transformedComments;
}

export async function deleteComment({ quoteId, commentId }) {
    const response = await fetch(`${FIREBASE_DOMAIN}/comments/${quoteId}/${commentId}.json`, {
        method: 'DELETE',
    });

    if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Could not delete the comment.');
    }

    return true;
}

export async function deleteQuote(quoteId) {
    const response = await fetch(`${FIREBASE_DOMAIN}/quotes/${quoteId}.json`, {
        method: "DELETE"
    })

    if (!response.ok) {
        throw new Error('Could not delete the quote.');
    }

    return true;
}