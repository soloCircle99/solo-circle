import Header from "../components/admin/Header"
import Sidebar from "../components/admin/Sidebar"
import Table from "../components/admin/Table"

const Admin = () => {
  return (
    <div className="h-[calc(100vh-60px)] w-full">
      <Header />
      <div className="flex">
        <Sidebar />
        <div>
          <Table />
        </div>
      </div>
    </div>
  )
}

export default Admin
