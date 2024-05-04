import { Accordion, AccordionDetails, AccordionSummary, Stack } from '@mui/material';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function CourseList({ classes }) {
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
                Lớp Học Smart KinderGarten
            </Typography>
            <Stack sx={{ maxWidth: '1200px' }}>
                {classes.map((classItem, index) => (
                    <Accordion>
                        <AccordionSummary
                            sx={{ bgcolor: '#257abe', fontSize: '18px', fontWeight: '700', color: 'white' }}
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1-content"
                            id="panel1-header"
                        >
                            {classItem.className}
                        </AccordionSummary>
                        <AccordionDetails
                            sx={{
                                minHeight: '100px',
                                display: 'flex',
                                alignItems: 'center',
                                bgcolor: '#005294',
                                color: 'white',
                            }}
                        >
                            {classItem.description}
                        </AccordionDetails>
                    </Accordion>
                ))}
            </Stack>
        </Stack>
    );
}
