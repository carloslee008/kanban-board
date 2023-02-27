import { AppBar, Toolbar } from "@mui/material";
import AddTaskIcon from '@mui/icons-material/AddTask';

function Header() {
    return (
        <AppBar position="relative">
            <Toolbar style={{display:"flex", justifyContent: "space-between", backgroundColor: "#c7e055"}}>
                <h2>
                <AddTaskIcon />
                     Kanban Board
                </h2>
            </Toolbar>
        </AppBar>
    )
}

export default Header;