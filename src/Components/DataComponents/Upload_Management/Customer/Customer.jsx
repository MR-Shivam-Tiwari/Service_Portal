import React, { useEffect, useState } from 'react';

import FormControl from '@mui/joy/FormControl';

import Input from '@mui/joy/Input';


import SearchIcon from '@mui/icons-material/Search';

import { Modal, ModalDialog, Option, Select } from '@mui/joy';
import Swal from 'sweetalert2';
import axios from 'axios';
import moment from 'moment';

function Customer() {
  const [showModal, setShowModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [data, setData] = useState([]);
  const [currentData, setCurrentData] = useState({});
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectAll, setSelectAll] = useState(false);
  const [loader, setLoader] = useState(true);
  const limit = 10;

  const [cityList, setCityList] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);

  const getCities = () => {
    axios.get(`${process.env.REACT_APP_BASE_URL}/collections/city`)
      .then((res) => {
        setCityList(res.data.city);
      })
      .catch((err) => console.log(err))
  };

  useEffect(() => {
    getCities();
  }, [])


  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    if (!selectAll) {
      // Select all rows
      setSelectedRows(data?.map((country) => country._id));
    } else {
      // Deselect all rows
      setSelectedRows([]);
    }
  };

  const handleRowSelect = (countryId) => {
    if (selectedRows.includes(countryId)) {
      // Deselect the row
      setSelectedRows(selectedRows.filter((id) => id !== countryId));
    } else {
      // Select the row
      setSelectedRows([...selectedRows, countryId]);
    }
  };

  const hanleCloseModal = () => {
    setShowModal(prev => !prev);
    setEditModal(false)
    setCurrentData({})
  };

  const handleOpenModal = (country) => {
    setCurrentData(country);
    setEditModal(true)
    setShowModal(true);
  };

  const handleFormData = (name, value) => {

    setCurrentData(prev => {
      return {
        ...prev, [name]: value
      }
    })
  }

  const handleDelete = (id) => {
    Swal.fire({
      title: "Delete Permanently?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`${process.env.REACT_APP_BASE_URL}/collections/customer/${id}`)
          .then((res) => {
            Swal.fire(
              "Deleted!",
              "Countrys has been deleted.",
              "success"
            )
          }).then((res) => {
            getData()
          }).catch((error) => { console.log(error) })

      }
    })
  }

  const getData = () => {
    setLoader(true)
    axios.get(`${process.env.REACT_APP_BASE_URL}/collections/customer?page=${page}&limit=${limit}`)
      .then((res) => {
        setLoader(false)
        setData(res.data.customers)
        setTotalPages(res.data.totalPages)
      }).catch((error) => { 
        setLoader(false)
        console.log(error) 
      })
  }
  useEffect(() => {
    getData()
  }, [])

  useEffect(() => {
    getData()
  }, [page])

  const handleSubmit = (id) => {
    if (editModal && id) {
      handleEditCountry(id)
    }
    else {
      handleCreate()
    }
  }

  const handleCreate = () => {
    axios.post(`${process.env.REACT_APP_BASE_URL}/collections/customer`, currentData)
      .then((res) => {
        getData()
      }).catch((error) => { console.log(error) })
  }

  const handleEditCountry = (id) => {
    axios.put(`${process.env.REACT_APP_BASE_URL}/collections/customer/${id}`, currentData)
      .then((res) => {
        getData()
      }).catch((error) => { console.log(error) })
  }

  const handlePreviousPage = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleNextPage = () => {
    if (page < totalPages) setPage(page + 1);
  };
  return (
    <>

      {
        loader?
        <div className='flex items-center justify-center h-[60vh]'>


        <span class="CustomLoader"></span>
      </div>

        :
        <>
        <div
        className="flex items-center justify-between gap-3"

      >
        <div className='flex gap-3 justify-center'>
          <FormControl sx={{ flex: 1 }} size="sm" >
            <Input size="sm" placeholder="Search" startDecorator={<SearchIcon />} />
          </FormControl>
          <button onClick={hanleCloseModal} type="button" className="text-white w-full col-span-2 px-5 md:col-span-1 bg-blue-700 hover:bg-gradient-to-br  focus:outline-none  font-medium rounded-[3px] text-sm  py-1.5 text-center me-2 mb-2">Search</button>

        </div>
        <div className='flex gap-3'>


          <button onClick={hanleCloseModal} type="button" className="text-white w-full col-span-2 px-5 md:col-span-1 bg-blue-700 hover:bg-gradient-to-br  focus:outline-none  font-medium rounded-[3px] text-sm  py-1.5 text-center  mb-2">Create</button>
          <button type="button" className="text-white w-full col-span-2 px-5 md:col-span-1 bg-blue-700 hover:bg-gradient-to-br  focus:outline-none  font-medium rounded-[3px] text-sm  py-1.5 text-center  mb-2">Filter</button>
        </div>

      </div>
      {
        selectedRows?.length > 0 && <div className='flex justify-center'>
          <button type="button" class="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 :focus:ring-red-800 font-medium rounded-[4px] text-sm px-5 py-2.5 text-center me-2 mb-2">Delete Selected</button>
        </div>
      }
      <div className="relative w-full overflow-x-auto">

        <table className="w-full  min-w-max caption-bottom text-sm">
          <thead className="[&amp;_tr]:border-b bg-blue-700 ">
            <tr className="border-b transition-colors  text-white hover:bg-muted/50 data-[state=selected]:bg-muted">
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
              <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Customer Code (ID)</th>
              <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Customer Name</th>
              <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Hospital Name</th>
              <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Street</th>
              <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">City</th>
              <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">PostalCode</th>
              <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">District</th>
              <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Region</th>
              <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Country</th>
              <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Telephone</th>
              <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Tax Number1</th>
              <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Tax Number2</th>
              <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Email</th>
              <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Status</th>
              <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Customer Type</th>
              <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Created Date</th>
              <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Modified  Date</th>
              <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Action</th>

            </tr>
          </thead>
          <tbody className="[&amp;_tr:last-child]:border-0  ">
            {data?.map((item, index) => (
              <tr key={item?._id} className="border-b transition-colors  data-[state=selected]:bg-muted">
                <th scope="col" className="p-4">
                  <div className="flex items-center">
                    <input
                      id={`checkbox-${index}`}
                      type="checkbox"
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded"
                      checked={selectedRows?.includes(item?._id)}
                      onChange={() => handleRowSelect(item?._id)}
                    />
                    <label htmlFor={`checkbox-${index}`} className="sr-only">
                      checkbox
                    </label>
                  </div>
                </th>
                <td className="p-4 font- text-md capitalize align-middle whitespace-nowrap">{item?.customercodeid}</td>
                <td className="p-4 font- text-md capitalize align-middle whitespace-nowrap">{item?.customername}</td>
                <td className="p-4 font- text-md capitalize align-middle whitespace-nowrap">{item?.hospitalname}</td>
                <td className="p-4 font- text-md capitalize align-middle whitespace-nowrap">{item?.street}</td>
                <td className="p-4 font- text-md capitalize align-middle whitespace-nowrap">{item?.city}</td>
                <td className="p-4 font- text-md capitalize align-middle whitespace-nowrap">{item?.postalcode}</td>
                <td className="p-4 font- text-md capitalize align-middle whitespace-nowrap">{item?.district}</td>
                <td className="p-4 font- text-md capitalize align-middle whitespace-nowrap">{item?.region}</td>
                <td className="p-4 font- text-md capitalize align-middle whitespace-nowrap">{item?.country}</td>
                <td className="p-4 font- text-md capitalize align-middle whitespace-nowrap">{item?.telephone}</td>
                <td className="p-4 font- text-md capitalize align-middle whitespace-nowrap">{item?.taxnumber1}</td>
                <td className="p-4 font- text-md capitalize align-middle whitespace-nowrap">{item?.taxnumber2}</td>
                <td className="p-4 font- text-md capitalize align-middle whitespace-nowrap">{item?.email}</td>

                <td className="p-4 font- text-md capitalize align-middle whitespace-nowrap">
                  <span
                    className={`text-xs font-medium px-2.5 py-0.5 rounded border ${item?.status === "Active"
                      ? "bg-green-100 text-green-800 border-green-400"
                      : item?.status === "Inactive"
                        ? "bg-red-100 text-red-800  border-red-400"
                        : "bg-orange-100 text-orange-800  border-orange-400"
                      }`}
                  >
                    {item?.status}
                  </span>
                </td>
                <td className="p-4 font- text-md capitalize align-middle whitespace-nowrap">{item?.customertype}</td>

                <td className="p-4 align-middle whitespace-nowrap">{moment(item?.createdAt).format('MMM D, YYYY')}</td>
                <td className="p-4 align-middle whitespace-nowrap">{moment(item?.modifiedAt).format('MMM D, YYYY')}</td>


                <td className="p-4 align-middle whitespace-nowrap">
                  <div className='flex gap-4 '>
                    <button onClick={() => { handleOpenModal(item) }} className="border p-[7px] bg-blue-700 text-white rounded cursor-pointer hover:bg-blue-500">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                        <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z" />
                      </svg>
                    </button>
                    <button onClick={() => handleDelete(item?._id)} className="border p-[7px] bg-blue-700 text-white rounded cursor-pointer hover:bg-blue-500">
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
      <div className="Pagination-laptopUp" style={{ display: 'flex', justifyContent: 'space-between', padding: '16px' }}>
        <button
            className={`border  rounded p-1 ${page === 1 ? 'cursor-not-allowed' : 'cursor-pointer'}   w-[100px] hover:bg-gray-300 px-2 bg-gray-100 font-semibold`}
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

      <Modal
        open={showModal}
        onClose={hanleCloseModal}
        className="z-[1] thin-scroll"
        size="lg"
      >

        <ModalDialog size='lg' className="p-2  thin-scroll" >

          <div className="flex items-start justify-between p-2 border-b px-5 border-solid border-blueGray-200 rounded-t thin-scroll">
            <h3 className="text-2xl font-semibold">
              {editModal ? (
                "Update"
              ) : (
                "Create"
              )}
            </h3>
            <div onClick={() => hanleCloseModal()} className=" border p-2 rounded-[4px] hover:bg-gray-200 cursor-pointer ">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-x-lg font-semibold "  viewBox="0 0 16 16" >
                <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
              </svg>
            </div>

          </div>

          <form onSubmit={(e) => {
            e.preventDefault();
            hanleCloseModal();
          }} className="thin-scroll">

            <div className=" w-[300px] md:w-[500px] lg:w-[700px] border-b border-solid border-blueGray-200 p-3 flex-auto max-h-[400px] overflow-y-auto">


              <div class="grid md:grid-cols-2 md:gap-6 w-full">


                <div className='relative  w-full mb-5 group'>
                  <label class="block mb-2 text-sm font-medium text-gray-900 ">Customer Code (ID)</label>
                  <input type="text" required  onChange={(e) => handleFormData('customercodeid', e.target.value)} id="name" value={currentData?.customercodeid} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-[4px] focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />

                </div><div className='relative  w-full mb-5 group'>
                  <label class="block mb-2 text-sm font-medium text-gray-900 ">Customer Name		</label>
                  <input type="text" onChange={(e) => handleFormData('customername', e.target.value)} id="name" value={currentData?.customername} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-[4px] focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />

                </div><div className='relative  w-full mb-5 group'>
                  <label class="block mb-2 text-sm font-medium text-gray-900 ">Hospital Name		</label>
                  <input type="text" onChange={(e) => handleFormData('hospitalname', e.target.value)} id="name" value={currentData?.hospitalname} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-[4px] focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />

                </div>
                <div className='relative  w-full mb-5 group'>
                  <label class="block mb-2 text-sm font-medium text-gray-900 ">Street	</label>
                  <input type="text" onChange={(e) => handleFormData('street', e.target.value)} id="name" value={currentData?.street} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-[4px] focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />

                </div>

                <div className='relative  w-full mb-5 group'>
                  <label class="block mb-2  text-sm font-medium text-gray-900 ">City	</label>
                  <Select variant='soft' className='rounded-[4px] py-2 border' defaultValue={currentData?.city || ""} onChange={(e, value) => handleFormData('city', value)}>
                    <Option value="">Select</Option>
                    {
                      cityList.map((item) => <Option value={item?.name}>{item?.name}</Option>)
                    }

                  </Select>
                </div><div className='relative  w-full mb-5 group'>
                  <label class="block mb-2 text-sm font-medium text-gray-900 ">Postal Code	</label>
                  <input type="text" onChange={(e) => handleFormData('postalcode', e.target.value)} id="name" value={currentData?.postalcode} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-[4px] focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />

                </div><div className='relative  w-full mb-5 group'>
                  <label class="block mb-2 text-sm font-medium text-gray-900 ">District	</label>
                  <input type="text" onChange={(e) => handleFormData('district', e.target.value)} id="name" value={currentData?.district} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-[4px] focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />

                </div>
                <div className='relative  w-full mb-5 group'>
                  <label class="block mb-2 text-sm font-medium text-gray-900 ">Region	</label>
                  <input type="text" onChange={(e) => handleFormData('district', e.target.value)} id="name" value={currentData?.district} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-[4px] focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />

                </div>
                <div className='relative  w-full mb-5 group'>
                  <label class="block mb-2 text-sm font-medium text-gray-900 ">Country	</label>
                  <input type="text" onChange={(e) => handleFormData('district', e.target.value)} id="name" value={currentData?.district} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-[4px] focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />

                </div>
                <div className='relative  w-full mb-5 group'>
                  <label class="block mb-2 text-sm font-medium text-gray-900 ">Telephone	</label>
                  <input type="text" onChange={(e) => handleFormData('district', e.target.value)} id="name" value={currentData?.district} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-[4px] focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />

                </div>
                <div className='relative  w-full mb-5 group'>
                  <label class="block mb-2 text-sm font-medium text-gray-900 ">Tax Number1		</label>
                  <input type="text" onChange={(e) => handleFormData('district', e.target.value)} id="name" value={currentData?.district} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-[4px] focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />

                </div>
                <div className='relative  w-full mb-5 group'>
                  <label class="block mb-2 text-sm font-medium text-gray-900 ">Tax Number2		</label>
                  <input type="text" onChange={(e) => handleFormData('district', e.target.value)} id="name" value={currentData?.district} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-[4px] focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />

                </div>
                <div className='relative  w-full mb-5 group'>
                  <label class="block mb-2 text-sm font-medium text-gray-900 ">Email		</label>
                  <input type="text" onChange={(e) => handleFormData('district', e.target.value)} id="name" value={currentData?.district} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-[4px] focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />

                </div>
                <div>
                  <label class="block mb-2 text-sm font-medium text-gray-900 ">Status</label>

                  <Select variant='soft' className='rounded-[4px] py-2 border' defaultValue={currentData?.status || ""} onChange={(e, value) => handleFormData('status', value)}>
                    <Option value="">Select Status</Option>
                    <Option value="Active">Active</Option>
                    <Option value="Pending">Pending</Option>
                    <Option value="Inactive">Inactive</Option>
                  </Select>
                </div>
                <div className='relative  w-full mb-5 group'>
                  <label class="block mb-2 text-sm font-medium text-gray-900 ">Customer Type			</label>
                  <input type="text" onChange={(e) => handleFormData('district', e.target.value)} id="name" value={currentData?.district} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-[4px] focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />

                </div>

              </div>


            </div>
            <div className="flex items-center gap-3 justify-end mt-3 rounded-b">

              <button onClick={() => hanleCloseModal()} type="button" class=" focus:outline-none border h-8  shadow text-black flex items-center hover:bg-gray-200  font-medium rounded-[4px] text-sm px-5 py-2.5    me-2 mb-2">Close</button>

              <button onClick={() => handleSubmit(currentData?._id)} type="submit" className="text-white bg-blue-700 h-8 hover:bg-blue-800 focus:ring-4  flex items-center px-8 focus:ring-blue-300 font-medium rounded-[4px] text-sm  py-2.5 me-2 mb-2 :bg-blue-600 :hover:bg-blue-700 focus:outline-none :focus:ring-blue-800 me-2 mb-2">Save</button>
            </div>
          </form>

        </ModalDialog>
      </Modal>
        </>
      }
    </>
  )
}

export default Customer
