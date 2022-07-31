async function editFormHandler(event) {
    event.preventDefault();

    const title = document.querySelector('input[name="post-title"]').value;
    const img_url = document.querySelector('input[name="post-url"]').value;
    const band_name = document.querySelector('input[name="post-band-name"]').value;
    const album_name = document.querySelector('input[name="post-album-name"]').value;
    const genre = document.querySelector('input[name="post-genre"]').value;
    const price = document.querySelector('input[name="post-price"]').value;
    const stock = document.querySelector('input[name="post-stock"]').value;
    
    const post_id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    const response = await fetch(`/api/posts/${post_id}`, {
        method: 'PUT',
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

document.querySelector('.edit-post-form').addEventListener('submit', editFormHandler);