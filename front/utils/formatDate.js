import { format } from 'date-fns'
import { fr } from 'date-fns/locale'

export default function formatDate(dateString) {
    return format(new Date(dateString), 'dd/MM/yyyy', { locale: fr })
}