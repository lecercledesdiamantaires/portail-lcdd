export default function () {
    const popup = ref(null)
    const openPopup = () => {
        popup.value = true
        console.log('popup.value', popup.value)
    }
    const closePopup = () => {
        popup.value = null
        console.log('popup.value', popup.value)
    }
    return { popup, openPopup, closePopup }
}