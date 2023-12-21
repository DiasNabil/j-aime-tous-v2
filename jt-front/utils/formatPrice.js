export default function formatPrice(price){
    const formatPrice = new Intl.NumberFormat('fr-FR', { maximumSignificantDigits: 3 }).format(
        price,
      )

      return formatPrice
}