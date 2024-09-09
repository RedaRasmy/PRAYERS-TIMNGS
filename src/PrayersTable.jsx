import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}



export default function PrayersTable({timings}) {

  const prayers = ['Fajr','Sunrise','Dhuhr','Asr',"Maghrib",'Isha']

  return (
    <TableContainer 
    component={Paper} 
    style={{width:"100%",borderRadius:'15px',}}
    >
      <Table sx={{ width:'100%',backgroundColor:'#821131',}} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell sx={{color:'#ECFFE6',fontWeight:900}}>Prayer</TableCell>
            <TableCell align="right" sx={{color:'#ECFFE6',fontWeight:900}}>Timing</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {prayers.map((prayer) => (
            <TableRow
              key={prayer}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } ,}}
            >
              <TableCell component="th" scope="row" sx={{color:'#ECFFE6',fontWeight:900}}>
                {prayer}
              </TableCell>
              <TableCell align="right" sx={{color:'#ECFFE6',fontWeight:900}}>{timings[prayer]}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
