'use server'

export async function unshortenUrl(formData: FormData) {
    const url = formData.get('url');

    if (!url || typeof url !== 'string') {
        return { error: 'Invalid URL provided.' };
    }

    try {
        const response = await fetch(url, {
            method: 'HEAD',
            redirect: 'follow',
            signal: AbortSignal.timeout(8000),
        });

        const finalUrl = response.url;

        if (!finalUrl) {
            return { error: 'Could not determine the final URL.' };
        }

        return { longUrl: finalUrl };
    } catch (error) {
        if (error instanceof Error && error.name === 'TimeoutError') {
            return { error: 'The request timed out.' };
        }

        return { error: 'Failed to unshorten URL. It might be invalid or offline.' };
    }
}
