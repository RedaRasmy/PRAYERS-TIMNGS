import { Stack } from "@mui/material"
import Prayer from './Prayer';


export default function Cards({timings}) {
  return (
    <>
        <Stack 
            className='cards'
            display={'none'}
            direction={'row-reverse'}
            flexWrap={'wrap'}
            justifyContent={'start'}
            >
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
    </>
  )
}
