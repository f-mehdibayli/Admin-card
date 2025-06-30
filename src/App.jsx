import { Toaster } from "react-hot-toast"
import Table from "./components/Table"

function App() {
  return (
    <>
      <Toaster
        position="top-right"
        reverseOrder={false}
      />
      <main className="px-20 py-10 min-h-screen">
        <Table />
      </main>
    </>

  )
}

export default App
