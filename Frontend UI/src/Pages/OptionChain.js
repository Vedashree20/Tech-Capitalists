import React, {useState, useEffect} from 'react'
import '../App.css'
import axios from 'axios';
import 'mdb-react-ui-kit/dist/css/mdb.min.css'
import { MDBTable, MDBTableHead, MDBTableBody, MDBRow, MDBCol, MDBContainer } from 'mdb-react-ui-kit';

function OptionChain() {
  const [data, setData] = useState([]);
  // const [optionsvalue, setOptionsvalue] = useState("");
  const [statusvalue, setStatusvalue] = useState("");

  // const sortOptionsContract = ['name', 'email', 'phone', 'status'];
  const sortStatus = ['Online', 'Offline'];

  useEffect(() => {
    loadUsersData();
  }, []);

  const loadUsersData = async () => {
   return await axios.get("http://localhost:5000/data").then((response) => setData(response.data)).catch((err) => console.log(err));
  };

  console.log("data", data);

  // const handleOptionContractsChange = async (e) => {
  //   let value = e.target.value;
  //   setOptionsvalue(value);
  //   return await axios
  //   .get(`http://localhost:5000/data?_sort=${value}&_order=asc`)
  //   .then((response) => {
  //     setData(response.data);
  //   })
  //   .catch((err) => console.log(err));
  // };

  const handleStatusChange = async (e) => {
    let value = e.target.value;
    setStatusvalue(value);
    if(value === 'none'){
      loadUsersData();
    } else {
      return await axios
    .get(`http://localhost:5000/data?status=${value}`)
    .then((response) => {
      setData(response.data);
    })
    .catch((err) => console.log(err));
    }
  };

  return (
      <MDBContainer>
        <div className='heading'>Option Chain</div>
        <div style={{marginTop: "50px"}}>
          <div className='cont1'><MDBRow>
              <MDBCol size="3">
              <h8>View Options Contracts For:</h8>
              <select style={{width: "80%", borderRadius: "7px", height: "37px"}} onChange={handleStatusChange} value={statusvalue}>
                <option value='none'>Select</option>
                {sortStatus.map((item, index) => (
                  <option value={item} key={index}>{item}</option>
                ))}
              </select>
            </MDBCol>
            <MDBCol size="3">
              <h8>Select Symbol:</h8>
              <select style={{width: "80%", borderRadius: "7px", height: "37px"}} onChange={handleStatusChange} value={statusvalue}>
                <option value='none'>Select</option>
                {sortStatus.map((item, index) => (
                  <option value={item} key={index}>{item}</option>
                ))}
              </select></MDBCol>
              <MDBCol size="3">
              <h8>Expiry Date:</h8>
              <select style={{width: "80%", borderRadius: "7px", height: "37px"}} onChange={handleStatusChange} value={statusvalue}>
                <option value='none'>Select</option>
                {sortStatus.map((item, index) => (
                  <option value={item} key={index}>{item}</option>
                ))}
              </select></MDBCol>
              <MDBCol size="3">
              <h8>Strike Price:</h8>
              <select style={{width: "80%", borderRadius: "7px", height: "37px"}} onChange={handleStatusChange} value={statusvalue}>
                <option value='none'>Select</option>
                {sortStatus.map((item, index) => (
                  <option value={item} key={index}>{item}</option>
                ))}
              </select></MDBCol>
          </MDBRow></div>
        </div>
        <div style={{marginTop: "100px"}}>
          <MDBRow>
            <MDBCol size="12">
              <MDBTable>
                <MDBTableHead dark>
                  <tr>
                    <th scope='col'>ID</th>
                    <th scope='col'>Name</th>
                    <th scope='col'>Email</th>
                    <th scope='col'>Phone</th>
                    <th scope='col'>Status</th>
                  </tr>
                </MDBTableHead>
                {data.length === 0 ? (
                  <MDBTableBody className='align-center mb-0'>
                    <tr>
                      <td colSpan={8} className='text-center mb-0'>No Data Found</td>
                    </tr>
                  </MDBTableBody>
                ): (
                  data.map((item, index) => (
                    <MDBTableBody key = {index}>
                      <tr style={{backgroundColor: "white"}}>
                        <th scope='row'>{index+1}</th>
                        <td>{item.name}</td>
                        <td>{item.email}</td>
                        <td>{item.phone}</td>
                        <td>{item.status}</td>
                      </tr>
                    </MDBTableBody>
                  ))
                ) }
              </MDBTable>
            </MDBCol>
          </MDBRow>
        </div>
      </MDBContainer>
  )
}

export default OptionChain