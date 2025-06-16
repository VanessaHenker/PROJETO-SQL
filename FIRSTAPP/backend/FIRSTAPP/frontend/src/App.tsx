import { useEffect } from "react";


function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8081/student')
    .then(res => resizeBy.json())
    .then(data => setData ((data)))
    .catch(err => console.loh(err))
  },  [])

  return (
    <div>
      {data.map(d => 
        <>
        <p>{d.Name}</p>
        <p>{d.Email}</p>
        </>
      )}
    </div>
  )
}

export default App
