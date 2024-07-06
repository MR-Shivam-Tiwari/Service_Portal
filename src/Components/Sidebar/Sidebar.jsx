import React, { useEffect, useState } from 'react';
import GlobalStyles from '@mui/joy/GlobalStyles';
import Avatar from '@mui/joy/Avatar';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import Chip from '@mui/joy/Chip';
import Divider from '@mui/joy/Divider';
import IconButton from '@mui/joy/IconButton';
import Input from '@mui/joy/Input';
import LinearProgress from '@mui/joy/LinearProgress';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListItemButton, { listItemButtonClasses } from '@mui/joy/ListItemButton';
import ListItemContent from '@mui/joy/ListItemContent';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import Stack from '@mui/joy/Stack';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import ShoppingCartRoundedIcon from '@mui/icons-material/ShoppingCartRounded';
import AssignmentRoundedIcon from '@mui/icons-material/AssignmentRounded';
import QuestionAnswerRoundedIcon from '@mui/icons-material/QuestionAnswerRounded';
import GroupRoundedIcon from '@mui/icons-material/GroupRounded';
import SupportRoundedIcon from '@mui/icons-material/SupportRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import BrightnessAutoRoundedIcon from '@mui/icons-material/BrightnessAutoRounded';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import SummarizeIcon from '@mui/icons-material/Summarize';
import ColorSchemeToggle from '../ColorToggle/ColorSchemeToggle';
import { closeSidebar } from './utils';
import { Link, useLocation, useNavigate } from 'react-router-dom';

function Toggler({ defaultExpanded = false, renderToggle, children }) {
    const [open, setOpen] = useState(defaultExpanded);
    return (
        <React.Fragment>
            {renderToggle({ open, setOpen })}
            <Box
                sx={{
                    display: 'grid',
                    gridTemplateRows: open ? '1fr' : '0fr',
                    transition: '0.2s ease',
                    '& > *': {
                        overflow: 'hidden',
                    },
                }}
            >
                {children}
            </Box>
        </React.Fragment>
    );
}

export default function Sidebar({ onSidebarItemClick }) {
    const [currentRouteName, setCurrentRouteName] = useState('');
    const location = useLocation();
    const navigate = useNavigate();
    useEffect(() => {
        // Function to extract route name from pathname and set it to state
        const handleRouteChange = () => {
            const routeName = location.pathname.split('/').pop().replace(/-/g, ' ');
            setCurrentRouteName(routeName.charAt(0).toUpperCase() + routeName.slice(1));
        };

        // Call handleRouteChange initially and add listener for subsequent changes
        handleRouteChange();
        return () => {
            // Clean up listener when component unmounts
        };
    }, [location.pathname]);
    const handleItemClick = (itemName, route) => {
        // You can perform any actions here, such as navigating to a route or updating state
        console.log(`Clicked on ${itemName}, navigating to ${route}`);
    };
    return (
        <Sheet
            className="Sidebar"
            sx={{
                position: { xs: 'fixed', md: 'sticky' },
                transform: {
                    xs: 'translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1)))',
                    md: 'none',
                },
                transition: 'transform 0.4s, width 0.4s',
                zIndex: 10000,
                height: '100dvh',
                width: 'var(--Sidebar-width)',
                top: 0,
                p: 2,
                flexShrink: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                borderRight: '1px solid',
                borderColor: 'divider',
            }}
        >
            <GlobalStyles
                styles={(theme) => ({
                    ':root': {
                        '--Sidebar-width': '220px',
                        [theme.breakpoints.up('lg')]: {
                            '--Sidebar-width': '240px',
                        },
                    },
                })}
            />
            <Box
                className="Sidebar-overlay"
                sx={{
                    position: 'fixed',
                    zIndex: 9998,
                    top: 0,
                    left: 0,
                    width: '100vw',
                    height: '100vh',
                    opacity: 'var(--SideNavigation-slideIn)',
                    backgroundColor: 'var(--joy-palette-background-backdrop)',
                    transition: 'opacity 0.4s',
                    transform: {
                        xs: 'translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1) + var(--SideNavigation-slideIn, 0) * var(--Sidebar-width, 0px)))',
                        lg: 'translateX(-100%)',
                    },
                }}
                onClick={() => closeSidebar()}
            />
            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                <img style={{ width: "40px", height: "40px", borderRadius: "5px" }} src="https://img.freepik.com/free-vector/blond-man-with-eyeglasses-icon-isolated_24911-100831.jpg?t=st=1713514458~exp=1713518058~hmac=9d7688b59aa4ecb9a54415ce7ef5de909bbbf715fb73346df0d52abf0b08c603&w=740" alt="" />
                <Typography level="title-lg">Service Portal</Typography>
                <ColorSchemeToggle sx={{ ml: 'auto' }} />
            </Box>
            <Input size="sm" startDecorator={<SearchRoundedIcon />} placeholder="Search" />
            <Box
                sx={{
                    minHeight: 0,
                    overflow: 'hidden auto',
                    flexGrow: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    [`& .${listItemButtonClasses.root}`]: {
                        gap: 1.5,
                    },
                }}
            >
                <List
                    size="sm"
                    sx={{
                        gap: 1,
                        '--List-nestedInsetStart': '30px',
                        '--ListItem-radius': (theme) => theme.vars.radius.sm,
                    }}
                >






                    <ListItem nested>
                        <Toggler
                            renderToggle={({ open, setOpen }) => (
                                <ListItemButton onClick={() => setOpen(!open)}>
                                    <DashboardRoundedIcon />
                                    <ListItemContent>

                                        <Typography level="title-sm">Master Management</Typography>
                                    </ListItemContent>

                                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" className="bi bi-chevron-down" viewBox="0 0 16 16">
                                        <path fillRule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708" />
                                    </svg>
                                </ListItemButton>
                            )}
                        >
                            <List sx={{ gap: 0.5 }}>
                                <ListItem sx={{ mt: 0.5 }}>

                                    <ListItemButton onClick={() => navigate('/user')}>
                                        User
                                    </ListItemButton>

                                </ListItem>
                                <ListItem>
                                    <ListItemButton onClick={() => navigate('/equipment')}>Equipment</ListItemButton>
                                </ListItem>
                                <ListItem>
                                    <ListItemButton onClick={() => navigate('/product')}>Product</ListItemButton>
                                </ListItem>
                                <ListItem>
                                    <ListItemButton onClick={() => navigate('/reported-problem')}>Reported Problem</ListItemButton>
                                </ListItem>
                                <ListItem>
                                    <ListItemButton onClick={() => navigate('/warrenty-code')}>Warranty Code</ListItemButton>
                                </ListItem>
                                <ListItem>
                                    <ListItemButton onClick={() => navigate('/replaced-part-code')}>Replaced Part Code</ListItemButton>
                                </ListItem>
                                <ListItem>
                                    <ListItemButton onClick={() => navigate('aerb')}>AERB</ListItemButton>
                                </ListItem>
                                <ListItem>
                                    <ListItemButton onClick={() => navigate('/dealer')}>Dealer</ListItemButton>
                                </ListItem>
                                <ListItem>
                                    <ListItemButton onClick={() => navigate('/branch')}>Branch</ListItemButton>
                                </ListItem>
                            </List>
                        </Toggler>
                    </ListItem>



                    <ListItem nested>
                        <Toggler
                            renderToggle={({ open, setOpen }) => (
                                <ListItemButton onClick={() => setOpen(!open)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" style={{ color: "#636b74" }} height="16" fill="currentColor" className="bi bi-cloud-arrow-up-fill" viewBox="0 0 16 16">
                                        <path d="M8 2a5.53 5.53 0 0 0-3.594 1.342c-.766.66-1.321 1.52-1.464 2.383C1.266 6.095 0 7.555 0 9.318 0 11.366 1.708 13 3.781 13h8.906C14.502 13 16 11.57 16 9.773c0-1.636-1.242-2.969-2.834-3.194C12.923 3.999 10.69 2 8 2m2.354 5.146a.5.5 0 0 1-.708.708L8.5 6.707V10.5a.5.5 0 0 1-1 0V6.707L6.354 7.854a.5.5 0 1 1-.708-.708l2-2a.5.5 0 0 1 .708 0z" />
                                    </svg>
                                    <ListItemContent>

                                        <Typography level="title-sm">Upload Management</Typography>
                                    </ListItemContent>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" className="bi bi-chevron-down" viewBox="0 0 16 16">
                                        <path fillRule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708" />
                                    </svg>
                                </ListItemButton>
                            )}
                        >
                            <List sx={{ gap: 0.5 }}>
                                <ListItem sx={{ mt: 0.5 }}>
                                    <ListItemButton
                                        onClick={() => navigate('/amc-contract')}
                                    >
                                        AMC Contract
                                    </ListItemButton>
                                </ListItem>
                                <ListItem>
                                    <ListItemButton onClick={() => navigate('/customer')}>Customer</ListItemButton>
                                </ListItem>
                                <ListItem>
                                    <ListItemButton onClick={() => navigate('/dealer-stock')}>Dealer Stock</ListItemButton>
                                </ListItem>
                                <ListItem>
                                    <ListItemButton onClick={() => navigate('/hub-stock')}>Hub Stock</ListItemButton>
                                </ListItem>
                                <ListItem>
                                    <ListItemButton onClick={() => navigate('/pending-installation')}>Pending Installation</ListItemButton>
                                </ListItem>
                                <ListItem>
                                    <ListItemButton onClick={() => navigate('/pending-complaint')}>Pending Complaint</ListItemButton>
                                </ListItem>
                            </List>
                        </Toggler>
                    </ListItem>
                    <ListItem nested>
                        <Toggler
                            renderToggle={({ open, setOpen }) => (
                                <ListItemButton onClick={() => setOpen(!open)}>



                                    <SummarizeIcon />
                                    <ListItemContent>
                                        <Typography level="title-sm">Reports</Typography>
                                    </ListItemContent>


                                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" className="bi bi-chevron-down" viewBox="0 0 16 16">
                                        <path fillRule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708" />
                                    </svg>
                                </ListItemButton>

                            )}
                        >
                            <List sx={{ gap: 0.5 }}>
                                <ListItem sx={{ mt: 0.5 }}>
                                    <ListItemButton
                                        onClick={() => navigate('/completed-installation')}
                                    >
                                        Completed Installation
                                    </ListItemButton>
                                </ListItem>
                                <ListItem>
                                    <ListItemButton onClick={() => navigate('/new-customer')}>New Customer</ListItemButton>
                                </ListItem>
                                <ListItem>
                                    <ListItemButton onClick={() => navigate('/complaint-update')}>Complaint Update</ListItemButton>
                                </ListItem>
                                <ListItem>
                                    <ListItemButton onClick={() => navigate('/complaint-create')}>Complaint Create</ListItemButton>
                                </ListItem>
                                <ListItem>
                                    <ListItemButton onClick={() => navigate('/complaint-create-close')}>Complaint Create Close</ListItemButton>
                                </ListItem>
                                <ListItem>
                                    <ListItemButton onClick={() => navigate('/user-login')}>User Login</ListItemButton>
                                </ListItem>
                            </List>
                        </Toggler>
                    </ListItem>
                    <ListItem nested>
                        <Toggler
                            renderToggle={({ open, setOpen }) => (
                                <ListItemButton onClick={() => setOpen(!open)}>



                                    <SummarizeIcon />
                                    <ListItemContent>
                                        <Typography level="title-sm">Admin</Typography>
                                    </ListItemContent>


                                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" className="bi bi-chevron-down" viewBox="0 0 16 16">
                                        <path fillRule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708" />
                                    </svg>
                                </ListItemButton>

                            )}
                        >
                            <List sx={{ gap: 0.5 }}>
                                <ListItem sx={{ mt: 0.5 }}>
                                    <ListItemButton
                                        onClick={() => navigate('/admin-country')}
                                    >
                                        Country
                                    </ListItemButton>
                                </ListItem>
                                <ListItem>
                                    <ListItemButton onClick={() => navigate('/admin-state')}>State/Region</ListItemButton>
                                </ListItem>
                                <ListItem>
                                    <ListItemButton onClick={() => navigate('/admin-city')}>City</ListItemButton>
                                </ListItem>
                                <ListItem>
                                    <ListItemButton onClick={() => navigate('/admin-branch')}>Branch</ListItemButton>
                                </ListItem>
                                <ListItem>
                                    <ListItemButton onClick={() => navigate('/admin-roles')}>Roles</ListItemButton>
                                </ListItem>
                                <ListItem>
                                    <ListItemButton onClick={() => navigate('/admin-user-type')}>User Type</ListItemButton>
                                </ListItem>
                                <ListItem>
                                    <ListItemButton onClick={() => navigate('/admin-department')}>Department</ListItemButton>
                                </ListItem>
                                <ListItem>
                                    <ListItemButton onClick={() => navigate('/admin-product-group')}>Product Group</ListItemButton>
                                </ListItem>
                                <ListItem>
                                    <ListItemButton onClick={() => navigate('/admin-checklist')}>Checklist</ListItemButton>
                                </ListItem>
                                <ListItem>
                                    <ListItemButton onClick={() => navigate('/admin-pm-master')}>PM Master</ListItemButton>
                                </ListItem>
                            </List>
                        </Toggler>
                    </ListItem>
                </List>



            </Box>

            <Divider />
            <Box sx={{ width:"100%"}}>
                <List size="sm"
                    sx={{
                        gap: 1,
                        '--List-nestedInsetStart': '30px',
                        '--ListItem-radius': (theme) => theme.vars.radius.sm,
                    }}>
                    <ListItem nested>
                        <Toggler
                            renderToggle={({ open, setOpen }) => (
                                <ListItemButton onClick={() => setOpen(!open)}>



                                    <SettingsRoundedIcon />
                                    <ListItemContent>
                                        <Typography level="title-sm">Settings</Typography>
                                    </ListItemContent>


                                    <KeyboardArrowDownIcon
                                        sx={{ transform: open ? 'rotate(180deg)' : 'none' }}
                                    />
                                </ListItemButton>
                            )}
                        >
                            <List sx={{ gap: 0.5 }}>
                                <ListItem sx={{ mt: 0.5 }}>
                                    <ListItemButton
                                        onClick={() => navigate('/profile')}
                                    >
                                        My profile
                                    </ListItemButton>
                                </ListItem>
                                <ListItem>
                                    <ListItemButton onClick={() => navigate('/change-password')}>Change password </ListItemButton>
                                </ListItem>
                                <ListItem>
                                    {/* <ListItemButton onClick={()=>navigate('/reported-problem')}>Roles & permission</ListItemButton> */}
                                </ListItem>
                            </List>
                        </Toggler>
                    </ListItem>
                </List>
                <div className='flex mt-3  gap-1 items-center'>

                    <Avatar
                        variant="outlined"
                        size="sm"
                        src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=286"

                    />
                    <Box sx={{ minWidth: 0, flex: 1 }}>
                        <Typography level="title-sm" className="text-xs font-bold">Siriwat K.</Typography>
                        <div className='flex gap-2  mt-1 '>

                            <Typography level="body-xs" className="text-xs font-bold">Id - 9834874</Typography>
                            <Typography level="body-xs" className="text-xs border px-1 bg-yellow-500 rounded-[3px] text-black font-bold">Super Admin</Typography>
                        </div>
                    </Box>

                </div>
                <IconButton size="sm" style={{width:"200px"}} className='flex gap-5 text-lg items-center mt-3 justify-between px-3 bg-gray-200 w-full' variant="plain" color="neutral">
                  LogOut  <LogoutRoundedIcon />
                </IconButton>
            </Box>
        </Sheet >
    );
}
