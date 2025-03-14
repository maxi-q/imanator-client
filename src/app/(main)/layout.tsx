import Header from "./modules/Header"


export default function Home({
	children
}: {
	children: React.ReactNode
}) {
	return (
    <>
      <Header />
      <main className="flex min-h-screen flex-col items-center justify-between p-8">
        {children}
      </main>
    </>
	)
}
