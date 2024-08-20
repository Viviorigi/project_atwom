import { Box, Button, Typography, useTheme } from "@mui/material";
import { tokens } from "../../comp/commons/theme";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import React from "react";
import { CardMembership, DeleteOutline, MoreHorizSharp } from "@mui/icons-material";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import ModalAddBook from "../../comp/book/ModalAddBook";
import ModalEditBook from "../../comp/book/ModalEditBook";
import HeaderContent from "../../comp/layout/comp/HeaderContent";

const Book = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    // const dispatch = useDispatch();
  
    useEffect(() => {
    //   dispatch(getUsers());
    }, []);
  
    // const { users, user } = useSelector((state : any) => state.users);
  
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
  
    const [openAdd, setOpenAdd] = React.useState(false);
    const handleOpenAdd = () => setOpenAdd(true);
    const handleCloseAdd = () => setOpenAdd(false);

    interface RowData {
        id?: number;
        name?: string;
        phone?: string;
        isActive?: boolean;
        email?:string;
        address?:string;
        accessLevel?:string;
        isAdmin?:boolean
      }

      const rows = [
        { id: 1, name: 'John Doe',phone:"000",email: "30",address:"000",accessLevel:"000" },
        { id: 2, name: 'John Doe',phone:"000",email: "36",address:"000",accessLevel:"000"},
      ];
  
    const columns : GridColDef<RowData>[] = [
      {
        field: "id",
        headerName: "No. ",
        flex: 0.5,
        renderCell: ({ row: { isActive } }) => {
          return (
            <>
              <Box
                m="0 auto"
                p="5px"
                display="flex"
                justifyContent="center"
                
                sx={{
                    backgroundColor:`${
                  isActive === false
                    ? colors.redAccent[700]
                    : colors.greenAccent[700]}
                `,
                    borderRadius: "33px",
                  }}
              >
                {isActive === true && <CardMembership />}
                {isActive === false && <CardMembership />}
              </Box>
            </>
          );
        },
      },
      {
        field: "name",
        headerName: " Name",
        flex: 0.7,
      },
      {
        field: "phone",
        headerName: "Phone Number",
        flex: 0.7,
      },
      {
        field: "email",
        headerName: "Email",
        flex: 1,
      },
      {
        field: "address",
        headerName: "Address",
        flex: 1,
      },
      {
        field: "accessLevel",
        headerName: "Access Level",
        flex: 0.9,
        renderCell: ({ row: { isAdmin } }) => {
          return (
            <>
              <Box
                width="60%"
                m="0 auto"
                p="5px"
                display="flex"
                justifyContent="center"

                sx={{
                    backgroundColor:`${
                        isAdmin === false
                    ? colors.blueAccent[700]
                    : colors.greenAccent[700]}
                `,
                    borderRadius: "4px",
                  }}
              >
                {isAdmin === true && <AdminPanelSettingsOutlinedIcon />}
                {isAdmin === false && <LockOpenOutlinedIcon />}
  
                <Typography color={colors.grey[200]} sx={{ ml: "5px" }}>
                  {isAdmin ? "Admin" : "User"}
                </Typography>
              </Box>
            </>
          );
        },
      },
      {
        field: "update",
        headerName: "Update user",
        flex: 0.8,
        renderCell: ({ row: { id } }) => {
          return (
            <>
              <Box height="55%" m="0 auto" borderRadius="4px">
                <Button
                  onClick={ () => {
                    // await dispatch(getUserId(id));
                    handleOpen();
                  }}
                >
                  <Typography color={colors.grey[200]}>
                    <MoreHorizSharp />
                  </Typography>
                </Button>
                <Button
                  onClick={async () => {
                    // await dispatch(deleteUser(id));
                  }}
                >
                  <Typography color={colors.redAccent[500]}>
                    <DeleteOutline />
                  </Typography>
                </Button>
              </Box>
            </>
          );
        },
      },
    ];
  
    return (
      <Box mx="20px" sx={{ height: '100vh'}}>
        <ModalAddBook open={openAdd} handleClose={handleCloseAdd} />
        {open ? <ModalEditBook open={open} handleClose={handleClose} /> : <></>}
  
        <HeaderContent title="Books" subtitle="Managing the books " />
        <Box
          m="20px 0 0 0"
          height="70vh"
          sx={{
            "& .MuiDataGrid-root": {
              border: "-moz-initial",
            },
            "& .MuiDataGrid-cell": {
              borderBottom: "none",
            },
            "& .name-column--cell": {
              color: colors.greenAccent[300],
            },
            "& .MuiDataGrid-columnHeader": {
              borderBottom: "black",
              backgroundColor: `${colors.greenAccent[600]} !important`,
            },
            "& .MuiDataGrid-virtualScroller": {
              backgroundColor: colors.primary[500],
            },
            "& .MuiDataGrid-footerContainer": {
              borderTop: "none",
              backgroundColor: colors.greenAccent[600],
            },
            "& .MuiCheckbox-root": {
              color: `${colors.greenAccent[200]} !important`,
            },
            "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
              color: `${colors.grey[100]} !important`,
            },
          }}
        >
          {" "}
          <Box display="flex" justifyContent="end">
            <Button
              onClick={handleOpenAdd}
              type="submit"
              color="secondary"
              variant="contained"
            >
              Add Books
            </Button>
          </Box>
          <DataGrid
            rows={rows}
            columns={columns}
            slots={{ toolbar: GridToolbar }}
            initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 5,
                  },
                },
              }}
              pageSizeOptions={[5]}
              checkboxSelection
              disableRowSelectionOnClick
  
          />
        </Box>
      </Box>
    );
  };
  
  export default Book;