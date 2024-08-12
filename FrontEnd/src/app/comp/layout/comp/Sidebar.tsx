import {
  Box,
  Button,
  CssBaseline,
  IconButton,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
import { tokens } from "../../commons/theme";
import { Link, useNavigate } from "react-router-dom";
import { Menu, MenuItem, Sidebar } from "react-pro-sidebar";
import { useDispatch } from "react-redux";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import {
  BookRounded,
  CalendarMonthOutlined,
  CategoryOutlined,
  EventAvailableOutlined,
  FitnessCenter,
  LocalActivity,
  LogoutOutlined,
  NewspaperOutlined,
  RoomOutlined,
  RoomPreferencesOutlined,
} from "@mui/icons-material";

const Item = ({ title, to, icon, selected, setSelected }: any) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <MenuItem
      active={selected === title}
      style={{
        color: colors.grey[100],
      }}
      //  onClick={() => {setSelected(title)}}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};

const SidebarMenu = () => {
  //  const dispatch=useDispatch()
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);

  //  const {logout} = userAction;
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        "& .pro-sidebar-inner": {
          background: `${colors.primary[400]} !important`,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: `${colors.primary[400]} !important`,
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
        },
        "& .pro-inner-item:hover": {
          color: "#868dfb !important",
        },
        "& .pro-menu-item.active": {
          color: "#6870fa !important",
        },
      }}
    >
      <Sidebar collapsed={isCollapsed} backgroundColor={colors.primary[500]}>
        <Menu>
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "10px 0 20px 0",
              background: colors.primary[500],
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="10px"
              >
                <Typography variant="h6" color={colors.grey[100]}>
                  <Typography
                    variant="h2"
                    color={colors.grey[100]}
                    fontWeight="bold"
                    sx={{ m: "10px 0 0 0" }}
                  >
                    Admin
                  </Typography>
                  <Typography variant="h5" color={colors.greenAccent[500]}>
                    Book Store Admin
                  </Typography>
                </Typography>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {!isCollapsed && (
            <Box mb="20px">
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
              ></Box>
              <Box textAlign="center"></Box>
            </Box>
          )}

          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            <Link
              to="/manager"
              //  icon={<BookRounded />}
            >
              <Item title="Dashboard" icon={<HomeOutlinedIcon />} />
            </Link>

            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Data
            </Typography>

            <Link
              to="/user"
              //  icon={<BookRounded />}
            >
              <Item title="Manage Users" icon={<PeopleOutlinedIcon />} />
            </Link>

            <Link
              to="/books"
              //  icon={<BookRounded />}
            >
              <Item title="Manage Books" icon={<BookRounded />} />
            </Link>

            <Link
              to="/categories"
              //  icon={<BookRounded />}
            >
              <Item title="Manage categories" icon={<CategoryOutlined />} />
            </Link>

            <Link
              to="/order"
              //  icon={<BookRounded />}
            >
              <Item title="Manage order" icon={<EventAvailableOutlined />} />
            </Link>

            <Button
              //  onClick={()=>{dispatch(logout())
              //    navigate("/login")}}
              // startIcon={<LogoutOutlined/>}
              //  setSelected={setSelected}

              sx={{
                mt: "50px",
                backgroundColor: "#4cceac",
                color: `${
                  theme.palette.mode === "light" ? "#141b2d" : "#fcfcfc"
                }`,
              }}
            >
              logout
            </Button>
          </Box>
        </Menu>
      </Sidebar>
    </Box>
  );
};

export default SidebarMenu;
