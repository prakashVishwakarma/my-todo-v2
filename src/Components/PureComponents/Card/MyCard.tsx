'use client'

import React from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CustomButton from '../CustomButton/CustomButton';
import Link from 'next/link';
import AlertDialogSlide from '@/Components/AlertDialogSlide/AlertDialogSlide';
import { routes } from '@/Constants/routes';
import { Todo } from '@/TypeScriptTypes/TypeScriptTypes';

interface MyCardProps {
    value: Todo;
    index: number;
}

const MyCard: React.FC<MyCardProps> = ({ value, index }) => {
    console.log('value', value)
    return (
        <Card sx={{ maxWidth: 345, bgcolor: '#73ff7a98' }}>
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {value.title}
                </Typography>
                {
                    value.contents.map((contentValue, i, arr) => {
                        return <>
                            <Typography sx={{mb:'20px'}} variant="body2" color="text.secondary">
                                {contentValue.content}
                            </Typography>
                        </>
                    })
                }
            </CardContent>
            <CardActions>
                <AlertDialogSlide valueData={value} text={'View'} Cancel={'Close'} Done={'Done'} />
                <Link href={routes.update(value.id)}>
                    <CustomButton type='button' name='Update' />
                </Link>
                <AlertDialogSlide valueData={value} text={'Delete'} Cancel={'Cancel'} Done={'Done'} title={'Are You Sure You Want To Delete ?'} />
            </CardActions>
        </Card>
    )
}

export default MyCard
