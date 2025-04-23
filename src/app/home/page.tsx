"use client";

import {
  Box,
  Button,
  ButtonBase,
  FormControl,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  MenuItem,
  Modal,
  Rating,
  Select,
  Typography,
} from "@mui/material";
import GSUImage from "../assets/georgia-state-university.png";
import UGAImage from "../assets/university-of-georgia.jpg";
import Image from "next/image";
import { useEffect, useState } from "react";
import Link from 'next/link';

const colleges: string[] = [
  "Georgia State University",
  "University of Georgia",
];
const majors: string[] = ["Computer Science", "Computer Engineering"];
const Home = () => {
    useEffect(() => {
      const user = localStorage.getItem('username');
      if (user) setCurrentUser(user);
    }, []);
  const [open, setOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState('');
  const getInitials = (name: string) => {
    if (!name || typeof name !== 'string') return '?';
    const words = name.trim().split(' ');
    return words.slice(0, 2).map(word => word[0].toUpperCase()).join('');
  };
  const handleClose = () => {
    setOpen(false);
  }

  return (
    <div className="p-6 w-full bg-[#FAFAF5] min-h-screen">
      <Modal onClose={() => handleClose} open={open}>
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
            <h2 className="text-xl font-semibold text-center mb-4">{}</h2>
            <form className="space-y-4">
              <div>
                <label className="block font-medium mb-1">Description:</label>
                <textarea
                  name="description"
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div>
                <label className="block font-medium mb-1">Rating:</label>
                <Rating/>
              </div>
              <div className="text-center">
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded"
                >
                  Post
                </button>
              </div>
            </form>
          </div>
        </div>
      </Modal>
      <div className="max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <Link href={currentUser === 'Guest' ? '/' : `/profile/${currentUser}`} className="flex items-center gap-3 hover:opacity-80">
            <div className="w-10 h-10 rounded-full bg-gray-400 flex items-center justify-center text-white font-bold">
              {getInitials(currentUser)}
            </div>
            <span className="text-xl font-semibold text-black">{currentUser}</span>
          </Link>
          <nav className="flex space-x-10 text-lg font-semibold">
            <Link href="/Comparison" className="text-black hover:underline">Comparisons</Link>
            <Link href="/home" className="text-red-600 font-bold">Home</Link>
            <Link href="/reviews" className="text-black hover:underline">Reviews</Link>
            <Link href="/" onClick={() => {
              localStorage.setItem('isLoggedIn', 'false');
              localStorage.setItem('username', '');
              document.cookie = "isLoggedIn=false";
            }} className="text-black hover:underline">Log Out</Link>
            <Link href="/" onClick={() => {              
            }} className="text-black hover:underline">Log In</Link>                  
          </nav>
        </div>

      <hr className="my-4 border-t border-gray-300" />

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "1rem",
            alignItems: "flex-end",
          }}
        >
          <Box>
            <Box sx={{ display: "flex" }}>
              <Box>
                <Typography>College:</Typography>
              </Box>
              <Box sx={{ marginRight: "1rem" }}>
                <Box>
                  <Rating readOnly={true} value={4} />
                </Box>
              </Box>
              <Box sx={{ marginRight: "1rem" }}>
                <Button onClick={() => {
                    setOpen(true)
                }}>Add Review</Button>
              </Box>
            </Box>

            <Box>
              <FormControl sx={{ width: "10rem" }}>
                <Select value={"Georgia State University"}>
                  {colleges.map((college, index) => (
                    <MenuItem value={college}>{college}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </Box>
          <Box sx={{ marginBottom: "0" }}>
            <Box sx={{ display: "flex" }}>
              <Box>
                <Typography>Major:</Typography>
              </Box>
            </Box>

            <Box>
              <FormControl sx={{ width: "10rem" }}>
                <Select value={"Computer Science"}>
                  {majors.map((major, index) => (
                    <MenuItem value={major}>{major}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </Box>
          <Box>
            <Box sx={{ display: "flex" }}>
              <Box>
                <Typography>College:</Typography>
              </Box>
              <Box sx={{ marginRight: "1rem" }}>
                <Box>
                  <Rating readOnly={true} value={4} />
                </Box>
              </Box>
              <Box sx={{ marginRight: "1rem" }}>
                <Button
                  onClick={() => {
                    setOpen(true);
                  }}
                >
                  Add Review
                </Button>
              </Box>
            </Box>

            <Box>
              <FormControl sx={{ width: "10rem" }}>
                <Select value={"University of Georgia"}>
                  {colleges.map((college, index) => (
                    <MenuItem value={college}>{college}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            width: "100%",
            height: "100%",
            display: "flex",
            marginTop: "1rem",
          }}
        >
          <Box sx={{ width: "50%" }}>
            <Box sx={{ position: "relative", height: "25rem" }}>
              <Image fill={true} alt="school" src={GSUImage} />
            </Box>
            <Box sx={{ height: "fit-content" }}>
              <Box>
                <Typography typography={"h6"}>Required Courses:</Typography>
              </Box>

              <List>
                <ListItem>
                  <ListItemButton>
                    <ListItemText primary="1101 ENGL" />
                  </ListItemButton>
                </ListItem>
                <ListItem>
                  <ListItemButton>
                    <ListItemText primary="MATH 2250" />
                  </ListItemButton>
                </ListItem>
              </List>
            </Box>
          </Box>

          <Box>
            <Button>Save Comparison</Button>
          </Box>
          <Box sx={{ width: "50%" }}>
            <Box sx={{ position: "relative", height: "25rem" }}>
              <Image fill={true} alt="school" src={UGAImage} />
            </Box>
            <Box sx={{ height: "fit-content" }}>
              <Box>
                <Typography typography={"h6"}>Required Courses:</Typography>
              </Box>

              <List>
                <ListItem>
                  <ListItemButton>
                    <ListItemText primary="1101 ENGL" />
                  </ListItemButton>
                </ListItem>
                <ListItem>
                  <ListItemButton>
                    <ListItemText primary="MATH 2250" />
                  </ListItemButton>
                </ListItem>
                <ListItem>
                  <ListItemButton>
                    <ListItemText primary="CSCI 2670" />
                  </ListItemButton>
                </ListItem>
              </List>
            </Box>
          </Box>
        </Box>
        </div>
    </div>
  );
};

export default Home;