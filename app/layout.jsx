export const metadata = {
  title: "AI Productivity Dashboard",
  description: "Your smart workspace for productivity",
    generator: 'v0.app'
}

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className="dark"
      style={{
        backgroundColor: "#0f0f14",
        color: "#f5f5fa",
      }}
    >
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body
        style={{
          backgroundColor: "#0f0f14",
          color: "#f5f5fa",
        }}
      >
        {children}
      </body>
    </html>
  )
}


import './globals.css'
