async function newFormHandler(event) {
    event.preventDefault();

    const title = document.querySelector('input[name="post-title"]').value;
    const img_url = document.querySelector('input[name="post-url"]').value;
    const band_name = document.querySelector('input[name="post-band"]').value;
    const album_name = document.querySelector('input[name="post-album"]').value;
    const genre_id = document.querySelector('input[name="post-genre"]').value;
    const price = document.querySelector('input[name="post-price"]').value;
    const stock = document.querySelector('input[name="post-stock"]').value;

    const response = await fetch(`/api/posts`, {
        method: 'POST',
        body: JSON.stringify({
            title,
            img_url,
            band_name,
            album_name,
            genre_id,
            price,
            stock
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert(response.statusText);
    }
}

document.querySelector('.new-post-form').addEventListener('submit', newFormHandler);