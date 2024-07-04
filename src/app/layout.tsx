import './global.css'

export const metadata = {
  title: 'Home',
  description: 'Prueba técnica Security and System',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <main>
          {children}
        </main>
      </body>
    </html>
  )
}
