import React, { useEffect, useState } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import DepartmentList from './DepartmentList';

interface Department {
  userId: number;
  id: number;
  title: string;
  body: string;
}

const Departments: React.FC = () => {
  const [departmentData, setDepartmentData] = useState<Department[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        const data: Department[] = await response.json();
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

  return (
    <div>
      <h1>Departments</h1>
      <DataGrid
        rows={departmentData}
        columns={columns}
        pagination
        paginationMode="server"
        style={{ height: 315, width: '50rem', backgroundColor: 'white' }}
      />
      <DepartmentList />
    </div>
  );
};

export default Departments;
