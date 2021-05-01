import { useState } from "react";
import Link from "next/link";
import {
  Drawer,
  ListItem,
  List,
  ListItemText,
  Button,
  ListItemIcon,
} from "@material-ui/core";
import {
  HomeOutlined,
  Person,
  Beenhere,
  Bookmark,
  ImportantDevices,
  ContactMail,
} from "@material-ui/icons";

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
