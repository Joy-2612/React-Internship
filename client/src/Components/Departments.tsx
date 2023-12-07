// Departments.tsx
import React, { useEffect, useState } from 'react';
import { DataGrid, GridColDef, GridPageChangeParams, GridRowsProp } from '@mui/x-data-grid';
import DepartmentList from './DepartmentList'; // Import the new component
import { useNavigate } from 'react-router-dom';

interface Department {
  userId: number;
  id: number;
  title: string;
  body: string;
}

const Departments: React.FC = () => {
  const navigate = useNavigate();
  const [departmentData, setDepartmentData] = useState<GridRowsProp>([]);
  const [departmentList, setDepartmentList] = useState([]); // Add a state for department list

  const rowsPerPage = 5;
  const totalRows = 100; // Adjust this based on your total row count

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        const data = await response.json();
        setDepartmentData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);



  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'title', headerName: 'Title', width: 200 },
    { field: 'body', headerName: 'Description', flex: 1 },
  ];

  // Check if user data is present in local storage
  useEffect(() => {
    const userDataString = localStorage.getItem('userData');

    if (!userDataString) {
      // User data not found, redirect to the login page
      navigate('/');
    }
  }, [navigate]);

  const handlePageChange = (params: GridPageChangeParams) => {
    // Fetch the data for the new page here if needed
    console.log(params.page);
  };

  return (
    <div>
      <h1>Departments</h1>
      <DataGrid
        rows={departmentData}
        columns={columns}
        pageSize={rowsPerPage}
        rowsPerPageOptions={[rowsPerPage]}
        pagination
        paginationMode="server"
        onPageChange={handlePageChange}
        style={{ height: rowsPerPage * 40 + 85, width:"50rem", backgroundColor:"white" }} // Adjust the height based on the row count
      />
      <DepartmentList departments={departmentList} />
    </div>
  );
};

export default Departments;
