import { useAppDispatch, useAppSelector } from "@/app/store";
import {
    Box,
    Button,
    Card,
    CardContent,
    CardHeader,
    CircularProgress,
    Divider,
    Grid,
    Popover,
    Stack,
    TextField,
    Typography
} from "@mui/material";
import { notification } from "antd"
import { useEffect, useState } from "react";
import { useRouter } from 'next/router'
import { ExportCoffeeResult } from "@/features/export-coffee/exportCoffeeSlice";
import EXportCoffeeBags from "./export-coffee-bags";
import { DeleteExportCoffee, GetAllExportCoffee, GradeExportCoffee } from "@/api/export-coffee";
import Router from 'next/router';

function ExportCoffeeDetail() {

    const dispatch = useAppDispatch();
    const exportCoffees = useAppSelector(state => state.exportCoffee.exportCoffee.response);
    const deleting = useAppSelector(state => state.exportCoffee.deleting);
    const loading = useAppSelector(state => state.exportCoffee.loading);
    const grading = useAppSelector(state => state.exportCoffee.grading);
    const growers = useAppSelector(state => state.grower.growers.result);
    const [selectedExportCoffee, setSelectedExportCoffee] = useState<ExportCoffeeResult>();
    const router = useRouter()
    const { batch_number } = router.query

    const [gradeValues, setGradeValues] = useState({
        grade: '',
        gradeBy: ''
    });
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleChange = (event: any) => {
        setGradeValues({
            ...gradeValues,
            [event.target.name]: event.target.value
        });
    };

    const handleGradeClick = async () => {
        await dispatch(GradeExportCoffee({batchNumber: values.batchNumber, grade: gradeValues.grade, gradeBy: gradeValues.gradeBy, owner: values.owner}));
        Router
        .push('/export-coffee')
        .catch(console.error);
    }
    const HandleDelete = async (batchNumber: string | undefined) => {
        handleClose();
        await dispatch(DeleteExportCoffee(batchNumber));
        await dispatch(GetAllExportCoffee());

        Router
            .push('/export-coffee')
            .catch(console.error);
    }
    const open = Boolean(anchorEl);
    const popOverId = open ? 'simple-popover' : undefined;

    const [values, setValues] = useState({
        bagSize: '',
        batchNumber: '',
        coffeeType: '',
        measurmentUnit: '',
        owner: '',
        productionDate: '',
        productionPlace: '',
        status: '',
        supplyCoffeeBatchNumber: '',
        traceability: {
            coffeeCherryBatchNumber: '',
            coffeeCherryDeliveryDate: '',
            coffeeCheryDeliveryId: '',
            coffeegrower: '',
            farmPlace: '',
            supplyCoffeeBatchnumber: ''
        }
    });


    const openNotification = (message: string) => {
        notification.open({
            message: 'Success',
            description: message,
            placement: 'bottomRight'
        });
    };

    useEffect(() => {
        setSelectedExportCoffee(exportCoffees.find(g => g.Record.batchNumber === batch_number));
        setValues({
            bagSize: selectedExportCoffee?.Record.bagSize || '',
            batchNumber: selectedExportCoffee?.Record.batchNumber || '',
            coffeeType: selectedExportCoffee?.Record.coffeeType || '',
            measurmentUnit: selectedExportCoffee?.Record.measurmentUnit || '',
            owner: selectedExportCoffee?.Record.owner || '',
            productionDate: selectedExportCoffee?.Record.productionDate || '',
            productionPlace: selectedExportCoffee?.Record.productionPlace || '',
            status: selectedExportCoffee?.Record.status || '',
            supplyCoffeeBatchNumber: selectedExportCoffee?.Record.supplyCoffeeBatchNumber || '',
            traceability: {
                coffeeCherryBatchNumber: selectedExportCoffee?.Record.traceability.coffeeCherryBatchNumber || '',
                coffeeCherryDeliveryDate: selectedExportCoffee?.Record.traceability.coffeeCherryDeliveryDate || '',
                coffeeCheryDeliveryId: selectedExportCoffee?.Record.traceability.coffeeCheryDeliveryId || '',
                coffeegrower: growers.find(g => g.Record.id === selectedExportCoffee?.Record.traceability.coffeegrower)?.Record.fullName || '',
                farmPlace: selectedExportCoffee?.Record.traceability.farmPlace || '',
                supplyCoffeeBatchnumber: selectedExportCoffee?.Record.traceability.supplyCoffeeBatchnumber || ''

            }
        })
    })
    return (
        <>

            <Grid
                container
                spacing={3}
            >
                <Grid
                    item
                    md={5}
                    xs={12}
                >
                    <Box>
                        <EXportCoffeeBags />
                    </Box>
                    <Box>
                        <Card
                            sx={{
                                p: 2,
                                mt: 2,
                                mb: 2
                            }}
                        >
                            <CardHeader
                                title="Grade"
                                subheader="only grade field is editable"
                            />
                            <Divider />
                            <CardContent>
                                <Grid
                                    container
                                    spacing={3}
                                >
                                    <Grid
                                        item
                                        md={6}
                                        xs={12}
                                    >
                                        <TextField
                                            fullWidth
                                            size='small'
                                            label="Owner"
                                            name="owner"
                                            value={values.owner}
                                        />
                                    </Grid>
                                    <Grid
                                        item
                                        md={6}
                                        xs={12}
                                    >
                                        <TextField
                                            fullWidth
                                            size='small'
                                            label="Batch Number"
                                            name="batchNumber"
                                            value={values.batchNumber}
                                        />
                                    </Grid>
                                    <Grid
                                        item
                                        md={6}
                                        xs={12}
                                    >
                                        <TextField
                                            fullWidth
                                            size='small'
                                            label="Grade"
                                            name="grade"
                                            onChange={handleChange}
                                            value={gradeValues.grade}
                                        />
                                    </Grid>
                                    <Grid
                                        item
                                        md={6}
                                        xs={12}
                                    >
                                        <TextField
                                            fullWidth
                                            size='small'
                                            label="Grade By"
                                            name="gradeBy"
                                            onChange={handleChange}
                                            value={gradeValues.gradeBy}
                                        />
                                    </Grid>
                                </Grid>
                                <Box
                                    sx={{
                                        mt: 2
                                    }}
                                >
                                    {grading ?
                                        <Stack
                                            sx={{
                                                alignItems: 'center',
                                                display: 'flex',
                                            }}
                                        >
                                            <CircularProgress
                                                color="primary"
                                            />
                                        </Stack>
                                        :
                                        <Button
                                            fullWidth
                                            color="primary"
                                            variant="contained"
                                            disabled={gradeValues.grade === '' || gradeValues.gradeBy === '' || values.batchNumber === '' || values.owner === '' }
                                            onClick={handleGradeClick}
                                        >
                                            Grade
                                        </Button>
                                    }
                                </Box>
                            </CardContent>
                        </Card>
                    </Box>
                    <Box
                        sx={{
                            p: 1
                        }}
                    >
                        {deleting ?
                            <Stack
                                sx={{
                                    alignItems: 'center',
                                    display: 'flex',
                                }}
                            >
                                <CircularProgress
                                    color="error"
                                />
                            </Stack>
                            :

                            <Button
                                color="error"
                                fullWidth
                                variant="contained"
                                disabled={loading}
                                onClick={handleClick}
                            >
                                Delete
                            </Button>


                        }
                        <Box>
                            <Popover
                                sx={{ p: 2 }}
                                id={popOverId}
                                open={open}
                                anchorEl={anchorEl}
                                onClose={handleClose}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                            >

                                <Typography sx={{ p: 2 }}>Are you sure you want delete the export request?</Typography>
                                <Button
                                    color="success"
                                    fullWidth
                                    variant="text"
                                    onClick={handleClose}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    color="error"
                                    fullWidth
                                    variant="contained"
                                    onClick={() => HandleDelete(batch_number?.toString())}
                                >
                                    Yes, Delete
                                </Button>
                            </Popover>

                        </Box>
                    </Box>

                </Grid>
                <Grid
                    item
                    md={7}
                    xs={12}
                >
                    <Card
                        sx={{
                            p: 2
                        }}
                    >
                        <CardHeader
                            subheader="This information cannot be edited"
                            title="Details"
                        />
                        <Divider />
                        <CardContent>
                            <Grid
                                container
                                spacing={3}
                            >
                                <Grid
                                    item
                                    md={6}
                                    xs={12}
                                >
                                    <TextField
                                        fullWidth
                                        size='small'
                                        label="Bag Size"
                                        name="bagSize"
                                        value={values.bagSize}
                                    />
                                </Grid>
                                <Grid
                                    item
                                    md={6}
                                    xs={12}
                                >
                                    <TextField
                                        fullWidth
                                        size='small'
                                        label="Batch Number"
                                        name="batchNumber"
                                        value={values.batchNumber}
                                    />
                                </Grid>
                                <Grid
                                    item
                                    md={6}
                                    xs={12}
                                >
                                    <TextField
                                        size='small'
                                        fullWidth
                                        label="Coffee Type"
                                        name="coffeeType"
                                        value={values.coffeeType}
                                    />
                                </Grid>

                                <Grid
                                    item
                                    md={6}
                                    xs={12}
                                >
                                    <TextField
                                        size='small'
                                        fullWidth
                                        label="Measurement Unit"
                                        name="measurmentUnit"
                                        value={values.measurmentUnit}
                                    />
                                </Grid>
                                <Grid
                                    item
                                    md={6}
                                    xs={12}
                                >
                                    <TextField
                                        size='small'
                                        fullWidth
                                        label="Production Date"
                                        name="productionDate"
                                        value={values.productionDate}
                                    />
                                </Grid>
                                <Grid
                                    item
                                    md={6}
                                    xs={12}
                                >
                                    <TextField
                                        size='small'
                                        fullWidth
                                        label="Production Place"
                                        name="productionPlace"
                                        value={values.productionPlace}
                                    />
                                </Grid>
                                <Grid
                                    item
                                    md={6}
                                    xs={12}
                                >
                                    <TextField
                                        size='small'
                                        fullWidth
                                        label="Owner"
                                        name="owner"
                                        value={values.owner}
                                    />
                                </Grid>
                            </Grid>
                        </CardContent>
                        <Divider />

                        <Divider />
                        <Box >
                            <Card
                                sx={{
                                    p: 2,
                                    mt: 2
                                }}
                            >
                                <CardHeader
                                    title="Traceability"
                                />
                                <Divider />
                                <CardContent>
                                    <Grid
                                        container
                                        spacing={3}
                                    >
                                        <Grid
                                            item
                                            md={6}
                                            xs={12}
                                        >
                                            <TextField
                                                fullWidth
                                                size='small'
                                                label="Coffee Cherry Batch Number"
                                                name="coffeeCherryBatchNumber"
                                                value={values.traceability.coffeeCherryBatchNumber}
                                            />
                                        </Grid>
                                        <Grid
                                            item
                                            md={6}
                                            xs={12}
                                        >
                                            <TextField
                                                size='small'
                                                fullWidth
                                                label="Coffee Cherry Delivery Date"
                                                name="coffeeCherryDeliveryDate"
                                                value={values.traceability.coffeeCherryDeliveryDate}
                                            />
                                        </Grid>
                                        <Grid
                                            item
                                            md={6}
                                            xs={12}
                                        >
                                            <TextField
                                                size='small'
                                                fullWidth
                                                label="Coffee Cherry Delivery Id"
                                                name="coffeeCheryDeliveryId"
                                                value={values.traceability.coffeeCheryDeliveryId}
                                            />
                                        </Grid>
                                        <Grid
                                            item
                                            md={6}
                                            xs={12}
                                        >
                                            <TextField
                                                fullWidth
                                                size='small'
                                                label="Coffee Grower"
                                                name="coffeegrower"
                                                value={values.traceability.coffeegrower}
                                            />
                                        </Grid>
                                        <Grid
                                            item
                                            md={6}
                                            xs={12}
                                        >
                                            <TextField
                                                size='small'
                                                fullWidth
                                                label="Farm Place"
                                                name="farmPlace"
                                                value={values.traceability.farmPlace}
                                            />
                                        </Grid>
                                        <Grid
                                            item
                                            md={6}
                                            xs={12}
                                        >
                                            <TextField
                                                size='small'
                                                fullWidth
                                                label="Supply Coffee Batch Number"
                                                name="supplyCoffeeBatchnumber"
                                                value={values.traceability.supplyCoffeeBatchnumber}
                                            />
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </Card>
                        </Box>

                    </Card >
                </Grid>
            </Grid>
        </>
    );
}


export default ExportCoffeeDetail;