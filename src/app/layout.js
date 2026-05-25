import { AuthProvider } from '../context/AuthContext'
import { CartProvider } from '../context/CartContext'
import Navbar from '../components/Navbar'
import './globals.css'

export const metadata = {
  title: 'Amazon Clone',
  description: 'Amazon clone built with Next.js',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <script src="https://checkout.razorpay.com/v1/checkout.js" />
      </head>
      <body>
        <AuthProvider>
          <CartProvider>
            <Navbar />
            {children}
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  )
}