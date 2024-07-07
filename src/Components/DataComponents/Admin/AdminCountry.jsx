import React, { useState } from 'react';
import Button from '@mui/joy/Button';
import Chip from '@mui/joy/Chip';
import Divider from '@mui/joy/Divider';
import FormControl from '@mui/joy/FormControl';

import Link from '@mui/joy/Link';
import Input from '@mui/joy/Input';
import Backdrop from '@mui/material/Backdrop';

import Table from '@mui/joy/Table';
import Sheet from '@mui/joy/Sheet';
import Checkbox from '@mui/joy/Checkbox';
import Typography from '@mui/joy/Typography';


import SearchIcon from '@mui/icons-material/Search';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import BlockIcon from '@mui/icons-material/Block';
import AutorenewRoundedIcon from '@mui/icons-material/AutorenewRounded';
import { Box, DialogActions, DialogContent, DialogTitle, Modal, ModalClose, ModalDialog } from '@mui/joy';



const rows = [
  {
    name: 'India',
    status: 'Active',
    created_date: '2021-01-15',
    modified_date: '2023-05-12',
    id: 1,
  },
  {
    name: 'USA',
    status: 'Inactive',
    created_date: '2020-03-22',
    modified_date: '2023-06-18',
    id: 2,
  },
  {
    name: 'Australia',
    status: 'Active',
    created_date: '2019-07-08',
    modified_date: '2023-04-27',
    id: 3,
  },
  {
    name: 'Pakistan',
    status: 'Pending',
    created_date: '2022-02-11',
    modified_date: '2023-05-09',
    id: 4,
  },
  {
    name: 'England',
    status: 'Active',
    created_date: '2018-11-30',
    modified_date: '2023-05-25',
    id: 5,
  },
  {
    name: 'New Zealand',
    status: 'Inactive',
    created_date: '2021-06-14',
    modified_date: '2023-07-01',
    id: 6,
  },
];


const AdminCountry = () => {

  const [showModal, setShowModal] = React.useState(false);
  const [order, setOrder] = useState('desc');
  const [selected, setSelected] = useState([]);
  const [open, setOpen] = useState(false);
  const [createCountry, setCreateCountry] = useState(false);
  const handleOpen = () => setOpen(!open);

  const handleCloseCountryModal = () => {
    setCreateCountry(prev => !prev);
  };
  const emails = ['username@gmail.com', 'user02@gmail.com'];

  function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }

  const getComparator = (order, orderBy) => (
    order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy)
  );

  function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) {
        return order;
      }
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  }


  const CountryModal = ({show, onClose})=>{
    return (
      <>
      
        {show ? (
          <>
            <div
              className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-[999999] px-4 outline-none focus:outline-none"
            >
              <div className="relative w-auto my-6 mx-auto max-w-3xl">
                {/*content*/}
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                  {/*header*/}
                  <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                    <h3 className="text-3xl font-semibold">
                      Modal Title
                    </h3>
                    <button
                      className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                      onClick={() => onClose()}
                    >
                      <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                        ×
                      </span>
                    </button>
                  </div>
                  {/*body*/}
                  <div className="relative p-6 flex-auto">
                    <p className="my-4 text-blueGray-500 text-lg leading-relaxed">
                      I always felt like I could do anything. That’s the main
                      thing people are controlled by! Thoughts- their perception
                      of themselves! They're slowed down by their perception of
                      themselves. If you're taught you can’t do anything, you
                      won’t do anything. I was taught I could do everything.
                    </p>
                  </div>
                  {/*footer*/}
                  <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                    <button
                      className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => onClose()}
                    >
                      Close
                    </button>
                    <button
                      className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => onClose()}
                    >
                      Save Changes
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
          </>
        ) : null}
      </>
    );
  }


  return (
    <>

      <div
        className="flex flex-row gap-3"

      >
        <FormControl sx={{ flex: 1 }} size="sm">
          <Input size="sm" placeholder="Search" startDecorator={<SearchIcon />} />
        </FormControl>
       
        <button onClick={handleCloseCountryModal} type="button" className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br  focus:outline-none  font-medium rounded-lg text-sm px-5 py-1.5 text-center me-2 mb-2">Create Country</button>

      </div>
      <Modal
      
        open={createCountry}
        onClose={handleCloseCountryModal}
        className=""
      >
        
        <ModalDialog className="p-2">
                
                  <div className="flex items-start justify-between p-2 border-b border-solid border-blueGray-200 rounded-t">
                    <h3 className="text-3xl font-semibold">
                      Modal Title
                    </h3>
                    <button
                      className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                      onClick={() => handleCloseCountryModal()}
                    >
                      <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                        ×
                      </span>
                    </button>
                  </div>
              
                  <div className="relative p-3 flex-auto max-h-[400px] overflow-y-auto">
                    <p className="my-4 text-blueGray-500 text-lg leading-relaxed">
                      I always felt like I could do anything. That’s the main
                      thing people are controlled by! Thoughts- their perception
                      of themselves! They're slowed down by their perception of
                      themselves. If you're taught you can’t do anything, you
                      won’t do anything. I was taught I could do everything.
                    </p>
                  </div>
              
                  <div className="flex items-center justify-end  border-t border-solid border-blueGray-200 rounded-b">
                  
                    <button onClick={() => handleCloseCountryModal()} type="button" class="text-white bg-gradient-to-r from-red-300 via-red-500 to-red-600 hover:bg-gradient-to-br  focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Red</button>
                   
                    <button  onClick={handleCloseCountryModal} type="button" className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br  focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Save Country</button>
                  </div>
        </ModalDialog>
      </Modal>
     {/* <CountryModal show={createCountry} onClose={handleCloseCountryModal}/> */}
      <Sheet
        className="OrderTableContainer"
        variant="outlined"
        sx={{
          // display: { xs: 'none', sm: 'initial' },
          width: '100%',
          borderRadius: 'sm',
          flexShrink: 1,
          overflow: 'auto',
          minHeight: 0,
        }}
      >
        <Table
          aria-labelledby="tableTitle"
          stickyHeader
          hoverRow
          sx={{
            '--TableCell-headBackground': 'var(--joy-palette-background-level1)',
            '--Table-headerUnderlineThickness': '1px',
            '--TableRow-hoverBackground': 'var(--joy-palette-background-level1)',
            '--TableCell-paddingY': '4px',
            '--TableCell-paddingX': '8px',
          }}
        >
          <thead>
            <tr>
              <th style={{ width: 48, textAlign: 'center', padding: '12px 6px' }}>
                <Checkbox
                  size="sm"
                  indeterminate={
                    selected.length > 0 && selected.length !== rows.length
                  }
                  checked={selected.length === rows.length}
                  onChange={(event) => {
                    setSelected(
                      event.target.checked ? rows.map((row) => row.id) : [],
                    );
                  }}
                  color={
                    selected.length > 0 || selected.length === rows.length
                      ? 'primary'
                      : undefined
                  }
                  sx={{ verticalAlign: 'text-bottom' }}
                />
              </th>
              <th style={{ width: 120, padding: '12px 6px' }}>
                <Link
                  underline="none"
                  color="primary"
                  component="button"
                  onClick={() => setOrder(order === 'asc' ? 'desc' : 'asc')}
                  fontWeight="lg"
                  endDecorator={<ArrowDropDownIcon />}
                  sx={{
                    '& svg': {
                      transition: '0.2s',
                      transform:
                        order === 'desc' ? 'rotate(0deg)' : 'rotate(180deg)',
                    },
                  }}
                >
                  Name
                </Link>
              </th>
              <th style={{ width: 140, padding: '12px 6px' }}>Status</th>
              <th style={{ width: 140, padding: '12px 6px' }}>Created Date</th>
              <th style={{ width: 240, padding: '12px 6px' }}>Modified  Date</th>
            </tr>
          </thead>
          <tbody>
            {stableSort(rows, getComparator(order, 'id')).map((row) => (
              <tr key={row.employeeId}>
                <td style={{ textAlign: 'center', width: 120 }}>
                  <Checkbox
                    size="sm"
                    checked={selected.includes(row.employeeId)}
                    color={selected.includes(row.employeeId) ? 'primary' : undefined}
                    onChange={(event) => {
                      setSelected((ids) =>
                        event.target.checked
                          ? ids.concat(row.employeeId)
                          : ids.filter((itemId) => itemId !== row.employeeId),
                      );
                    }}
                    slotProps={{ checkbox: { sx: { textAlign: 'left' } } }}
                    sx={{ verticalAlign: 'text-bottom' }}
                  />
                </td>
                <td>
                  <Typography level="body-xs">{row?.name}</Typography>
                </td>
                <td>
                  <Chip
                    variant="soft"
                    size="sm"
                    startDecorator={
                      {
                        Paid: <CheckRoundedIcon />,
                        Refunded: <AutorenewRoundedIcon />,
                        Cancelled: <BlockIcon />,
                      }[row.status]
                    }
                    color={
                      {
                        Paid: 'success',
                        Refunded: 'neutral',
                        Cancelled: 'danger',
                      }[row.status] || 'primary'
                    }



                  >
                    {row?.status}
                  </Chip>
                </td>
                <td>
                  <Typography level="body-xs">{row?.created_date}</Typography>
                </td>
                <td>
                  <Typography level="body-xs">{row?.modified_date}</Typography>
                </td>



              </tr>
            ))}
          </tbody>
        </Table>
      </Sheet>
    </>
  )
}

export default AdminCountry