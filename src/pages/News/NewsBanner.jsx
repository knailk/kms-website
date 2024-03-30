import { Button, Grid, Stack } from '@mui/material';
import Typography from '@mui/material/Typography';

export default function NewsBanner() {
    const styleBg = {
        background: 'url(images/bg-banner.png)',
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
    };
    return (
        <Grid container sx={{ backgroundImage: 'url(images/backgroundhome.svg)', px: '300px', minHeight: '300px' }}>
            <Grid item xs={7} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <Typography>Trang chủ >> Tin tức</Typography>
                <Typography
                    style={{
                        fontSize: '26px',
                        fontWeight: '700',
                        fontFamily: '"Nunito", sans-serif',
                        maxWidth: '600px',
                        color: '#545454',
                    }}
                >
                    “Trường có rất nhiều hoạt động dã ngoại, sự kiện giúp các con thêm tự tin trước đám đông"
                </Typography>
                <Button
                    sx={{
                        mt: '20px',
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
