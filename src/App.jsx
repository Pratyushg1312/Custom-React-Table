import { useEffect, useState } from 'react'
import './App.css'
import CustomTable from './component/CustomTable';

function App() {
  const [load, setLoad] = useState(false);
  const [theme, setTheme] = useState("light");
  useEffect(() => {
    if (theme === "light") {
      document.body.classList.add("light");
      document.body.classList.remove("dark");
    } else {
      document.body.classList.add("dark");
      document.body.classList.remove("light");
    }
  }, [theme])
  let citiesData = [
    {

      name: "New York",
      population: 8537673,
      area: 468.9,
      country: "USA",
      elevation: 10,
      mayor: "Bill de Blasio",
      founded: 1624,
      landmark: "Statue of Liberty",
      GDP: 1717192,
      timezone: "EST"
    },
    {
      name: "Tokyo",
      population: 37400068,
      area: 2187.66,
      country: "Japan",
      elevation: 40,
      mayor: "Yuriko Koike",
      founded: 1457,
      landmark: "Tokyo Tower",
      GDP: 1632831,
      timezone: "JST"
    },
    {
      name: "London",
      population: 8908081,
      area: 1572,
      country: "UK",
      elevation: 35,
      mayor: "Sadiq Khan",
      founded: 43,
      landmark: "Big Ben",
      GDP: 985492,
      timezone: "GMT"
    },
    {

      name: "New York",
      population: 8537673,
      area: 468.9,
      country: "USA",
      elevation: 10,
      mayor: "Bill de Blasio",
      founded: 1624,
      landmark: "Statue of Liberty",
      GDP: 1717192,
      timezone: "EST"
    },
    {

      name: "New York",
      population: 8537673,
      area: 468.9,
      country: "USA",
      elevation: 10,
      mayor: "Bill de Blasio",
      founded: 1624,
      landmark: "Statue of Liberty",
      GDP: 1717192,
      timezone: "EST"
    },
    {

      name: "New York",
      population: 8537673,
      area: 468.9,
      country: "USA",
      elevation: 10,
      mayor: "Bill de Blasio",
      founded: 1624,
      landmark: "Statue of Liberty",
      GDP: 1717192,
      timezone: "EST"
    },
    {

      name: "New York",
      population: 8537673,
      area: 468.9,
      country: "USA",
      elevation: 10,
      mayor: "Bill de Blasio",
      founded: 1624,
      landmark: "Statue of Liberty",
      GDP: 1717192,
      timezone: "EST"
    },
    {

      name: "New York",
      population: 8537673,
      area: 468.9,
      country: "USA",
      elevation: 10,
      mayor: "Bill de Blasio",
      founded: 1624,
      landmark: "Statue of Liberty",
      GDP: 1717192,
      timezone: "EST"
    },
    {

      name: "New York",
      population: 8537673,
      area: 468.9,
      country: "USA",
      elevation: 10,
      mayor: "Bill de Blasio",
      founded: 1624,
      landmark: "Statue of Liberty",
      GDP: 1717192,
      timezone: "EST"
    },
    {

      name: "New York",
      population: 8537673,
      area: 468.9,
      country: "USA",
      elevation: 10,
      mayor: "Bill de Blasio",
      founded: 1624,
      landmark: "Statue of Liberty",
      GDP: 1717192,
      timezone: "EST"
    },
    {

      name: "New York",
      population: 8537673,
      area: 468.9,
      country: "USA",
      elevation: 10,
      mayor: "Bill de Blasio",
      founded: 1624,
      landmark: "Statue of Liberty",
      GDP: 1717192,
      timezone: "EST"
    },
    {

      name: "New York",
      population: 8537673,
      area: 468.9,
      country: "USA",
      elevation: 10,
      mayor: "Bill de Blasio",
      founded: 1624,
      landmark: "Statue of Liberty",
      GDP: 1717192,
      timezone: "EST"
    },
    {

      name: "New York",
      population: 8537673,
      area: 468.9,
      country: "USA",
      elevation: 10,
      mayor: "Bill de Blasio",
      founded: 1624,
      landmark: "Statue of Liberty",
      GDP: 1717192,
      timezone: "EST"
    },
    {

      name: "New York",
      population: 8537673,
      area: 468.9,
      country: "USA",
      elevation: 10,
      mayor: "Bill de Blasio",
      founded: 1624,
      landmark: "Statue of Liberty",
      GDP: 1717192,
      timezone: "EST"
    },
    {

      name: "New York",
      population: 8537673,
      area: 468.9,
      country: "USA",
      elevation: 10,
      mayor: "Bill de Blasio",
      founded: 1624,
      landmark: "Statue of Liberty",
      GDP: 1717192,
      timezone: "EST"
    },
    {

      name: "New York",
      population: 8537673,
      area: 468.9,
      country: "USA",
      elevation: 10,
      mayor: "Bill de Blasio DSBFIOJOUQBEFOUBQOUWBCOQ  RUQ3OIHOIQ3HOGG  GIUWEGFOU   QWOUG F  FQOAFGO  UG9OUGOIQ",
      founded: 1624,
      landmark: "Statue of Liberty",
      GDP: 1717192,
      timezone: "EST"
    },
    {

      name: "New York",
      population: 8537673,
      area: 468.9,
      country: "USA",
      elevation: 10,
      mayor: "Bill de Blasio",
      founded: 1624,
      landmark: "Statue of Liberty",
      GDP: 1717192,
      timezone: "EST"
    },
    {

      name: "New York",
      population: 853773,
      area: 468.9,
      country: "USA",
      elevation: 10,
      mayor: "Bill de Blasio",
      founded: 1624,
      landmark: "Statue of Liberty",
      GDP: 1717192,
      timezone: "EST"
    },
    {

      name: "New York",
      population: 857673,
      area: 468.9,
      country: "USA",
      elevation: 10,
      mayor: "Bill de Blasio",
      founded: 1624,
      landmark: "Statue of Liberty",
      GDP: 1717192,
      timezone: "EST"
    },
    {

      name: "New York",
      population: 837673,
      area: 468.9,
      country: "USA",
      elevation: 10,
      mayor: "Bill de Blasio",
      founded: 1624,
      landmark: "Statue of Liberty",
      GDP: 1717192,
      timezone: "EST"
    },
    {

      name: "New York",
      population: 853763,
      area: 468.9,
      country: "USA",
      elevation: 10,
      mayor: "Bill de Blasio",
      founded: 1624,
      landmark: "Statue of Liberty",
      GDP: 1717192,
      timezone: "EST"
    },
  ];;
  function delay() {
    setLoad(true)
    setTimeout(() => {
      setLoad(false);
    }, 2000);
  }
  useEffect(() => {
    delay();
  }, [])


  // const columns = ["name", "population", "area", "country", "elevation", "mayor", "founded", "landmark", "GDP", "timezone"]
  const columns = [
    {
      key: "serial",
      name: "S.NO",
      renderRowCell: (row, index) => index + 1,
      width: 50,
    },
    { key: "name", name: "name", renderRowCell: (row) => { return <div>{row.name}</div>; }, width: 100, sortable: true, showCol: true, editable: true, },
    { key: "population", name: "population", renderRowCell: (row) => { return <div>{row.population}</div>; }, width: 100, sortable: true, showCol: true },
    { key: "area", name: "area", renderRowCell: (row) => { return <div>{row.area}</div>; }, width: 100, sortable: true, showCol: true },
    { key: "country", name: "country", renderRowCell: (row) => { return <div>{row.country}</div>; }, width: 100, sortable: true, showCol: true },
    { key: "elevation", name: "elevation", renderRowCell: (row) => { return <div>{row.elevation}</div>; }, width: 100, sortable: true, showCol: true },
    { key: "mayor", name: "mayor", renderRowCell: (row) => { return <div>{row.mayor}</div>; }, width: 100, sortable: true, showCol: true },
    { key: "founded", name: "founded", renderRowCell: (row) => { return <div>{row.founded}</div>; }, width: 100, sortable: true, showCol: true },
    { key: "landmark", name: "landmark", renderRowCell: (row) => { return <div>{row.landmark}</div>; }, width: 100, sortable: true, showCol: true },
    { key: "GDP", name: "GDP", renderRowCell: (row) => { return <div>{row.GDP}</div>; }, width: 100, sortable: true, showCol: true },
    { key: "timezone", name: "timezone", renderRowCell: (row) => { return row.timezone }, width: 100, sortable: true, showCol: true },
    {
      key: "Action", name: "Action", renderRowCell: (
        row,
        index,
        column,
        editflag,
        setEditFlag,
        handelchange,) => <div className='d-flex'>
          {editflag === false && <button className="icon-1" onClick={() => {
            setEditFlag(index);
          }}>
            <i className="bi bi-pencil">edit</i>
          </button>}
          {
            editflag === index && <>
              <button className="icon-1" onClick={() => {
                setEditFlag(false)
              }}>
                <i className="bi bi-save">
                  save
                </i>
              </button>
              <button className="icon-1" onClick={() => {
                setEditFlag(false);

              }}>
                <i className="bi bi-x">
                  x
                </i>
              </button>
            </>
          }

        </div>, width: 100, sortable: false, showCol: true
    },
    { key: "test", name: "test", renderRowCell: (row) => (<button className='btn cmnbtn btn_sm btn-outline-primary' onClick={() => { alert(`this is ${row.country}`) }}>{row.name}</button>), width: 100, sortable: false, showCol: false }
  ];

  return (
    <div class="app flex-col">
      <div className="w-100">
        <div className="d-flex justify-content-between">
          <h1>React Custom Table</h1>
          <div className="d-flex">
            <button className="btn cmnbtn btn_sm btn-primary mr-3" onClick={() => setTheme("light")}>Light</button>
            <button className="btn cmnbtn btn_sm btn-primary" onClick={() => setTheme("dark")}>Dark</button>
          </div>
        </div>
      </div>
      <div className="card w-75">
        <div className="card-header">
          <h4 className='card-title'>City Data</h4>
        </div>
        <div className="card-body ">

          <CustomTable
            columns={columns}
            data={citiesData}
            fixedHeader
            Pagination
            rowSelectable
            tableName={"City Data"}
            dataLoading={load}
          />
        </div>
      </div>
    </div>
  )
}

export default App
