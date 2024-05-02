import { Stack } from '@mui/material';
import Typography from '@mui/material/Typography';

export default function NewsWelcom() {
    const styleBg = {
        background: 'url(images/blue.png)',
        backgroundSize: '100%',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        paddingTop: '40px',
        paddingBottom: '50px',
        width: '100%',
    };
    return (
        <Stack style={styleBg} alignItems={'center'}>
            <Typography sx={{ fontFamily: '"Dancing Script", Sans-serif', fontSize: '45px', fontWeight: 700 }}>
                Chào mừng đến với Smart KinderGarten
            </Typography>
            <Typography sx={{ fontSize: '18px', fontWeight: 400 }}>
                85% con người của mỗi chúng ta – trí thông minh, tính cách, kỹ năng xã hội – được hình thành và phát
                triển trước tuổi lên 6.
            </Typography>
            <Typography sx={{ fontSize: '18px', fontWeight: 400 }}>
                Hãy đầu tư tối đa vào khoảng thời gian có thể tạo nên sự khác biệt lớn nhất này. (Massachusetts Early
                Education for All)
            </Typography>
        </Stack>
    );
}
