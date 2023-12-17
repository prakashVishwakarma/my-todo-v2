'use client'

import React from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CustomButton from '../CustomButton/CustomButton';
import Link from 'next/link';
import AlertDialogSlide from '@/Components/AlertDialogSlide/AlertDialogSlide';

interface MyCardPropsObj {
    title: string;
    content: string;
}
interface MyCardProps {
    value: MyCardPropsObj;
    index: number;
    reStoreMyLocalData?: () => void;
}

const MyCard: React.FC<MyCardProps> = ({ value, index, reStoreMyLocalData }) => {
    console.log(value)
    return (
        <Card sx={{ maxWidth: 345, bgcolor: '#73ff7a98' }}>
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {value.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {value.content}
                </Typography>
            </CardContent>
            <CardActions>
                <AlertDialogSlide valueData={value} text={'View'} Cancel={'Close'} Done={'Done'} />
                <Link href={`/update/${index}`}>
                    <CustomButton type='button' name='Update' />
                </Link>
                <AlertDialogSlide  valueData={value} text={'Delete'} Cancel={'Cancel'} Done={'Done'} title={'Are You Sure You Want To Delete ?'} />
            </CardActions>
        </Card>
    )
}

export default MyCard
