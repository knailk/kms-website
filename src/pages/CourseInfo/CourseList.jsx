import { Accordion, AccordionDetails, AccordionSummary, Stack } from '@mui/material';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function CourseList() {
    return (
        <Stack alignItems={'center'} spacing={2} sx={{ mb: '50px' }}>
            <Typography
                style={{
                    fontSize: '26px',
                    fontWeight: '800',
                    fontFamily: '"Nunito", sans-serif',
                    color: '#545454',
                }}
            >
                Lớp Học StarKids
            </Typography>
            <Stack sx={{ maxWidth: '1200px' }}>
                <Accordion>
                    <AccordionSummary sx={{bgcolor:'#257abe', fontSize:'18px', fontWeight:'700', color:'white'}} expandIcon={<ExpandMoreIcon />} aria-controls="panel1-content" id="panel1-header">
                        Lớp 13 - 18 tháng
                    </AccordionSummary>
                    <AccordionDetails
                        sx={{ minHeight: '100px', display: 'flex', alignItems: 'center', bgcolor: '#005294', color:'white' }}
                    >
                        Giai đoạn này, bé có rất nhiều nhu cầu về việc rèn luyện các kỹ năng mới như tập đi, tập nói,
                        các kỹ năng tự phục vụ bản thân và khám phá thế giới. Các con bắt đầu bước vào khám phá thế giới
                        ẩm thực bằng việc nếm, thử, luyện tập kỹ năng cầm nắm, bốc…các loại thức ăn nguyên vị đa dạng
                        khác nhau hàng ngày.
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary sx={{bgcolor:'#257abe', fontSize:'18px', fontWeight:'700', color:'white'}} expandIcon={<ExpandMoreIcon />} aria-controls="panel1-content" id="panel1-header">
                        Lớp 19 - 24 tháng
                    </AccordionSummary>
                    <AccordionDetails
                        sx={{ minHeight: '100px', display: 'flex', alignItems: 'center', bgcolor: '#005294', color:'white' }}
                    >
                        Trẻ đã bắt đầu chủ động tìm hiểu thế giới xung quanh, và có nhu cầu mạnh mẽ trong việc tập đứng,
                        tập đi, leo cầu thang. Các con đã trở nên thành thạo hơn trong việc cầm nắm, và chuyển sang giai
                        đoạn sử dụng thìa, nĩa… và biết cách phân loại dọn dẹp sau khi ăn. Bên cạnh đó, việc phát triển
                        ngôn ngữ là vô cùng quan trọng, tại StarKids chú trọng vào những trò chơi, bài học thông qua
                        những hình ảnh sinh động để trau dồi vốn từ cho trẻ, giúp cho trẻ phát triển ngôn ngữ một cách
                        mạch lạc.
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary sx={{bgcolor:'#257abe', fontSize:'18px', fontWeight:'700', color:'white'}} expandIcon={<ExpandMoreIcon />} aria-controls="panel1-content" id="panel1-header">
                        Lớp 25 - 36 tháng
                    </AccordionSummary>
                    <AccordionDetails
                        sx={{ minHeight: '100px', display: 'flex', alignItems: 'center', bgcolor: '#005294', color:'white' }}
                    >
                        Các con sẽ được bắt đầu làm quen các kỹ năng tự chăm sóc bản thân cơ bản, nuôi dưỡng ý chí chủ
                        động, tích cực trong các hoạt động vui chơi & học tập. Những bài học cảm xúc cơ bản nhất – nhận
                        thức cảm xúc của chính mình và người xung quanh. Bé tập các kỹ năng giao tiếp xã hội đầu tiên,
                        vốn từ của trẻ sẽ phong phú, trẻ nói tròn câu hơn. Đây là tiền đề giúp cho trẻ làm quen với một
                        ngôn ngữ mới khi bước sang lứa tuổi mẫu giáo.
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary sx={{bgcolor:'#257abe', fontSize:'18px', fontWeight:'700', color:'white'}} expandIcon={<ExpandMoreIcon />} aria-controls="panel1-content" id="panel1-header">
                        Lớp 3 - 4 tuổi
                    </AccordionSummary>
                    <AccordionDetails
                        sx={{ minHeight: '100px', display: 'flex', alignItems: 'center', bgcolor: '#005294', color:'white' }}
                    >
                        Với các con, mọi thứ đều là dấu chấm hỏi rất lớn, khao khát được hỏi, khao khát được giải đáp để
                        thỏa trí tò mò. Thông qua việc hỏi – đáp, các con sẽ tích lũy được một lượng kiến thức lớn, lý
                        giải về các hiện tượng xung quanh thế giới mình. Đây là “thời điểm vàng” để bé bắt đầu tiếp cận
                        ngôn ngữ thứ hai. Vì vậy, tại StarKids đã cho trẻ sớm tiếp cận chương trình Tiếng Anh với giáo
                        viên bản ngữ để giúp trẻ có thể tiếp cận với ngôn ngữ thứ hai một cách hiệu quả.
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary sx={{bgcolor:'#257abe', fontSize:'18px', fontWeight:'700', color:'white'}} expandIcon={<ExpandMoreIcon />} aria-controls="panel1-content" id="panel1-header">
                        Lớp 4 - 5 tuổi
                    </AccordionSummary>
                    <AccordionDetails
                        sx={{ minHeight: '100px', display: 'flex', alignItems: 'center', bgcolor: '#005294', color:'white' }}
                    >
                        Kỹ năng làm việc nhóm – chia sẻ và lắng nghe, biết tôn trọng sự khác biệt, giải quyết tình huống
                        trong sự hòa bình. Việc tự tin đứng trước đám đông để trình bày là điều không có gì phải lo
                        ngại. Bé đã bắt đầu hình thành những xu hướng sở thích riêng khi lựa chọn góc chơi phù hợp với
                        mình.
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary sx={{bgcolor:'#257abe', fontSize:'18px', fontWeight:'700', color:'white'}} expandIcon={<ExpandMoreIcon />} aria-controls="panel1-content" id="panel1-header">
                        Lớp 5 - 6 tuổi
                    </AccordionSummary>
                    <AccordionDetails
                        sx={{ minHeight: '100px', display: 'flex', alignItems: 'center', bgcolor: '#005294', color:'white' }}
                    >
                        Các con bắt đầu phát huy được khả năng lãnh đạo của mình, và có xu hướng muốn chia sẻ những điều
                        đã học được cho những em nhỏ hơn, những bạn chưa biết. Các con rất nhạy bén với con số và mặt
                        chữ để thỏa mãn nhu cầu muốn tự mình đọc được sách, truyện. Chương trình học tại Starkids sẽ
                        giúp trẻ hoàn thiện các lĩnh vực phát triển, là nền tảng và hành trang để trẻ tự tin bước vào
                        cấp học mới.
                    </AccordionDetails>
                </Accordion>
            </Stack>
        </Stack>
    );
}
