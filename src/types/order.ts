export interface OrderItem {
  id: string
  name: string
  quantity: number
  itemId: string
}

export interface Order {
  id: string
  orderNo: string
  orderTime: string
  items: OrderItem[]
  status: 'Completed' | 'Pending' | 'Cancelled'
  totalAmount: string
  paymentMethod: string
  paymentAmount: string
  address: {
    location: string
    restaurant: string
    phone: string
  }
  description: string
}

export const mockOrders: Order[] = [
  {
    id: '1',
    orderNo: '6944658988805461660',
    orderTime: '2025-07-25 10:44:58',
    items: [
      {
        id: '1',
        name: 'Focal Bathys MG Wireless ANC Headphone',
        quantity: 1,
        itemId: '6944654238947087457'
      }
    ],
    status: 'Completed',
    totalAmount: '$300',
    paymentMethod: 'Google Pay',
    paymentAmount: '$200',
    address: {
      location: 'New York, USA',
      restaurant: 'Manhattan Grand Restaurant',
      phone: '3-2344'
    },
    description: 'Small Parcel Shipping Insurance'
  },
  {
    id: '2',
    orderNo: '6944658988805461661',
    orderTime: '2025-07-25 10:44:58',
    items: [
      {
        id: '2',
        name: 'KEF LSX II Wireless Hi-Fi Speaker System (Pair), Cobalt Blue',
        quantity: 1,
        itemId: '6944654238947087458'
      }
    ],
    status: 'Completed',
    totalAmount: '$300',
    paymentMethod: 'Google Pay',
    paymentAmount: '¥200',
    address: {
      location: 'New York, USA',
      restaurant: 'Manhattan Grand Restaurant',
      phone: '3-2344'
    },
    description: 'Small Parcel Shipping Insurance'
  }
]