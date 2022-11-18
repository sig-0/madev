import { Box, Typography } from "@material-ui/core";
import { FC, useEffect} from "react";
import { IQuitProps } from "./quit.types";
import LoadingIndicator from '../../atoms/LoadingIndicator/LoadingIndicator';
import QuitService from '../../../services/quitService/quitService';
import useSnackbar from '../../molecules/Snackbar/useSnackbar.hook';
import { useNavigate } from 'react-router-dom';

const Quit: FC<IQuitProps> = () => {
    const { openSnackbar } = useSnackbar();
    const navigate = useNavigate();

    useEffect(()=>{
        const sendQuitSignal = async () => {
            await QuitService.sendQuitSignal();
          };
      
          sendQuitSignal()
            .then(() => {
                navigate('/setup');
            })
            .catch((e) => {
              openSnackbar('Unable to gracefully quit', 'error');
            });
    },[])

    return <Box mt={4}
    flexDirection={"column"}
    display={'flex'}
    justifyContent="center"
    alignItems="center"
    minHeight="100vh"
    marginTop={"-130px"}
    >
       
            <Box
              mt={2}
              display={'flex'}
              alignItems={'center'}
              justifyContent={'center'}
              flexDirection={"column"}
            >
                <LoadingIndicator />
                <br></br>
              <Typography>Cleaning up environment...</Typography>
            </Box>
          </Box>
    

}

export default Quit;