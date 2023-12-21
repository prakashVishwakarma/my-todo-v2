import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import CustomButton from '../PureComponents/CustomButton/CustomButton';
import { encryptionDataStrengths, myLocalDataName, whoIsLoggedIn } from '@/Constants/myLocalData';
import { useRouter } from 'next/navigation';
import { Typography } from '@mui/material';
import getLocalStorageData from '@/Utils/getLocalStorageData';
import { routes } from '@/Constants/routes';
import ModifyTodoData from '@/Utils/ModifyTodoData';
import areCredentialsMatching from '@/Utils/areCredentialsMatching';
import deleteObjectById from '@/Utils/deleteObjectById';
import encrypt from '@/Utils/encryptions/encryptData';
import getDataFromSessionStorage from '@/Utils/getDataFromSessionStorage';
import modifyLocalStorageData from '@/Utils/modifyLocalStorageData';
import storeDataInLocalStorage from '@/Utils/storeDataInLocalStorage';

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

interface valueDataProps {
    id: string;
    title: string;
    content: string;
}

interface AlertDialogSlideProps {

    text: string;
    dialogContentText?: string;
    Cancel: string;
    Done: string;
    title?: string;
    valueData?: any;
}

const AlertDialogSlide: React.FC<AlertDialogSlideProps> = ({ valueData, text, Cancel, Done, title }) => {

    const [open, setOpen] = React.useState(false);
    const router = useRouter();

    const handleClickOpen = () => {
        // router.replace('/')
        // router.refresh()
        setOpen(true);
    };

    // console.log('valueData', valueData)

    const handleCloseAndDelete = (deletevalueData: valueDataProps | undefined) => {
        if (deletevalueData) {

            const theLoggedInUserData = getDataFromSessionStorage(whoIsLoggedIn)

            if (theLoggedInUserData.success) {

                // accessing user specific data theUserWhoIsLoggedIn, from local storage
                const theUserWhoIsLoggedIn = areCredentialsMatching(theLoggedInUserData?.data?.email, encrypt(theLoggedInUserData?.data?.password, encryptionDataStrengths), false)

                const indexToDelete = theUserWhoIsLoggedIn.myGoogleKeepTodo.findIndex((todo: { id: any; }) => todo.id === deletevalueData?.id)

                // Check if the object with the given ID exists in the array
                if (indexToDelete !== -1) {
                    // Remove the object at the found index
                    theUserWhoIsLoggedIn.myGoogleKeepTodo.splice(indexToDelete, 1);
                }

                // deleteObjectById() becouse modify locale storage data is not possible
                if (storeDataInLocalStorage(myLocalDataName, [modifyLocalStorageData(theUserWhoIsLoggedIn), ...deleteObjectById(getLocalStorageData(myLocalDataName), theUserWhoIsLoggedIn.id)])) {

                    console.log('Successfully Deleted Todo')
                    window.location.reload();

                } else {

                    console.log('Something Went Wrong !')
                    return alert('Something Went Wrong !')
                }
            } else {

                console.log('Failed to retrieve data from session storage.');
                alert('Please login first')
                return router.push(routes.login)
            }

            // const myLocalData = getLocalStorageData(myLocalDataName)
            // console.log(myLocalData)

            // // const myLocalData = JSON.parse(localStorage.getItem(myLocalDataName) ?? `{}`)

            // const filterdTodo = myLocalData.myTodo.filter((value: valueDataProps) => (value.title !== deletevalueData?.id))

            // const storedData = localStorage.getItem(myLocalDataName);
            // const parsedData = storedData ? JSON.parse(storedData) : {};
            // const myLocalDataWithDeletedValue = {
            //     loginAndSignup: { ...parsedData?.loginAndSignup },
            //     myTodo: [...filterdTodo]
            // }
            // localStorage.setItem(myLocalDataName, JSON.stringify(myLocalDataWithDeletedValue))
            // window.location.reload();
        }
        setOpen(false);
        // reStoreMyLocalData()
    };

    return (
        <React.Fragment>
            <CustomButton type='button' name={text} onClick={handleClickOpen} />
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={() => handleCloseAndDelete(undefined)}
                aria-describedby="alert-dialog-slide-description"
            >
                {
                    title &&
                    <DialogTitle>{title}</DialogTitle>
                }
                {
                    valueData?.title &&
                    <DialogTitle>{valueData?.title}</DialogTitle>
                }
                {
                    valueData?.contents.map((value: any, i: any, arr: any) => {
                        return <>
                            <Typography sx={{ mb: '20px' }} variant="body2" color="text.secondary">
                                {value.content}
                            </Typography>
                        </>
                    })
                }
                {
                    valueData?.content &&
                    <DialogContent>
                        <DialogContentText id="alert-dialog-slide-description">
                            {valueData?.content}
                        </DialogContentText>
                    </DialogContent>
                }
                <DialogActions>
                    <CustomButton type='button' name={Cancel} onClick={() => handleCloseAndDelete(undefined)} />
                    {
                        text !== 'View' &&
                        <CustomButton type='button' name={Done} onClick={() => handleCloseAndDelete(valueData)} />
                    }
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}

export default AlertDialogSlide;