import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import SchoolIcon from '@mui/icons-material/School';
import {Typography, Box, Paper, Collapse, Button, TextField} from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Grid from '@mui/material/Grid';
import ButtonBase from '@mui/material/ButtonBase';
import Link from '@mui/material/Link';

class EmployeeComponent extends React.Component{
    constructor(props){
        super(props);

        this.state={
            universities:[],
            uncollapsedIndex: -1,
            searchInput:''
        };
    };

    componentDidMount(){
        fetch("http://universities.hipolabs.com/search?country=United+States").then(res=> {
            return res.json()
        }).then(result=> {
            // console.log(result)
            this.setState({universities:result});
        }).catch(error => {
            console.log(error)
        })
    }
    
    render(){
        return (
            <div>
                <Paper variant="outlined" style={{ background: "lightgray" }}>
                    <Box display={'flex'}>
                        <SchoolIcon style={{fontSize: '3em', marginRight: 25}}/>
                        <Typography variant="h3" component="h3">
                            List of Universities
                        </Typography>
                    </Box>
                </Paper>
                <Paper variant="outlined">
                    <Box display={'flex'}>
                        <TextField onChange={(event) => {
                            this.setState({searchInput:event.target.value})
                        }} value={this.state.searchInput} label="Search" variant="outlined" style={{width: 500, margin: 5}} />
                        <Button variant="contained" style={{margin: 5}}>Previous page</Button>
                        <Button variant="contained" style={{margin: 5}}>Next page</Button>
                    </Box>
                </Paper>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                        <TableRow>
                            <TableCell>University Name</TableCell>
                            <TableCell align="right"></TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {this.state.universities.filter(uni => uni.name.toLowerCase().startsWith(this.state.searchInput)).map((row, index) => (
                            <>
                                <TableRow
                            key={row.name}
                            onClick={() => this.state.uncollapsedIndex === index ? this.setState({uncollapsedIndex:-1}) : this.setState({uncollapsedIndex:index})}
                            style={{backgroundColor: this.state.uncollapsedIndex === index ? "lightblue" : "white"}}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {row.name}
                                </TableCell>
                                <TableCell align="right">
                                    <img alt="complex" src={`http://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=${row?.web_pages?.[0]}&size=32`} />
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell style={{padding: 0}} colSpan={3}>
                                    <Collapse in={this.state.uncollapsedIndex === index}>
                                    <Paper
                                        sx={{
                                            p: 2,
                                            margin: '10px',
                                            marginTop: "0px",
                                            maxWidth: '100%',
                                            flexGrow: 1,
                                            backgroundColor: (theme) =>
                                            theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
                                        }}
                                        >
                                        <Grid container spacing={2}>
                                            <Grid item>
                                            <ButtonBase sx={{ width: 256, height: 128 }}>
                                                <img alt="complex" src={`http://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=${row?.web_pages?.[0]}&size=64`} />
                                            </ButtonBase>
                                            </Grid>
                                            <Grid item xs={12} sm container>
                                            <Grid item xs container direction="column" spacing={2}>
                                                <Grid item xs>
                                                <Typography gutterBottom variant="subtitle1" component="div">
                                                    {row.name}
                                                </Typography>
                                                <Typography variant="body2" gutterBottom>
                                                    {row.country}
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary">
                                                    {row?.alpha_two_code}
                                                </Typography>
                                                </Grid>
                                                <Grid item>
                                                <Link href={row?.web_pages?.[0]} underline="none">
                                                    {'visit the page'}
                                                </Link>
                                                </Grid>
                                            </Grid>
                                            <Grid item>
                                                <Typography variant="subtitle1" component="div">
                                                {`ranking: ${Math.floor(5 + Math.random()*5)}`}
                                                </Typography>
                                            </Grid>
                                            </Grid>
                                        </Grid>
                                        </Paper>
                                    </Collapse>
                                </TableCell>
                            </TableRow>
                            </>
                        ))}
                        </TableBody>
                    </Table>
                    </TableContainer>
            </div>
        );
    }
}


const Element= <EmployeeComponent></EmployeeComponent>
const root=ReactDOM.createRoot(document.getElementById("root"));
root.render(Element)
    
reportWebVitals();
