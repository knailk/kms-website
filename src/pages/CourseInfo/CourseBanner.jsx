import { Button, Grid, Stack } from '@mui/material';
import Typography from '@mui/material/Typography';

export default function CourseBanner() {
    const styleBg = {
        background: 'url(images/bg-banner.png)',
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
    };
    return (
        <Grid container sx={{ backgroundImage: 'url(images/backgroundhome.svg)', px: '300px', minHeight: '300px' }}>
            <Grid item xs={7} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <Typography>Trang chủ >> Lớp học</Typography>
                <Typography
                    style={{
                        fontSize: '26px',
                        fontWeight: '700',
                        fontFamily: '"Nunito", sans-serif',
                        maxWidth: '600px',
                        color: '#545454',
                    }}
                >
                    “Cô không chỉ dạy con những kiến thức, những bài học bổ ích trên lớp mà còn dạy con tình yêu thiên
                    nhiên, tình bạn, biết quan tâm và chia sẻ"
                </Typography>
                <Button
                    sx={{
                        mt:'20px',
                        px: '25px',
                        py: '10px',
                        width: 'fit-content',
                        borderRadius: '50px',
                        fontWeight: '700',
                        textTransform: 'none',
                    }}
                    variant={'contained'}
                >
                    Xem thêm
                </Button>
            </Grid>
            <Grid item xs={5} sx={styleBg}></Grid>
        </Grid>
    );
}
