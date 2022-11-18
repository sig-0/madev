import { Box,Typography } from "@material-ui/core";
import { Call } from "@material-ui/icons";
import { FC, useEffect,useState } from "react";
import { RestService } from '../../../services/rest/restService';
import ActionButton from "../../atoms/ActionButton/ActionButton";

import { ILogsProps} from "./logs.types";

const Logs: FC<ILogsProps> = () => {
  const [logs, setLogs] = useState<string[]>([]);
 
  
  useEffect(() => {
    
    const fetchData = async () => {
        return await RestService.post<any>({
          url: "logs",
          data: {
            // @ts-ignore
            node_name: "node1"
          }
        });
    }

    
    fetchData().then((data) => {
      setLogs(data.logs)
    }).catch((e) => {
    })
    
    const intFunc = setInterval(() => {
      
      fetchData().then((data) => {
        console.log(data)
        console.log("fetched")
        var objDiv = document.getElementById("bottom");
        if (objDiv != null) {
          objDiv.scrollTop = objDiv.scrollHeight;
        }
        
        setLogs(data.logs)
      }).catch((e) => {
      })
      
    }, 2000);
  
    return () => clearInterval(intFunc);
  },[])
  

    return (
        <Box
          width={'100%'}
          height={'90vh'}
          display={'flex'}
          flexDirection={"column-reverse"}
        >
          <div>
          <div style={{"color":"silver", "backgroundColor":"black", "height":"800px", "width":"100%", "padding":"50px", "borderRadius":"25px", "overflow": "auto", "fontSize":"13px", "overflowY": "scroll", "display":"flex","flexDirection":"column-reverse"}}>
          {
             logs.slice(0).reverse().map((item, index) => {
              return <div>{item}</div>
             })
            
          }
          
          </div>
          <div id="bottom"></div>
          </div>
          <Box display={'flex'} alignItems={'center'} width={'100%'} marginBottom={"30px"}>
          <Box display={'flex'} justifyContent={"space-between"}>
            <ActionButton text={'Log to file'} square={true}/>
            <Box ml={2}>
            <ActionButton text={'Log level'} square={true}/>
            </Box>
            <Box ml={2}>
            <ActionButton text={'Select node'} square={true}/>
            </Box>
          </Box>
          </Box>
         </Box>
      );
}

export default Logs;