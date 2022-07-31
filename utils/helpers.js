function formatDate(date) {
    return `${new Date(date).getMonth() + 1}/${new Date(date).getDate()}/${new Date(
        date
      ).getFullYear()}`;
}

function format_url(url){
    return url
      .replace('http://', '')
      .replace('https://', '')
      .replace('www.', '')
      .split('/')[0]
      .split('?')[0];
  }

module.exports = {
    formatDate,
    format_url
}