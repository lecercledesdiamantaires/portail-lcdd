export default function () {
    const popup = ref(null)
    const openPopup = () => {
        popup.value = true
    }
    const closePopup = () => {
        popup.value = null
    }
    return { popup, openPopup, closePopup }
}