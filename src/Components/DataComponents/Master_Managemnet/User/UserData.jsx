import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

const UserData = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectAll, setSelectAll] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const limit = 10;
  const [showModal, setShowModal] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState(null);

  useEffect(() => {
    fetchUsers(page, limit);
  }, [page, limit]);

  const fetchUsers = async (page, limit) => {
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

  const toggleModal = (userId) => {
    setUserIdToDelete(userId);
    setShowModal(!showModal);
  };
  return (
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
              {users.map((user, index) => (
                <tr key={user._id} className="border-b transition-colors  data-[state=selected]:bg-muted">
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
                      <buton className="border p-[7px] bg-blue-700 text-white rounded cursor-pointer hover:bg-blue-500"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                        <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z" />
                      </svg></buton>
                      <button onClick={() => toggleModal(user._id)} className="border p-[7px] bg-blue-700 text-white rounded cursor-pointer hover:bg-blue-500">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash3-fill" viewBox="0 0 16 16">
                          <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {showModal && (
          <div
            id="default-modal"
            tabIndex="-1"
            aria-hidden="true"
            className="fixed inset-0 z-50 flex items-center justify-center w-full h-full bg-black bg-opacity-50"
          >
            <div className="relative p-4 w-full w-[400px]">
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
          className='border rounded p-1 cursor-pointer hover:bg-gray-300 px-2 bg-gray-100 font-semibold'
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
          className='border rounded p-1 cursor-pointer hover:bg-gray-300 px-2 bg-gray-100 font-semibold'
          onClick={handleNextPage}
          disabled={page === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default UserData;
