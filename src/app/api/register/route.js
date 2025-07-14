export async function POST(request) {
    try {
        const body = await request.json();

        const res = await fetch('http://localhost:8000/api/users/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });

        const json = await res.json();
        
        return new Response(JSON.stringify(json), {
            status: res.status,
            headers: {
                'Content-Type': 'application/json'
            }
        });

    } catch (err) {
        return new Response(
            JSON.stringify({ message: 'Une erreur technique est survenue' }),{
            status: 500,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
}