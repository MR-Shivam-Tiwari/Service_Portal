import React, { useState } from 'react';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Chip from '@mui/joy/Chip';
import Divider from '@mui/joy/Divider';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Link from '@mui/joy/Link';
import Input from '@mui/joy/Input';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import ModalClose from '@mui/joy/ModalClose';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import Table from '@mui/joy/Table';
import Sheet from '@mui/joy/Sheet';
import Checkbox from '@mui/joy/Checkbox';
import IconButton, { iconButtonClasses } from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';


import FilterAltIcon from '@mui/icons-material/FilterAlt';
import SearchIcon from '@mui/icons-material/Search';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import BlockIcon from '@mui/icons-material/Block';
import AutorenewRoundedIcon from '@mui/icons-material/AutorenewRounded';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import PersonIcon from '@mui/icons-material/Person';
import AddIcon from '@mui/icons-material/Add';


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

  const [order, setOrder] = useState('desc');
  const [selected, setSelected] = useState([]);
  const [open, setOpen] = useState(false);
  const [createCountry, setCreateCountry] = useState(false);
 

  const handleCloseCountryModal = () => {
    setCreateCountry(prev=>!prev);
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
  const style = {
    position: 'absolute' ,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
  const renderFilters = () => (
    <React.Fragment>
      <FormControl size="sm">
        <FormLabel>Status</FormLabel>
        <Select
          size="sm"
          placeholder="Filter by status"
          slotProps={{ button: { sx: { whiteSpace: 'nowrap' } } }}
        >
          <Option value="paid">Paid</Option>
          <Option value="pending">Pending</Option>
          <Option value="refunded">Refunded</Option>
          <Option value="cancelled">Cancelled</Option>
        </Select>
      </FormControl>
      <FormControl size="sm">
        <FormLabel>Category</FormLabel>
        <Select size="sm" placeholder="All">
          <Option value="all">All</Option>
          <Option value="refund">Refund</Option>
          <Option value="purchase">Purchase</Option>
          <Option value="debit">Debit</Option>
        </Select>
      </FormControl>
      <FormControl size="sm">handleListItemClick 
        <FormLabel>Customer</FormLabel>
        <Button color='primary' onClick={handleCloseCountryModal}> Create Country</Button>
      </FormControl>
      <Modal open={createCountry} onClose={() => setCreateCountry()} className="z-20">
      <ModalDialog aria-labelledby="filter-modal" layout="fullscreen">
        <ModalClose />
        <Typography id="filter-modal" level="h2">
          Filters
        </Typography>
        <Divider sx={{ my: 2 }} />
      
      </ModalDialog>
    </Modal>

    </React.Fragment>
  );
  return (
  <>
      <Sheet
    className="SearchAndFilters-mobile"
    sx={{
      display: { xs: 'flex', sm: 'none' },
      my: 1,
      gap: 1,
    }}
  >
    <Input
      size="sm"
      placeholder="Search"
      startDecorator={<SearchIcon />}
      sx={{ flexGrow: 1 }}
    />
    <IconButton
      size="sm"
      variant="outlined"
      color="neutral"
      onClick={() => setOpen(true)}
    >
      <FilterAltIcon />
    </IconButton>
    <Modal open={open} onClose={() => setOpen(false)}>
      <ModalDialog aria-labelledby="filter-modal" layout="fullscreen">
        <ModalClose />
        <Typography id="filter-modal" level="h2">
          Filters
        </Typography>
        <Divider sx={{ my: 2 }} />
        <Sheet sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {renderFilters()}
          <Button color="primary" onClick={() => setOpen(false)}>
            Submit
          </Button>
        </Sheet>
      </ModalDialog>
    </Modal>
  </Sheet>
  <Box
        className="SearchAndFilters-tabletUp"
        sx={{
          borderRadius: 'sm',
          py: 2,
          display: { xs: 'none', sm: 'flex' },
          flexWrap: 'wrap',
          gap: 1.5,
          '& > *': {
            minWidth: { xs: '120px', md: '160px' },
          },
        }}
      >
        <FormControl sx={{ flex: 1 }} size="sm">
          <FormLabel>Search for order</FormLabel>
          <Input size="sm" placeholder="Search" startDecorator={<SearchIcon />} />
        </FormControl>
        {renderFilters()}
      </Box>
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