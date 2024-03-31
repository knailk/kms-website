import { Stack } from '@mui/material';
import NewsBanner from '~/pages/News/NewsBanner';
import NewsConnect from '~/pages/News/NewsConnect';
import NewsEvent from '~/pages/News/NewsEvent';
import NewsNoti from '~/pages/News/NewsNoti';
import NewsWelcom from '~/pages/News/NewsWelcom';

function News() {
    return (
        <Stack>
            <NewsBanner/>
            <NewsConnect/>
            <NewsEvent/>
            <NewsNoti/>
            <NewsWelcom/>
        </Stack>
    );
}

export default News;
