import DataTable from "./components/DataTable";
import Navbar from "./components/Navbar";
import UsersState from "./Contexts/UsersState";
export default function App() {
  return (
    <>  
    <UsersState>
      <Navbar/>
      <DataTable/>
    </UsersState>
    </>
  )
}
