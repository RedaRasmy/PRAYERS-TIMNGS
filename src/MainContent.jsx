import { useEffect, useState } from 'react'
import Grid from '@mui/material/Grid2';
import Stack from '@mui/material/Stack';
import Prayer from './Prayer';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import axios from 'axios';



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
        const nextPrayerTiming = nextPrayerArray[0]
        const hoursLeft = parseInt(nextPrayerTiming) - hour
        const test = parseInt(nextPrayerTiming.slice(3)) - minute
        const minutesLeft =  Math.abs(test)

        // console.log(`${hoursLeft}:${minutesLeft}`)
        const countDown = `${hoursLeft}:${minutesLeft}:${seconds}`
        const nextPrayer = getPrayer(nextPrayerTiming)
        return [countDown,nextPrayer]
    }


    return (
    <>
        <Grid container >
            <Grid size={6}>
                <div>
                    <h2>{getDate()}</h2>
                    <h1>{city}</h1>
                </div>
            </Grid>

            <Grid size={6}>
                <div>
                    <h2>
                        {'time left to salat ' + array[1] + " :"}
                    </h2>
                    <h1>
                        {array[0]}
                    </h1>
                </div>
            </Grid>
        </Grid>
        <hr style={{opacity:0.1}}></hr>
        <Stack 
            className='cards'
            direction={'row-reverse'}
            flexWrap={'wrap'}
            justifyContent={'center'}
            style={{
                display:'flex',
                marginTop:'20px'
                }}>
            <Prayer 
                imgUrl='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5T5X8qvNDFM9GxOq9irfqrTi-8LwLMbP6tA&s'
                title='الفجر'
                time={timings.Fajr}

            />
            <Prayer
                imgUrl='https://www.islamiclandmarks.com/wp-content/uploads/2023/05/masjid_al_aqsa_front_door.jpg'
                title='الظهر'
                time={timings.Dhuhr}

            />
            <Prayer
                imgUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-gYcPB4RApfb97NkJ06sBtVWunaxVohmGRw&s"
                title="العصر"
                time={timings.Asr}
            />
            <Prayer
                imgUrl="https://pics.craiyon.com/2023-09-29/8e5808622f2146f2996f203a0fc45890.webp"
                title="المغرب"
                time={timings.Maghrib}
            />
            <Prayer
                imgUrl='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcST2sw4JtQakToDF2EiFxYqjHV_hQcAZqzr5A&s'
                title="العشاء"
                time={timings.Isha}
            />
        </Stack>
        <Stack justifyContent={'center'} alignItems={'center'} style={{margin:'40px'}}>
            <FormControl style={{width:'20%'}}>
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
                </Select>
            </FormControl>
        </Stack>
    </>
)
}
