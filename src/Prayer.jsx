
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';

export default function MediaCard({imgUrl,title,time}) {
  return (
    <Card sx={{ maxWidth: 1000 , minWidth: 230}} style={{margin:'5px',height:300,direction:'rtl'}}>
      <CardMedia
        sx={{ height: 140 }}
        image={imgUrl}
        title="green iguana"
      />
      <CardContent >
        <h2 >
          {title}
        </h2>
        <h1 >
          {time}
        </h1>
      </CardContent>
    </Card>
  );
}
