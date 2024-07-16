import React, { useEffect, useState } from 'react';

import FormControl from '@mui/joy/FormControl';

import Input from '@mui/joy/Input';


import SearchIcon from '@mui/icons-material/Search';

import { Modal, ModalDialog, Option, Select } from '@mui/joy';
import Swal from 'sweetalert2';
import axios from 'axios';
import moment from 'moment';

function AmcContract() {
  const [showModal, setShowModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [data, setData] = useState([]);
  const [currentData, setCurrentData] = useState({});
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectAll, setSelectAll] = useState(false);
  const limit = 10;

  const [selectedRows, setSelectedRows] = useState([]);

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

  const handleClose = () => {
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
        axios.delete(`${process.env.REACT_APP_BASE_URL}/collections/amccontracts/${id}`)
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
    axios.get(`${process.env.REACT_APP_BASE_URL}/collections/amccontracts?page=${page}&limit=${limit}`)
      .then((res) => {
        setData(res.data.amcContracts)
        setTotalPages(res.data.totalPages)
      }).catch((error) => { console.log(error) })
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
      hanleAddData()
    }
  }

  const hanleAddData = () => {
    axios.post(`${process.env.REACT_APP_BASE_URL}/collections/amccontracts`, currentData)
      .then((res) => {
        getData()
      }).catch((error) => { console.log(error) })
  }

  const handleEditCountry = (id) => {
    axios.put(`${process.env.REACT_APP_BASE_URL}/collections/amccontracts/${id}`, currentData)
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

      <div
        className="grid grid-cols-5 gap-3"

      >
        <div className='col-span-3 md:col-span-4'>
          <FormControl sx={{ flex: 1 }} size="sm" >
            <Input size="sm" placeholder="Search" startDecorator={<SearchIcon />} />
          </FormControl>
        </div>

        <button onClick={handleClose} type="button" className="text-white col-span-2 md:col-span-1 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br  focus:outline-none  font-medium rounded-lg text-sm px-5 py-1.5 text-center me-2 mb-2">Create</button>

      </div>
      {
        selectedRows?.length > 0 && <div className='flex justify-center'>
          <button type="button" class="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 :focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Delete Selected</button>
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
              <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Sales Doc</th>
              <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Start Date</th>
              <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">End Date</th>
              <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Sa type(ZDRC/ZDRN)</th>
              <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Serial Number</th>
              <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Material Code</th>
              <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Status</th>
              <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Created Date</th>
              <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Modified  Date</th>
              <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Action</th>

            </tr>
          </thead>
          <tbody className="[&amp;_tr:last-child]:border-0  ">
            {data?.map((country, index) => (
              <tr key={country?._id} className="border-b transition-colors  data-[state=selected]:bg-muted">
                <th scope="col" className="p-4">
                  <div className="flex items-center">
                    <input
                      id={`checkbox-${index}`}
                      type="checkbox"
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded"
                      checked={selectedRows?.includes(country?._id)}
                      onChange={() => handleRowSelect(country?._id)}
                    />
                    <label htmlFor={`checkbox-${index}`} className="sr-only">
                      checkbox
                    </label>
                  </div>
                </th>
                <td className="p-4 font- text-md capitalize align-middle whitespace-nowrap">{country?.salesdoc}</td>
                <td className="p-4 font- text-md capitalize align-middle whitespace-nowrap">{moment(country?.startdate).format("DD-MM-YYYY")}</td>
                <td className="p-4 font- text-md capitalize align-middle whitespace-nowrap">{moment(country?.enddate).format("DD-MM-YYYY")}</td>
                <td className="p-4 font- text-md capitalize align-middle whitespace-nowrap">{country?.satypeZDRC_ZDRN}</td>
                <td className="p-4 font- text-md capitalize align-middle whitespace-nowrap">{country?.serialnumber}</td>
                <td className="p-4 font- text-md capitalize align-middle whitespace-nowrap">{country?.materialcode}</td>

                <td className="p-4 font- text-md capitalize align-middle whitespace-nowrap">
                  <span
                    className={`text-xs font-medium px-2.5 py-0.5 rounded border ${country?.status === "Active"
                      ? "bg-green-100 text-green-800 border-green-400"
                      : country?.status === "Inactive"
                        ? "bg-red-100 text-red-800  border-red-400"
                        : "bg-orange-100 text-orange-800  border-orange-400"
                      }`}
                  >
                    {country?.status}
                  </span>
                </td>
                <td className="p-4 align-middle whitespace-nowrap">{moment(country?.createdAt).format('MMMM D, YYYY')}</td>
                <td className="p-4 align-middle whitespace-nowrap">{moment(country?.modifiedAt).format('MMMM D, YYYY')}</td>


                <td className="p-4 align-middle whitespace-nowrap">
                  <div className='flex gap-4 '>
                    <button onClick={() => { handleOpenModal(country) }} className="border p-[7px] bg-blue-700 text-white rounded cursor-pointer hover:bg-blue-500">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                        <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z" />
                      </svg>
                    </button>
                    <button onClick={() => handleDelete(country?._id)} className="border p-[7px] bg-blue-700 text-white rounded cursor-pointer hover:bg-blue-500">
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

      <Modal
        open={showModal}
        onClose={handleClose}
        className="z-[1]"
        size="lg"
      >

        <ModalDialog size='lg' className="p-2 " >

          <div className="flex items-start justify-between p-2 border-b border-solid border-blueGray-200 rounded-t">
            <h3 className="text-2xl font-semibold">
              {editModal ? (
                "Update Country"
              ) : (
                "Create"
              )}
            </h3>

          </div>

          <form onSubmit={(e) => {
            e.preventDefault();
            handleClose();
          }} className="">
            <div className=" w-[300px] md:w-[500px] lg:w-[700px] border-b border-solid border-blueGray-200 p-3 flex-auto max-h-[400px] overflow-y-auto">



              <div class="grid md:grid-cols-2 md:gap-6 w-full">


                <div className='relative  w-full mb-5 group'>
                  <label class="block mb-2 text-sm font-medium text-gray-900 ">Sales Docs</label>
                  <input type="text" onChange={(e) => handleFormData('salesdoc', e.target.value)}  id="name" value={currentData?.salesdoc} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " />

                </div><div className='relative  w-full mb-5 group'>
                  <label class="block mb-2 text-sm font-medium text-gray-900 ">Start Date	</label>
                  <input type="date" onChange={(e) => handleFormData('startdate', e.target.value)}  id="name" value={currentData?.startdate ? currentData?.startdate?.slice(0, 10) : ''} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5g-gray-700order-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500" />

                </div><div className='relative  w-full mb-5 group'>
                  <label class="block mb-2 text-sm font-medium text-gray-900 ">End Date	</label>
                  <input type="date" onChange={(e) => handleFormData('enddate', e.target.value)}  id="name" value={currentData?.enddate ? currentData?.enddate?.slice(0, 10) : ''} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5g-gray-700order-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500" />

                </div><div className='relative  w-full mb-5 group'>
                  <label class="block mb-3 text-sm font-medium text-gray-900 ">Sa type(ZDRC/ZDRN)	</label>
                  <Select variant='soft' className='' defaultValue={currentData?.satypeZDRC_ZDRN || ""} onChange={(e, value) => handleFormData('satypeZDRC_ZDRN', value)}>
                    <Option value="">Select</Option>
                    <Option value="ZDRC">ZDRC</Option>
                    <Option value="ZDRN">ZDRN</Option>
                  </Select>
                </div><div className='relative  w-full mb-5 group'>
                  <label class="block mb-2 text-sm font-medium text-gray-900 ">Serial Number	</label>
                  <input type="text" onChange={(e) => handleFormData('serialnumber', e.target.value)}  id="name" value={currentData?.serialnumber} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5g-gray-700order-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500" />

                </div><div className='relative  w-full mb-5 group'>
                  <label class="block mb-2 text-sm font-medium text-gray-900 ">Material Code	</label>
                  <input type="text" onChange={(e) => handleFormData('materialcode', e.target.value)}  id="name" value={currentData?.materialcode} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5g-gray-700order-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500" />

                </div>
                <div>
                  <label class="block mb-2 text-sm font-medium text-gray-900 ">Status</label>

                  <Select variant='soft' className='' defaultValue={currentData?.status || ""} onChange={(e, value) => handleFormData('status', value)}>
                    <Option value="">Select Status</Option>
                    <Option value="Active">Active</Option>
                    <Option value="Pending">Pending</Option>
                    <Option value="Inactive">Inactive</Option>
                  </Select>
                </div>
              </div>


            </div>
            <div className="flex items-center justify-end mt-3 rounded-b">

              <button onClick={() => handleClose()} type="button" class="focus:outline-none text-black  focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2g-red-600 :hover:bg-red-700 :focus:ring-red-900 me-2 mb-2">Close</button>

              <button onClick={() => handleSubmit(currentData?._id)} type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2g-blue-600 :hover:bg-blue-700 focus:outline-none :focus:ring-blue-800 me-2 mb-2">Save Country</button>
            </div>
          </form>

        </ModalDialog>
      </Modal>
    </>
  )
}

export default AmcContract
