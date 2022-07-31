async function newFormHandler(event) {
    event.preventDefault();

    const title = document.querySelector('input[name="post-title"]').value;
    // const post_content = document.querySelector('textarea[name="post-content"]').value.trim();
    const img_url = document.querySelector('input[name="image"]').value;
    const band_name = document.querySelector('input[name="post-band-name"]').value;
    const album_name = document.querySelector('input[name="post-album-name"]').value;
    const genre = document.querySelector('input[name="post-genre"]').value;
    const price = document.querySelector('input[name="post-price"]').value;
    const stock = document.querySelector('input[name="post-stock"]').value;


    const response = await fetch(`/api/posts`, {
        method: 'POST',
        body: JSON.stringify({
            title,
            img_url,
            band_name,
            album_name,
            genre,
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