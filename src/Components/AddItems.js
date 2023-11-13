import React from 'react'
import { DataGrid } from '@mui/x-data-grid';


const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'firstName', headerName: 'First name', width: 130 },
    { field: 'lastName', headerName: 'Last name', width: 130 },
    { field: 'middleName', headerName: 'Middle name', width: 130,},
    { field: 'suffix', headerName: 'Suffix', width: 5,},
    { field: 'batch', headerName: 'Batch Year', width: 5,},
    { field: 'strand', headerName: 'Strand', width: 25,},
    { field: 'section', headerName: 'Section', width: 5,},
    
    ];
    const rows = [
    { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
    { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
    { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
    { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
    { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
    { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
    { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
    { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
    { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
    ];
const AddItems = () => {
    return (    
        <div>
            <h2>Recently Added Alumna</h2> <br/>
            <div style={{ height: 500, width: '100%' }}>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        initialState={{
                        pagination: {
                        paginationModel: { page: 10, pageSize: 10},
                        },
                    }}
        pageSizeOptions={[0, 10]}
        checkboxSelection
    />
    </div>
        </div>
    )
}

export default AddItems