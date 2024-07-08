import React, { useEffect, useState } from 'react';
import Button from '@mui/joy/Button';
import Chip from '@mui/joy/Chip';
import Divider from '@mui/joy/Divider';
import FormControl from '@mui/joy/FormControl';
import EditIcon from '@mui/icons-material/Edit';
import Link from '@mui/joy/Link';
import Input from '@mui/joy/Input';
import Backdrop from '@mui/material/Backdrop';
import DeleteIcon from '@mui/icons-material/Delete';
import Table from '@mui/joy/Table';
import Sheet from '@mui/joy/Sheet';
import Checkbox from '@mui/joy/Checkbox';
import Typography from '@mui/joy/Typography';
import MoreVert from '@mui/icons-material/MoreVert';

import SearchIcon from '@mui/icons-material/Search';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import BlockIcon from '@mui/icons-material/Block';
import AutorenewRoundedIcon from '@mui/icons-material/AutorenewRounded';
import { Box, DialogActions, DialogContent, DialogTitle, Dropdown, IconButton, Menu, MenuButton, MenuItem, Modal, ModalClose, ModalDialog, Option, Select } from '@mui/joy';
import Swal from 'sweetalert2';
import axios from 'axios';
import moment from 'moment';



const rows = [
  {
    name: 'India',
    status: 'Active',
    createdAt: '2021-01-15',
    modifiedAt: '2023-05-12',
    id: 1,
  },
  {
    name: 'USA',
    status: 'Inactive',
    createdAt: '2020-03-22',
    modifiedAt: '2023-06-18',
    id: 2,
  },
  {
    name: 'Australia',
    status: 'Active',
    createdAt: '2019-07-08',
    modifiedAt: '2023-04-27',
    id: 3,
  },
  {
    name: 'Pakistan',
    status: 'Pending',
    createdAt: '2022-02-11',
    modifiedAt: '2023-05-09',
    id: 4,
  },
  {
    name: 'England',
    status: 'Active',
    createdAt: '2018-11-30',
    modifiedAt: '2023-05-25',
    id: 5,
  },
  {
    name: 'New Zealand',
    status: 'Inactive',
    createdAt: '2021-06-14',
    modifiedAt: '2023-07-01',
    id: 6,
  },
];


const AdminCountry = () => {


  const [showModal, setShowModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [countrys, setCountries] = useState([]);
  const [currentCountry, setCurrentCountry] = useState({});

  const handleCloseCountryModal = () => {
    setShowModal(prev => !prev);
    setEditModal(false)
    setCurrentCountry({})
  };

  const handleOpenCountryModal = (country) => {
    setCurrentCountry(country);
    setEditModal(true)
    setShowModal(true);
  };

  const handleFormData = (name, value) => {

    setCurrentCountry(prev => {
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
        axios.delete(`${process.env.REACT_APP_BASE_URL}/collections/country/${id}`)
          .then((res) => {
            Swal.fire(
              "Deleted!",
              "Countrys has been deleted.",
              "success"
            )
          }).then((res) => {
            getAllCountries()
          }).catch((error) => { console.log(error) })

      }
    })
  }

  const getAllCountries = () => {
    axios.get(`${process.env.REACT_APP_BASE_URL}/collections/country`)
      .then((res) => {
        setCountries(res.data)
      }).catch((error) => { console.log(error) })
  }
  useEffect(() => {
    getAllCountries()
  }, [])

  const handleSubmit = (id) => {
    if (editModal && id) {
      handleEditCountry(id)
    }
    else {
      handleAddCountry()
    }
  }

  const handleAddCountry = () => {
    axios.post(`${process.env.REACT_APP_BASE_URL}/collections/country`, currentCountry)
      .then((res) => {
        getAllCountries()
      }).catch((error) => { console.log(error) })
  }

  const handleEditCountry = (id) => {
    axios.patch(`${process.env.REACT_APP_BASE_URL}/collections/country/${id}`, currentCountry)
      .then((res) => {
        getAllCountries()
      }).catch((error) => { console.log(error) })
  }


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

        <button onClick={handleCloseCountryModal} type="button" className="text-white col-span-2 md:col-span-1 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br  focus:outline-none  font-medium rounded-lg text-sm px-5 py-1.5 text-center me-2 mb-2">Create Country</button>

      </div>

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
                  // checked={selectAll}
                  // onChange={handleSelectAll}
                  />
                  <label htmlFor="checkbox-all-search" className="sr-only">checkbox</label>
                </div>
              </th>
              <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Name</th>
              <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Status</th>
              <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Created Date</th>
              <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Modified  Date</th>
              <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Action</th>

            </tr>
          </thead>
          <tbody className="[&amp;_tr:last-child]:border-0  ">
            {countrys?.map((country, index) => (
              <tr key={country._id} className="border-b transition-colors  data-[state=selected]:bg-muted">
                <th scope="col" className="p-4">
                  <div className="flex items-center">
                    <input
                      id={`checkbox-${index}`}
                      type="checkbox"
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded"

                    />
                    <label htmlFor={`checkbox-${index}`} className="sr-only">checkbox</label>
                  </div>
                </th>
                <td className="p-4 font-bold text-md capitalize align-middle whitespace-nowrap">{country?.name}</td>
                <td>
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

                <td className="p-4 align-middle whitespace-nowrap " >
                  {/* <Dropdown className="p-1  text-center">
                  <MenuButton className="p-1 ml-2 text-center"><MoreVert/></MenuButton>
                  <Menu>
                    <MenuItem>Add item</MenuItem>
                  </Menu>
                </Dropdown> */}

                  <div className="flex flex-row items-center">
                    <IconButton onClick={() => { handleOpenCountryModal(country) }} >
                      <EditIcon color='success' />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(country?._id)}>
                      <DeleteIcon color='danger' />
                    </IconButton>
                  </div>

                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal
        open={showModal}
        onClose={handleCloseCountryModal}
        className=""
        size="lg"
      >

        <ModalDialog size='lg' className="p-2 " >

          <div className="flex items-start justify-between p-2 border-b border-solid border-blueGray-200 rounded-t">
            <h3 className="text-3xl font-semibold">
              {editModal ? (
                "Update Country"
              ) : (
                "Create Country"
              )}
            </h3>

          </div>

          <form onSubmit={(e) => {
            e.preventDefault();
            handleCloseCountryModal();
          }} className="">
            <div className="relative  border-b border-solid border-blueGray-200 p-3 flex-auto max-h-[400px] overflow-y-auto">



              <div class="grid md:grid-cols-2 md:gap-6">
                <div class="relative z-0 w-full mb-5 group">
                  <input onChange={(e) => handleFormData('name', e.target.value)} type="text" name="name" id="name" value={currentCountry?.name} class="block py-2.5 px-0 w-full font-bold text-md text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none :text-white :border-gray-600 :focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                  <label class="peer-focus:font-medium absolute text-sm text-gray-500 :text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus::text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Country Name</label>
                </div>
                <div>
                  <Select variant='soft' defaultValue={currentCountry?.status || ""} onChange={(e, value) => handleFormData('status', value)}>
                    <Option value="">Select Status</Option>
                    <Option value="Active">Active</Option>
                    <Option value="Pending">Pending</Option>
                    <Option value="Inactive">Inactive</Option>
                  </Select>
                </div>
              </div>


            </div>
            <div className="flex items-center justify-end mt-3 rounded-b">

              <button onClick={() => handleCloseCountryModal()} type="button" class="text-white bg-gradient-to-r from-red-300 via-red-500 to-red-600 hover:bg-gradient-to-br  focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Close</button>

              <button onClick={() => handleSubmit(currentCountry?._id)} type="submit" className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br  focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Save Country</button>
            </div>
          </form>

        </ModalDialog>
      </Modal>
    </>
  )
}

export default AdminCountry