import Head from 'next/head';
import { Box, Container, Typography } from '@mui/material';
import ContractDeliveryList from '@/components/coffee-contract-delivery/contract-delivery-list';
import ExportCoffeeList from '@/components/export-coffee/export-coffee-list';
import { Export } from '@/components/export-coffee/export';
import { DashboardLayout } from '@/components/dashboard-layout';

const Page = () => (
    <>
        <Head>
            <title>
                Export Coffee | Adey supply-chain
            </title>
        </Head>
        <Box
            component="main"
            sx={{
                flexGrow: 1,
                py: 4
            }}
        >
            <Container maxWidth={false}>
                <Typography
                    sx={{ mb: 3 }}
                    variant="h4"
                >
                    Export Coffee
                </Typography>
                <Box>
                    <Export />
                </Box>
            </Container>
        </Box>
    </>
);

Page.getLayout = (page: any) => (
    <DashboardLayout>
        {page}
    </DashboardLayout>
);

export default Page;
