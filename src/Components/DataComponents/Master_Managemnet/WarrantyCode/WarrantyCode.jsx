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
      serialNumber: 'SER-001',
      materialCode: 'MAT-001',
      materialDescription: 'Product 1',
      equipment: 'Equipment 1',
      currentCustomer: 'Customer A',
      endCustomer: 'End Customer A',
      custWarrantyStart: '2024-04-01',
      custWarrantyEnd: '2025-04-01',
      dealerWarrantyStart: '2024-04-01',
      dealerWarrantyEnd: '2025-04-01',
    },
    {
      serialNumber: 'SER-002',
      materialCode: 'MAT-002',
      materialDescription: 'Product 2',
      equipment: 'Equipment 2',
      currentCustomer: 'Customer B',
      endCustomer: 'End Customer B',
      custWarrantyStart: '2024-03-15',
      custWarrantyEnd: '2025-03-15',
      dealerWarrantyStart: '2024-03-15',
      dealerWarrantyEnd: '2025-03-15',
    },
    {
      serialNumber: 'SER-003',
      materialCode: 'MAT-003',
      materialDescription: 'Product 3',
      equipment: 'Equipment 3',
      currentCustomer: 'Customer C',
      endCustomer: 'End Customer C',
      custWarrantyStart: '2024-02-20',
      custWarrantyEnd: '2025-02-20',
      dealerWarrantyStart: '2024-02-20',
      dealerWarrantyEnd: '2025-02-20',
    },
    {
      serialNumber: 'SER-004',
      materialCode: 'MAT-004',
      materialDescription: 'Product 4',
      equipment: 'Equipment 4',
      currentCustomer: 'Customer D',
      endCustomer: 'End Customer D',
      custWarrantyStart: '2024-01-10',
      custWarrantyEnd: '2025-01-10',
      dealerWarrantyStart: '2024-01-10',
      dealerWarrantyEnd: '2025-01-10',
    },
    {
      serialNumber: 'SER-005',
      materialCode: 'MAT-005',
      materialDescription: 'Product 5',
      equipment: 'Equipment 5',
      currentCustomer: 'Customer E',
      endCustomer: 'End Customer E',
      custWarrantyStart: '2024-05-25',
      custWarrantyEnd: '2025-05-25',
      dealerWarrantyStart: '2024-05-25',
      dealerWarrantyEnd: '2025-05-25',
    },
    {
      serialNumber: 'SER-006',
      materialCode: 'MAT-006',
      materialDescription: 'Product 6',
      equipment: 'Equipment 6',
      currentCustomer: 'Customer F',
      endCustomer: 'End Customer F',
      custWarrantyStart: '2024-06-30',
      custWarrantyEnd: '2025-06-30',
      dealerWarrantyStart: '2024-06-30',
      dealerWarrantyEnd: '2025-06-30',
    },
    {
      serialNumber: 'SER-007',
      materialCode: 'MAT-007',
      materialDescription: 'Product 7',
      equipment: 'Equipment 7',
      currentCustomer: 'Customer G',
      endCustomer: 'End Customer G',
      custWarrantyStart: '2024-07-12',
      custWarrantyEnd: '2025-07-12',
      dealerWarrantyStart: '2024-07-12',
      dealerWarrantyEnd: '2025-07-12',
    },
    {
      serialNumber: 'SER-008',
      materialCode: 'MAT-008',
      materialDescription: 'Product 8',
      equipment: 'Equipment 8',
      currentCustomer: 'Customer H',
      endCustomer: 'End Customer H',
      custWarrantyStart: '2024-08-20',
      custWarrantyEnd: '2025-08-20',
      dealerWarrantyStart: '2024-08-20',
      dealerWarrantyEnd: '2025-08-20',
    },
    {
      serialNumber: 'SER-009',
      materialCode: 'MAT-009',
      materialDescription: 'Product 9',
      equipment: 'Equipment 9',
      currentCustomer: 'Customer I',
      endCustomer: 'End Customer I',
      custWarrantyStart: '2024-09-18',
      custWarrantyEnd: '2025-09-18',
      dealerWarrantyStart: '2024-09-18',
      dealerWarrantyEnd: '2025-09-18',
    },
    {
      serialNumber: 'SER-010',
      materialCode: 'MAT-010',
      materialDescription: 'Product 10',
      equipment: 'Equipment 10',
      currentCustomer: 'Customer J',
      endCustomer: 'End Customer J',
      custWarrantyStart: '2024-10-05',
      custWarrantyEnd: '2025-10-05',
      dealerWarrantyStart: '2024-10-05',
      dealerWarrantyEnd: '2025-10-05',
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
function WarrantyCode() {
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
                        Serial Number
                      </Link>
                    </th>
                    <th style={{ width: 140, padding: '12px 6px' }}>Material Code</th>
                    <th style={{ width: 140, padding: '12px 6px' }}>Material Description</th>
                    <th style={{ width: 240, padding: '12px 6px' }}>Equipment</th>
                    <th style={{ width: 140, padding: '12px 6px' }}> Current Customer  </th>
                    <th style={{ width: 140, padding: '12px 6px' }}> End Customer </th>
                    <th style={{ width: 140, padding: '12px 6px' }}> Cust Warrenty Start </th>
                    <th style={{ width: 140, padding: '12px 6px' }}> Cust Warrenty End </th>
                    <th style={{ width: 140, padding: '12px 6px' }}> Dealer Warrenty Start </th>
                    <th style={{ width: 140, padding: '12px 6px' }}> Dealer Warrenty End </th>
                  </tr>
                </thead>
                <tbody>
                  {stableSort(rows, getComparator(order, 'id')).map((row) => (
                    <tr key={row.serialNumber}>
                      <td style={{ textAlign: 'center', width: 120 }}>
                        <Checkbox
                          size="sm"
                          checked={selected.includes(row.serialNumber)}
                          color={selected.includes(row.serialNumber) ? 'primary' : undefined}
                          onChange={(event) => {
                            setSelected((ids) =>
                              event.target.checked
                                ? ids.concat(row.serialNumber)
                                : ids.filter((itemId) => itemId !== row.serialNumber),
                            );
                          }}
                          slotProps={{ checkbox: { sx: { textAlign: 'left' } } }}
                          sx={{ verticalAlign: 'text-bottom' }}
                        />
                      </td>
                      <td>
                        <Typography level="body-xs">{row.serialNumber}</Typography>
                      </td>
                      <td>
                        <Typography level="body-xs">{row.materialCode}</Typography>
                      </td>
                      <td>
                        <Typography level="body-xs">{row.materialDescription}</Typography>
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
                          {row.equipment}
                        </Chip>
                      </td>
                      <td>
                        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                          {/* <Avatar size="sm">{row.customer.initial}</Avatar> */}
                          <div>
                            <Typography level="body-xs">{row.currentCustomer}</Typography>
                          </div>
                        </Box>
                      </td>
                      <td>
                        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                          
                          <div>
                          <Typography level="body-xs">{row.endCustomer}</Typography>
      
                          </div>
                        </Box>
                      </td>
                      <td>
                        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                          
                          <div>
                          <Typography level="body-xs">{row.custWarrantyStart}</Typography>
      
                          </div>
                        </Box>
                      </td>
                      <td>
                        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                          
                          <div>
                          <Typography level="body-xs">{row.custWarrantyEnd}</Typography>
      
                          </div>
                        </Box>
                      </td>
                      <td>
                        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                          
                          <div>
                          <Typography level="body-xs">{row.dealerWarrantyStart}</Typography>
      
                          </div>
                        </Box>
                      </td>
                      <td>
                        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                          
                          <div>
                          <Typography level="body-xs">{row.dealerWarrantyEnd}</Typography>
      
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

export default WarrantyCode
