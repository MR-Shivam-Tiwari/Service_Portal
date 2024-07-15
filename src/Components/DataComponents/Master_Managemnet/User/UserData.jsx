import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { Button, Divider, FormControl, FormLabel, IconButton, Input, Modal, ModalClose, ModalDialog, Option, Select, Sheet, Typography } from '@mui/joy';
import SearchIcon from '@mui/icons-material/Search';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
const UserData = () => {
  const [users, setUsers] = useState([]);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectAll, setSelectAll] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const limit = 10;
  const [searchText, setSearchText] = useState('');
  const [userIdToDelete, setUserIdToDelete] = useState(null);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [currentData, setCurrentData] = useState({});
  const dropdownRef = useRef(null);
  const [statusFilter, setStatusFilter] = useState('');
  const [open, setOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const handleButtonClick = () => {
    setIsDropdownVisible(prevState => !prevState);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownVisible(false);
    }
  };
  const handleCloseModal = () => {
    setShowModal(prev => !prev);
    setEditModal(false)
    setCurrentData({})
  };

  const handleOpenModal = (country) => {
    setCurrentData(country);
    setEditModal(true)
    setShowModal(true);
  };


  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  useEffect(() => {
    fetchUsers();
  }, [page, limit]);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/collections/user?page=${page}&limit=${limit}`);
      setUsers(response.data.users);
      setTotalPages(response.data.totalPages);
      setSelectedUsers(new Array(response.data.users.length).fill(false));
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handlePreviousPage = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleNextPage = () => {
    if (page < totalPages) setPage(page + 1);
  };

  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    setSelectedUsers(new Array(users.length).fill(!selectAll));
  };

  const handleSelectUser = (index) => {
    const newSelectedUsers = [...selectedUsers];
    newSelectedUsers[index] = !newSelectedUsers[index];
    setSelectedUsers(newSelectedUsers);
    setSelectAll(newSelectedUsers.every(Boolean));
  };

  const formatDate = (date) => {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const handleDeleteUser = async (userId) => {
    try {
      await axios.delete(`http://localhost:5000/collections/user/${userId}`);
      setUsers(users.filter(user => user._id !== userId));
      setShowModal(false);
      toast.success('User deleted successfully');
    } catch (error) {
      console.error('Error deleting user:', error);
      toast.error('Failed to delete user');
    }
  };
  const handleSearch = async () => {
    if (!searchText && !statusFilter) {
      toast.error('Please enter something to search or select a status filter.');
      return;
    }

    try {
      let url = 'http://localhost:5000/collections/search';

      const params = {};

      if (searchText) {
        params.q = searchText;
      }

      if (statusFilter) {
        params.status = statusFilter;
      }

      const response = await axios.get(url, { params });

      // Assuming response.data is an array of users and totalPages is also fetched
      setUsers(response.data);
      setTotalPages(response.totalPages);
      toast.success('Users fetched successfully.');
      console.log('Users fetched:', response.data); // Check fetched data in console
    } catch (error) {
      console.error('Error searching users:', error);
      toast.error('Error searching. Please try again later.'); // Replace with toast or error handling
    }
  };

  const handleStatusChange = (selectedStatus) => {
    setStatusFilter(selectedStatus);
    // Optionally trigger search immediately on status change
    // fetchData();
  };
  const toggleModal = (userId) => {
    setUserIdToDelete(userId);
    setShowModal(!showModal);
  };

  const handleFormData = (name, value) => {

    setCurrentData(prev => {
      return {
        ...prev, [name]: value
      }
    })
  }
  const handleSubmit = (id) => {
    if (editModal && id) {
      handleEditData(id)
    }
    else {
      handleAddData()
    }
  }
 
  const handleAddData = () => {
    axios.post(`${process.env.REACT_APP_BASE_URL}/collections/user`, currentData)
      .then((res) => {
        fetchUsers()
      }).catch((error) => { console.log(error) })
  }
  const handleEditData = (id) => {
    axios.patch(`${process.env.REACT_APP_BASE_URL}/collections/user/${id}`, currentData)
      .then((res) => {
        fetchUsers()
      }).catch((error) => { console.log(error) })
  }

 
  return (
    <>

      <div className='py-2 flex items-center justify-between gap-5'>


        <Input
          className="w-full"
          size="sm"
          placeholder="Search"
          startDecorator={<SearchIcon />}
          sx={{ flexGrow: 1 }}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <button
          onClick={handleSearch}
          className='border p-1 h-8 px-3 rounded-md hover:bg-blue-500 flex items-center bg-blue-700 text-white font-semibold'
        >
          Search
        </button>

        <div className='hidden lg:block'>

          <div className='flex items-center gap-5 w-full justify-between  '>


            <FormControl size="sm" className="w-full">
              <Select
                size="sm"
                placeholder="Filter by status"
                slotProps={{ button: { sx: { whiteSpace: 'nowrap' } } }}
                value={statusFilter}
                onChange={(e) => handleStatusChange(e.target.value)}
              >
                <Option value="">All</Option>
                <Option value="Active">Active</Option>
                <Option value="Deactive">Deactive</Option>
              </Select>
            </FormControl>
            <FormControl size="sm" className="w-full">
              <Select size="sm" placeholder="All">
                <Option value="all">All</Option>
                <Option value="refund">Refund</Option>
                <Option value="purchase">Purchase</Option>
                <Option value="debit">Debit</Option>
              </Select>
            </FormControl>
            <FormControl size="sm" className="w-full">
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
          </div>
        </div>
        <div className='lg:hidden'>

          <IconButton
            size="sm"
            variant="outlined"
            color="neutral"
            onClick={() => setOpen(true)}
          >
            <FilterAltIcon />
          </IconButton>
          <Modal className="lg:hidden" open={open} onClose={() => setOpen(false)}>
            <ModalDialog aria-labelledby="filter-modal" layout="fullscreen">
              <ModalClose />
              <Typography id="filter-modal" level="h2">
                Filters
              </Typography>
              <Divider sx={{ my: 2 }} />
              <Sheet sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <FormControl size="sm" className="w-full">
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
                <FormControl size="sm" className="w-full">
                  <Select size="sm" placeholder="All">
                    <Option value="all">All</Option>
                    <Option value="refund">Refund</Option>
                    <Option value="purchase">Purchase</Option>
                    <Option value="debit">Debit</Option>
                  </Select>
                </FormControl>
                <FormControl size="sm" className="w-full">
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
                <Button color="primary" onClick={() => setOpen(false)}>
                  Submit
                </Button>
              </Sheet>
            </ModalDialog>
          </Modal>
        </div>

      </div>
      <div className="border bg-card text-card-foreground shadow-sm  w-full">
      

        <div className="">
          <div className="relative w-full overflow-x-auto">
            <table className="w-full min-w-max caption-bottom text-sm">
              <thead className="[&amp;_tr]:border-b bg-blue-700">
                <tr className="border-b transition-colors text-white hover:bg-muted/50 data-[state=selected]:bg-muted">
                  <th scope="col" className="p-4">
                    <div className="flex items-center">
                      <input
                        id="checkbox-all-search"
                        type="checkbox"
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded"
                        checked={selectAll}
                        onChange={handleSelectAll}
                      />
                      <label htmlFor="checkbox-all-search" className="sr-only">checkbox</label>
                    </div>
                  </th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Employee ID</th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">First Name</th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Last Name</th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Email</th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Mobile</th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Branch</th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Login Expiry Date</th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Status</th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Country</th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">State/Region</th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">City</th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Created At</th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Updated At</th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Department</th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Password</th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Skills</th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Device ID</th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Manager Email</th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Device Registered Date</th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Action</th>
                </tr>
              </thead>
              <tbody className="[&amp;_tr:last-child]:border-0  ">
                {users.length > 0 ? (
                  users.map((user, index) => (
                    <tr key={index} className="border-b transition-colors  data-[state=selected]:bg-muted">
                      <th scope="col" className="p-4">
                        <div className="flex items-center">
                          <input
                            id={`checkbox-${index}`}
                            type="checkbox"
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded"
                            checked={selectedUsers[index]}
                            onChange={() => handleSelectUser(index)}
                          />
                          <label htmlFor={`checkbox-${index}`} className="sr-only">checkbox</label>
                        </div>
                      </th>
                      <td className="p-4 align-middle whitespace-nowrap">{user.employeeid}</td>
                      <td className="p-4 align-middle whitespace-nowrap">{user.firstname}</td>
                      <td className="p-4 align-middle whitespace-nowrap">{user.lastname}</td>
                      <td className="p-4 align-middle whitespace-nowrap">{user.email}</td>
                      <td className="p-4 align-middle whitespace-nowrap">{user.mobilenumber}</td>
                      <td className="p-4 align-middle whitespace-nowrap">{user.branch}</td>
                      <td className="p-4 align-middle whitespace-nowrap">{formatDate(user.loginexpirydate)}</td>
                      <td className="p-4 align-middle whitespace-nowrap">{user.status}</td>
                      <td className="p-4 align-middle whitespace-nowrap">{user.country}</td>
                      <td className="p-4 align-middle whitespace-nowrap">{user.state}</td>
                      <td className="p-4 align-middle whitespace-nowrap">{user.city}</td>
                      <td className="p-4 align-middle whitespace-nowrap">{formatDate(user.createdAt)}</td>
                      <td className="p-4 align-middle whitespace-nowrap">{formatDate(user.modifiedAt)}</td>
                      <td className="p-4 align-middle whitespace-nowrap">{user.department}</td>
                      <td className="p-4 align-middle whitespace-nowrap">{user.password}</td>
                      <td className="p-4 align-middle whitespace-nowrap">{user.skills}</td>
                      <td className="p-4 align-middle whitespace-nowrap">{user.deviceid}</td>
                      <td className="p-4 align-middle whitespace-nowrap">{user.manageremail}</td>
                      <td className="p-4 align-middle whitespace-nowrap">{formatDate(user.deviceregistereddate)}</td>
                      <td className="p-4 align-middle whitespace-nowrap">
                        <div className='flex gap-4 '>
                          <button  onClick={() => { handleOpenModal(user) }} className="border p-[7px] bg-blue-700 text-white rounded cursor-pointer hover:bg-blue-500">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                              <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                              <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z" />
                            </svg>
                          </button>
                          <button onClick={() => toggleModal(user._id)} className="border p-[7px] bg-blue-700 text-white rounded cursor-pointer hover:bg-blue-500">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash3-fill" viewBox="0 0 16 16">
                              <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5" />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="21" className="p-4 font-bold">No data available</td>
                  </tr>
                )}

              </tbody>
            </table>
          </div>
          {showModal && (
            <div
              id="default-modal"
              tabIndex="-1"
              aria-hidden="true"
              className="fixed inset-0 z-50 flex items-center justify-center w-[full] h-full bg-black bg-opacity-50"
            >
              <div className="relative p-4  w-[400px]">
                <div className="relative bg-white rounded-lg shadow ">
                  <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t ">
                    <div>
                      <h1 class="text-3xl font-bold text-gray-900 ">
                        Delete User
                      </h1>

                    </div>
                    <button
                      type="button"
                      className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center "
                      onClick={() => setShowModal(false)}
                    >
                      <svg
                        className="w-3 h-3"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 14 14"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M1 1l6 6m0 0l6 6M7 7l6-6M7 7l-6 6"
                        />
                      </svg>
                      <span className="sr-only">Close modal</span>
                    </button>
                  </div>
                  <div class="w-full  mx-auto py-5 px-4 sm:px-6 lg:px-8 overflow-y-auto  sm:max-h-screen">
                    <div class="space-y-6">


                      <div className='text-center font-bold'>
                        Are You Sure You Want Delete?
                      </div>
                      <div className='flex gap-11 justify-center'>

                        <div onClick={() => setShowModal(false)} class="flex justify-end">
                          <button

                            class="inline-flex justify-center py-2 px-4 border  shadow-sm text-sm font-medium rounded-md text-black   focus:outline-none focus:ring-2 focus:ring-offset-2 "
                          >
                            Cancel
                          </button>
                        </div>
                        <div class="">
                          <button
                            onClick={() => handleDeleteUser(userIdToDelete)}
                            class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 "
                          >
                            Delete
                          </button>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="Pagination-laptopUp" style={{ display: 'flex', justifyContent: 'space-between', padding: '16px' }}>
          <button
            className='border rounded p-1 cursor-pointer w-[100px] hover:bg-gray-300 px-2 bg-gray-100 font-semibold'
            onClick={handlePreviousPage}
            disabled={page === 1}
          >
            Previous
          </button>
          <div style={{ display: 'flex', gap: '8px' }}>
            {Array.from({ length: totalPages }, (_, index) => index + 1).map(p => (
              <button
                className={`border px-3 rounded ${p === page ? 'bg-blue-700 text-white' : ''}`}
                key={p}
                onClick={() => setPage(p)}
                disabled={p === page}
              >
                {p}
              </button>
            ))}
          </div>
          <button
            className='border rounded p-1 cursor-pointer hover:bg-blue-500 px-2 bg-blue-700 w-[100px] text-white font-semibold'
            onClick={handleNextPage}
            disabled={page === totalPages}
          >
            Next
          </button>
        </div>
      </div>
      {/* <Modal
      open={showModal}
      onClose={handleCloseModal}
      className=""
      size="lg"
    >

      <ModalDialog size='lg' className="p-2 " >

        <div className="flex items-start justify-between p-2 border-b border-solid border-blueGray-200 rounded-t">
          <h3 className="text-3xl font-semibold">
            {editModal ? (
              "Update "
            ) : (
              "Create "
            )}
          </h3>

        </div>

        <form onSubmit={(e) => {
          e.preventDefault();
          handleCloseModal();
        }} className="">
          <div className="relative  border-b border-solid border-blueGray-200 p-3 flex-auto max-h-[400px] overflow-y-auto">



            <div class="grid md:grid-cols-2 md:gap-6">
              <div class="relative z-0 w-full mb-5 group">
                <input onChange={(e) => handleFormData('name', e.target.value)} type="text" name="name" id="name" value={currentData?.name} class="block py-2.5 px-0 w-full font-bold text-md text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none :text-white :border-gray-600 :focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                <label class="peer-focus:font-medium absolute text-sm text-gray-500 :text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus::text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Country Name</label>
              </div>
              <div>
                <Select variant='soft' defaultValue={currentData?.status || ""} onChange={(e, value) => handleFormData('status', value)}>
                  <Option value="">Select Status</Option>
                  <Option value="Active">Active</Option>
                  <Option value="Pending">Pending</Option>
                  <Option value="Inactive">Inactive</Option>
                </Select>
              </div>
             
            </div>
            <div>
                <Select variant='soft' defaultValue={currentData?.country || ""} onChange={(e, value) => handleFormData('country', value)}>
                  <Option value="">Select Country</Option>
                  {
                    users?.map((user) => (
                      <Option value={user?.name}>{user?.name}</Option>
                    ))
                  }
                
                </Select>
              </div>


          </div>
          <div className="flex items-center justify-end mt-3 rounded-b">

            <button onClick={() => handleCloseModal()} type="button" class="text-white bg-gradient-to-r from-red-300 via-red-500 to-red-600 hover:bg-gradient-to-br  focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Close</button>

            <button onClick={() => handleSubmit(currentData?._id)} type="submit" className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br  focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Save Country</button>
          </div>
        </form>

      </ModalDialog>
    </Modal> */}
    </>
  );
};

export default UserData;
