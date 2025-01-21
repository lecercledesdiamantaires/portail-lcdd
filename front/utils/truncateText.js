export default function truncateText(text, maxLength) {
    if (text.length <= maxLength) {
        return text
    }
    console.log('text', text.length)
    return text.slice(0, maxLength) + '...'
}