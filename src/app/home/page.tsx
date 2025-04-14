import { Box, Button, ButtonBase, FormControl, MenuItem, Rating, Select, Typography } from "@mui/material";
import Image from "next/image";


const colleges:String[] = ["Georgia State University", "University of Georgia"];
const majors:String[] = ["computer science", "computer engineering"];
const Home = () => {
    return (
        <Box>
            <Box sx={{paddingLeft:"10rem", paddingRight:"10rem"}}>
                <Box sx={{display:"flex", justifyContent:"space-between", marginTop:"1rem"}}>
                    <Box>
                        <Box sx={{display:"flex"}}>
                            <Box>
                                <Typography>College:</Typography>
                            </Box>
                            <Box sx={{marginRight:"1rem"}}>
                                <Box>
                                    <Rating/>
                                </Box>
                            </Box>
                            <Box sx={{marginRight:"1rem"}}>
                                <Button>
                                    Add Review
                                </Button>
                            </Box>
                        </Box>

                        <Box>
                        <FormControl sx={{width:"10rem"}}>
                                <Select>
                                    {colleges.map((college,index) => (
                                        <MenuItem>
                                            {college}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Box>
                    
                    </Box>
                    <Box sx={{height:"1rem"}}>
                        <Box sx={{display:"flex"}}>
                            <Box>
                                <Typography>Major:</Typography>
                            </Box>
                        </Box>

                        <Box>
                        <FormControl sx={{width:"10rem"}}>
                                <Select>
                                    {majors.map((major,index) => (
                                        <MenuItem>
                                            {major}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Box>
                    
                    </Box>
                    <Box sx={{height:"1rem"}}>
                        <Box sx={{display:"flex"}}>
                            <Box>
                                <Typography>College:</Typography>
                            </Box>
                            <Box sx={{marginRight:"1rem"}}>
                                <Box>
                                    <Rating/>
                                </Box>
                            </Box>
                            <Box sx={{marginRight:"1rem"}}>
                                <Button>
                                    Add Review
                                </Button>
                            </Box>
                        </Box>

                        <Box>
                        <FormControl sx={{width:"10rem"}}>
                                <Select>
                                    {colleges.map((college,index) => (
                                        <MenuItem>
                                            {college}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Box>
                    
                    </Box>
                </Box>
                <Box sx={{width:"100%", display:"flex", marginTop:"1rem"}}>
                    <Box sx={{ width:"50%", border:"1px solid red"}}>
                        <Box>
                            <Image/>
                        </Box>
                        <Box>

                        </Box>
                    </Box>

                    <Box>
                        <Button>
                            Save Comparison
                        </Button>
                    </Box>
                    <Box  sx={{width:"50%", border:"1px solid green"}}>
                        <Box>
                            <Image/>
                        </Box>
                        <Box>

                        </Box>
                    </Box>
                </Box>
            </Box>

        </Box>
    )
}

export default Home;