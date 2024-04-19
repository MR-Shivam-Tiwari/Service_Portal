/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import { ColorPaletteProp } from '@mui/joy/styles';
import Avatar from '@mui/joy/Avatar';
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
import Menu from '@mui/joy/Menu';
import MenuButton from '@mui/joy/MenuButton';
import MenuItem from '@mui/joy/MenuItem';
import Dropdown from '@mui/joy/Dropdown';

import FilterAltIcon from '@mui/icons-material/FilterAlt';
import SearchIcon from '@mui/icons-material/Search';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import BlockIcon from '@mui/icons-material/Block';
import AutorenewRoundedIcon from '@mui/icons-material/AutorenewRounded';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded';
const rows = [
  {
    employeeId: 'EMP-001',
    firstName: 'Alice',
    lastName: 'Smith',
    email: 'alice.smith@email.com',
    managerEmail: 'manager1@email.com',
    mobileNumber: '1234567890',
    department: 'Marketing',
  },
  {
    employeeId: 'EMP-002',
    firstName: 'Bob',
    lastName: 'Johnson',
    email: 'bob.johnson@email.com',
    managerEmail: 'manager2@email.com',
    mobileNumber: '9876543210',
    department: 'Finance',
  },
  {
    employeeId: 'EMP-003',
    firstName: 'Charlie',
    lastName: 'Brown',
    email: 'charlie.brown@email.com',
    managerEmail: 'manager3@email.com',
    mobileNumber: '5555555555',
    department: 'HR',
  },
  {
    employeeId: 'EMP-004',
    firstName: 'David',
    lastName: 'Lee',
    email: 'david.lee@email.com',
    managerEmail: 'manager4@email.com',
    mobileNumber: '7777777777',
    department: 'IT',
  },
  {
    employeeId: 'EMP-005',
    firstName: 'Emma',
    lastName: 'Wong',
    email: 'emma.wong@email.com',
    managerEmail: 'manager5@email.com',
    mobileNumber: '9999999999',
    department: 'Operations',
  },
  {
    employeeId: 'EMP-006',
    firstName: 'Frank',
    lastName: 'Davis',
    email: 'frank.davis@email.com',
    managerEmail: 'manager6@email.com',
    mobileNumber: '4444444444',
    department: 'Sales',
  },
  {
    employeeId: 'EMP-007',
    firstName: 'Grace',
    lastName: 'Martinez',
    email: 'grace.martinez@email.com',
    managerEmail: 'manager7@email.com',
    mobileNumber: '1111111111',
    department: 'Engineering',
  },
  {
    employeeId: 'EMP-008',
    firstName: 'Henry',
    lastName: 'Garcia',
    email: 'henry.garcia@email.com',
    managerEmail: 'manager8@email.com',
    mobileNumber: '2222222222',
    department: 'Customer Service',
  },
  {
    employeeId: 'EMP-009',
    firstName: 'Isabella',
    lastName: 'Lopez',
    email: 'isabella.lopez@email.com',
    managerEmail: 'manager9@email.com',
    mobileNumber: '3333333333',
    department: 'Research',
  },
  {
    employeeId: 'EMP-010',
    firstName: 'Jack',
    lastName: 'Rodriguez',
    email: 'jack.rodriguez@email.com',
    managerEmail: 'manager10@email.com',
    mobileNumber: '6666666666',
    department: 'Legal',
  },
  {
    employeeId: 'EMP-011',
    firstName: 'Kate',
    lastName: 'Hernandez',
    email: 'kate.hernandez@email.com',
    managerEmail: 'manager11@email.com',
    mobileNumber: '1231231234',
    department: 'Quality Assurance',
  },
  {
    employeeId: 'EMP-012',
    firstName: 'Leo',
    lastName: 'Gonzalez',
    email: 'leo.gonzalez@email.com',
    managerEmail: 'manager12@email.com',
    mobileNumber: '9879879876',
    department: 'Design',
  },
  {
    employeeId: 'EMP-013',
    firstName: 'Mia',
    lastName: 'Perez',
    email: 'mia.perez@email.com',
    managerEmail: 'manager13@email.com',
    mobileNumber: '3213213210',
    department: 'Production',
  },
  {
    employeeId: 'EMP-014',
    firstName: 'Noah',
    lastName: 'Torres',
    email: 'noah.torres@email.com',
    managerEmail: 'manager14@email.com',
    mobileNumber: '6546546540',
    department: 'Training',
  },
  {
    employeeId: 'EMP-015',
    firstName: 'Olivia',
    lastName: 'Flores',
    email: 'olivia.flores@email.com',
    managerEmail: 'manager15@email.com',
    mobileNumber: '7897897890',
    department: 'Administration',
  },
  {
    employeeId: 'EMP-016',
    firstName: 'Peter',
    lastName: 'Ramirez',
    email: 'peter.ramirez@email.com',
    managerEmail: 'manager16@email.com',
    mobileNumber: '4564564560',
    department: 'Logistics',
  },
  {
    employeeId: 'EMP-017',
    firstName: 'Quinn',
    lastName: 'Gomez',
    email: 'quinn.gomez@email.com',
    managerEmail: 'manager17@email.com',
    mobileNumber: '9876541230',
    department: 'Supply Chain',
  },
  {
    employeeId: 'EMP-018',
    firstName: 'Ryan',
    lastName: 'Reyes',
    email: 'ryan.reyes@email.com',
    managerEmail: 'manager18@email.com',
    mobileNumber: '1593574560',
    department: 'Procurement',
  },
  {
    employeeId: 'EMP-019',
    firstName: 'Sophia',
    lastName: 'Sanchez',
    email: 'sophia.sanchez@email.com',
    managerEmail: 'manager19@email.com',
    mobileNumber: '7539514560',
    department: 'Warehousing',
  },
  {
    employeeId: 'EMP-020',
    firstName: 'Thomas',
    lastName: 'Smith',
    email: 'thomas.smith@email.com',
    managerEmail: 'manager20@email.com',
    mobileNumber: '4561237890',
    department: 'Distribution',
  },
];


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
function RowMenu() {
  return (
    <Dropdown>
      <MenuButton
        slots={{ root: IconButton }}
        slotProps={{ root: { variant: 'plain', color: 'neutral', size: 'sm' } }}
      >
        <MoreHorizRoundedIcon />
      </MenuButton>
      <Menu size="sm" sx={{ minWidth: 140 }}>
        <MenuItem>Edit</MenuItem>
        <MenuItem>Rename</MenuItem>
        <MenuItem>Move</MenuItem>
        <Divider />
        <MenuItem color="danger">Delete</MenuItem>
      </Menu>
    </Dropdown>
  );
}

function UserData() {
  const [order, setOrder] = useState('desc');
  const [selected, setSelected] = useState([]);
  const [open, setOpen] = useState(false);
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
      <FormControl size="sm">
        <FormLabel>Customer</FormLabel>
        <Select size="sm" placeholder="All">
          <Option value="all">All</Option>
          <Option value="olivia">Olivia Rhye</Option>
          <Option value="steve">Steve Hampton</Option>
          <Option value="ciaran">Ciaran Murray</Option>
          <Option value="marina">Marina Macdonald</Option>
          <Option value="charles">Charles Fulton</Option>
          <Option value="jay">Jay Hoper</Option>
        </Select>
      </FormControl>
    </React.Fragment>
  );
  return (
    <React.Fragment>
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
                  Employee ID
                </Link>
              </th>
              <th style={{ width: 140, padding: '12px 6px' }}>First Name</th>
              <th style={{ width: 140, padding: '12px 6px' }}>Last name</th>
              <th style={{ width: 240, padding: '12px 6px' }}>Department</th>
              <th style={{ width: 140, padding: '12px 6px' }}> Manager Email </th>
              <th style={{ width: 140, padding: '12px 6px' }}> Mobile Number </th>
              <th style={{ width: 140, padding: '12px 6px' }}> Email </th>
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
                  <Typography level="body-xs">{row.employeeId}</Typography>
                </td>
                <td>
                  <Typography level="body-xs">{row.firstName}</Typography>
                </td>
                <td>
                  <Typography level="body-xs">{row.lastName}</Typography>
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
                    {row.department}
                  </Chip>
                </td>
                <td>
                  <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                    {/* <Avatar size="sm">{row.customer.initial}</Avatar> */}
                    <div>
                      <Typography level="body-xs">{row.email}</Typography>
                    </div>
                  </Box>
                </td>
                <td>
                  <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                    
                    <div>
                    <Typography level="body-xs">{row.mobileNumber}</Typography>

                    </div>
                  </Box>
                </td>
                <td>
                  <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                    
                    <div>
                    <Typography level="body-xs">{row.email}</Typography>

                    </div>
                  </Box>
                </td>

              </tr>
            ))}
          </tbody>
        </Table>
      </Sheet>
      <Box
        className="Pagination-laptopUp"
        sx={{
          pt: 2,
          gap: 1,
          [`& .${iconButtonClasses.root}`]: { borderRadius: '50%' },
          display: {
            xs: 'none',
            md: 'flex',
          },
        }}
      >
        <Button
          size="sm"
          variant="outlined"
          color="neutral"
          startDecorator={<KeyboardArrowLeftIcon />}
        >
          Previous
        </Button>

        <Box sx={{ flex: 1 }} />
        {['1', '2', '3', '…', '8', '9', '10'].map((page) => (
          <IconButton
            key={page}
            size="sm"
            variant={Number(page) ? 'outlined' : 'plain'}
            color="neutral"
          >
            {page}
          </IconButton>
        ))}
        <Box sx={{ flex: 1 }} />

        <Button
          size="sm"
          variant="outlined"
          color="neutral"
          endDecorator={<KeyboardArrowRightIcon />}
        >
          Next
        </Button>
      </Box>
    </React.Fragment>
  );
}

export default UserData
