import { useState } from "react";
import Link from "next/link";
import Drawer from "@material-ui/core/Drawer";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import ListItemText from "@material-ui/core/ListItemText";
import Button from "@material-ui/core/Button";
import ListItemIcon from "@material-ui/core/ListItemIcon";

import HomeOutlined from "@material-ui/icons/HomeOutlined";
import Person from "@material-ui/icons/Person";
import Beenhere from "@material-ui/icons/Beenhere";
import Bookmark from "@material-ui/icons/Bookmark";
import ImportantDevices from "@material-ui/icons/ImportantDevices";
import ContactMail from "@material-ui/icons/ContactMail";
import classes from "./main-header.module.css";

const items = ["Experiences","Login", "Signup", "User", "Experience"];
const icons = [
  <Person />,
  <Beenhere />,
  <Bookmark />,
  <ImportantDevices />,
  <ContactMail />,
];
const pages = ["/", "/login", "sign-up", "user", "experience"];

const MainHeader = () => {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (state) => {
    setOpen(state);
  };

  const drawer = (
    <div onClick={() => toggleDrawer(false)}>
      <List>
        {items.map((item, index) => {
          return (
            <Link key={item} href={pages[index]}>
              <ListItem className={classes.item}>
                <ListItemIcon> {icons[index]} </ListItemIcon>
                <ListItemText> {item} </ListItemText>
              </ListItem>
            </Link>
          );
        })}
      </List>
    </div>
  );

  return (
    <div className={classes.main}>
      <div className={classes.drawer} >
        <Button onClick={() => toggleDrawer(true)}>
          <HomeOutlined  color="primary"></HomeOutlined>
        </Button>
        <Drawer anchor="top" onClose={() => toggleDrawer(false)} open={open}>
          {drawer}
        </Drawer>
      </div>
      <div className={classes.logo} >
        <Link href="/">
          <a>
             Experience 
          </a>
        </Link>
      </div>
    </div>
  );
};

export default MainHeader;
