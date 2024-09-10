import { useEffect, useState } from 'react'
import Stack from '@mui/material/Stack';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import axios from 'axios';
import PrayersTable from './PrayersTable';
import Cards from './Cards';



export default function MainContent() {
    const [country,setCountry] = useState('MA')
    const [city,setCity] = useState('Mohammadia')
    const [timings,setTimings] = useState({
        Fajr:'Unknown',
        Dhuhr:'Unknown',
        Asr:'Unknown',
        Maghrib:'Unknown',
        Isha:'Unknown'
    })
    const [array,setArray] = useState(['',''])
    const path = `https://api.aladhan.com/v1/timingsByCity?country=${country}&city=${city}`
    const getTimings = async () => {
        const response = await axios.get(path)
        setTimings(response.data.data.timings)
        setArray(getNextPrayerCountDown())
    }

    useEffect( () => {
        getTimings()
    } )
    


    const handleCity = (event) => {
        setCity(event.target.value);
    };

    function getDate() {
        const date = new Date()
        const year = date.getFullYear()
        const month = date.toLocaleString('default', { month: 'long' });
        const day = date.getDate()
        const hour = date.getHours()
        const minute = date.getMinutes()
        return `${year} ${day} ${month} | ${hour}:${minute}`
    }
    function getPrayer(time) {
        if (time === timings.Fajr) {return "Fajr"}
        if (time === timings.Dhuhr) {return "Dhuhr"}
        if (time === timings.Asr) {return "Asr"}
        if (time === timings.Maghrib) {return "Maghrib"}
        if (time === timings.Isha) {return "Isha"}
    }
    function getNextPrayerCountDown() {
        const date = new Date()
        const hour = date.getHours()
        const minute = date.getMinutes()
        const seconds = 59 - date.getSeconds()
        const timingsList = [timings.Fajr,timings.Dhuhr,timings.Asr,timings.Maghrib,timings.Isha]

        const nextPrayerArray = timingsList.filter( (timing)=> {
            const timingHour = parseInt(timing)
            const timingMinute = parseInt(timing.slice(3))
            if ( 
                (timingHour > hour) || 
                ( (timingHour === hour) && (timingMinute>minute)) 
            ) {
                    return true
                }
        })
        const nextPrayerTiming = nextPrayerArray[0] ? nextPrayerArray[0] : nextPrayerArray[4]
        const hoursLeft = parseInt(nextPrayerTiming) - hour
        const test = parseInt(nextPrayerTiming.slice(3)) - minute
        const minutesLeft =  Math.abs(test)
        function convertToTime(num) {
            return String(num).padStart(2,'0')
        }
        const countDown = `${convertToTime(hoursLeft)}:${convertToTime(minutesLeft)}:${convertToTime(seconds)}`
        const nextPrayer = getPrayer(nextPrayerTiming)
        return [countDown,nextPrayer]
    }


    return (
    <>
        <div className='upper-container'>
            <div className='upper right-side'>
                <h2 className='upper date' >{getDate()}</h2>
                <h1 className='upper city'>{city}</h1>
            </div>
            <div className='upper'>
                <h2 className='upper time-left'>
                    {'time left to salat ' + array[1] + " :"}
                </h2 >
                <h1 className='upper'>
                    {array[0]}
                </h1>
            </div>
        </div>
        <hr style={{opacity:0.1,width:'100%'}}></hr>
        <Cards 
        timings={timings} 
        displayProp={false}
        />
        <Stack justifyContent={'center'} alignItems={'center'} style={{margin:'10px',marginBottom:'-10px'}}>
            <FormControl style={{width:'20%' , minWidth:'150px'}}>
                <InputLabel id="demo-simple-select-label"> 
                    <span style={{color:'white'}}>
                        City
                    </span>
                </InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={city}
                    label="City"
                    onChange={handleCity}
                    style={{
                        color:'white'
                    }}
                    >
                    <MenuItem value={"Midelt"}>Midelt</MenuItem>
                    <MenuItem value={"Mohammadia"}>mohammadia</MenuItem>
                    <MenuItem value={"Casablanca"}>Casablanca</MenuItem>
                </Select>
            </FormControl>
        </Stack>
        <div 
            className='prayersTable'
            style={{margin:'30px 40px 0px 40px',display:'flex',justifyContent:'center',width:'90%'}}
        >
            <PrayersTable
                className='prayersTable'
                timings={timings}
    
            />
        </div> 
    </>
)
}
