export const stockUpdate: any = {
  availableStock: 'We only have few items left for some products as listed below. Kindly adjust your cart quantity(s) accordingly.',
  validationHeader: 'Your order is not placed due to some reason mentioned below.'
}

export const stockStatus:any = {
  profit: 'profit',
  loss: 'loss',
}
export function formatDate(dateString:any) {
  const options:any = { year: 'numeric', month: 'long', day: 'numeric' };
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', options);
}